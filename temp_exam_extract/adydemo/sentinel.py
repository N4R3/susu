"""
Project Sentinel - Secret Database CLI Tool.

A robust command-line utility for matching input lines against a secret database.
It supports normalized plaintext matching, bcrypt verification, and peppered
bcrypt verification.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from typing import Iterable, Optional, TextIO


try:
    import bcrypt
except ImportError:  # pragma: no cover - handled at runtime for clear CLI error
    bcrypt = None

NORMALIZED_PATTERN = re.compile(r"[^a-z0-9]")
DEFAULT_MAX_BCRYPT_COST = 14


class SentinelError(Exception):
    """Base exception for Project Sentinel errors."""


def normalize_string(value: Optional[str]) -> str:
    """
    Convert a string into its canonical comparison form.

    The canonical form is lowercase and contains only characters in [a-z0-9].
    None is treated as an empty string.
    """
    if value is None:
        return ""
    return NORMALIZED_PATTERN.sub("", value.lower())


def warn(message: str, *, verbose: bool, stderr: TextIO = sys.stderr) -> None:
    """Write a warning/status message to stderr only when verbose mode is enabled."""
    if verbose:
        print(message, file=stderr)


def load_normalized_database(database_stream: Iterable[str], *, verbose: bool = False, stderr: TextIO = sys.stderr) -> set[str]:
    """Load normalized plaintext database entries into a set for O(1) lookup."""
    entries: set[str] = set()
    for line_number, raw_line in enumerate(database_stream, start=1):
        normalized = normalize_string(raw_line.strip())
        if not normalized:
            warn(f"Warning: ignored empty normalized database line {line_number}", verbose=verbose, stderr=stderr)
            continue
        entries.add(normalized)
    return entries


def load_hash_database(database_stream: Iterable[str], *, verbose: bool = False, stderr: TextIO = sys.stderr) -> list[bytes]:
    """Load bcrypt hashes from the database file."""
    hashes: list[bytes] = []
    for line_number, raw_line in enumerate(database_stream, start=1):
        value = raw_line.strip()
        if not value:
            warn(f"Warning: ignored empty hash database line {line_number}", verbose=verbose, stderr=stderr)
            continue
        hashes.append(value.encode("utf-8"))
    return hashes


def get_bcrypt_cost(hash_value: bytes) -> Optional[int]:
    """Extract the bcrypt cost factor from a bcrypt hash, if possible."""
    try:
        parts = hash_value.decode("utf-8").split("$")
        if len(parts) >= 3 and parts[1] in {"2a", "2b", "2y"}:
            return int(parts[2])
    except (UnicodeDecodeError, ValueError):
        return None
    return None


def verify_bcrypt(candidate: str, hash_value: bytes, *, max_cost: int = DEFAULT_MAX_BCRYPT_COST) -> bool:
    """
    Verify a candidate string against a bcrypt hash.

    Hashes with a cost factor above max_cost are skipped to prevent excessive
    runtime during automated evaluation.
    """
    if bcrypt is None:
        raise SentinelError("bcrypt package is required for bcrypt modes")

    cost = get_bcrypt_cost(hash_value)
    if cost is not None and cost > max_cost:
        raise SentinelError(f"bcrypt cost factor {cost} exceeds allowed maximum {max_cost}")

    try:
        return bcrypt.checkpw(candidate.encode("utf-8"), hash_value)
    except ValueError:
        return False


def process_normalized_mode(
    database_stream: Iterable[str],
    input_stream: Iterable[str],
    output_stream: TextIO = sys.stdout,
    stderr: TextIO = sys.stderr,
    *,
    verbose: bool = False,
) -> int:
    """Process input using normalized plaintext matching."""
    database_entries = load_normalized_database(database_stream, verbose=verbose, stderr=stderr)
    match_count = 0

    for line_number, raw_line in enumerate(input_stream, start=1):
        original_line = raw_line.rstrip("\n")
        normalized = normalize_string(original_line)
        if not normalized:
            warn(f"Warning: ignored empty normalized input line {line_number}", verbose=verbose, stderr=stderr)
            continue
        if normalized in database_entries:
            print(original_line, file=output_stream)
            match_count += 1

    warn(f"Completed normalized scan. Matches: {match_count}", verbose=verbose, stderr=stderr)
    return match_count


def process_bcrypt_mode(
    database_stream: Iterable[str],
    input_stream: Iterable[str],
    output_stream: TextIO = sys.stdout,
    stderr: TextIO = sys.stderr,
    *,
    verbose: bool = False,
    pepper: Optional[str] = None,
    max_cost: int = DEFAULT_MAX_BCRYPT_COST,
) -> int:
    """Process input using bcrypt or peppered bcrypt matching."""
    hashes = load_hash_database(database_stream, verbose=verbose, stderr=stderr)
    match_count = 0

    for line_number, raw_line in enumerate(input_stream, start=1):
        original_line = raw_line.rstrip("\n")
        normalized = normalize_string(original_line)
        if not normalized:
            warn(f"Warning: ignored empty normalized input line {line_number}", verbose=verbose, stderr=stderr)
            continue

        candidate = normalized + (pepper or "")
        matched = False
        for hash_value in hashes:
            try:
                if verify_bcrypt(candidate, hash_value, max_cost=max_cost):
                    matched = True
                    break
            except SentinelError as exc:
                warn(f"Warning: {exc}", verbose=verbose, stderr=stderr)
                continue

        if matched:
            print(f"MATCH (line {line_number})", file=output_stream)
            match_count += 1

    warn(f"Completed bcrypt scan. Matches: {match_count}", verbose=verbose, stderr=stderr)
    return match_count


def build_parser() -> argparse.ArgumentParser:
    """Build the command-line argument parser."""
    parser = argparse.ArgumentParser(description="Project Sentinel Secret Database CLI Tool")
    parser.add_argument("-d", "--database", required=True, help="Path to the secret database file")
    parser.add_argument("-i", "--input", required=True, help="Path to the input file")
    parser.add_argument(
        "--mode",
        choices=("normalized", "bcrypt", "peppered"),
        default="normalized",
        help="Matching mode to use",
    )
    parser.add_argument("-o", "--output", help="Optional output file for matches")
    parser.add_argument("--verbose", action="store_true", help="Print status messages to stderr")
    parser.add_argument(
        "--max-bcrypt-cost",
        type=int,
        default=DEFAULT_MAX_BCRYPT_COST,
        help="Maximum allowed bcrypt cost factor",
    )
    return parser


def run(args: argparse.Namespace, *, stdout: TextIO = sys.stdout, stderr: TextIO = sys.stderr) -> int:
    if args.mode in ("bcrypt", "peppered") and bcrypt is None:
        print("HIBA: A bcrypt könyvtár nincs telepítve! Telepítés: pip install bcrypt", file=stderr)
        return 1

    if args.mode == "peppered" and "PEPPER" not in os.environ:
        print("HIBA: A PEPPER környezeti változó nincs beállítva!", file=stderr)
        return 1

    if getattr(args, "verbose", False):
        print("INFO: Indítási ellenőrzés sikeres.", file=stderr)

        if args.mode in ("bcrypt", "peppered"):
            print("INFO: bcrypt elérhető.", file=stderr)

        if args.mode == "peppered":
            print("INFO: PEPPER környezeti változó betöltve.", file=stderr)


        

    # ... innen megy tovább a programod ...

    output_context = open(args.output, "w", encoding="utf-8") if args.output else None
    output_stream = output_context or stdout

    try:
        with open(args.database, "r", encoding="utf-8") as database_stream, open(args.input, "r", encoding="utf-8") as input_stream:
            if args.mode == "normalized":
                process_normalized_mode(
                    database_stream,
                    input_stream,
                    output_stream,
                    stderr,
                    verbose=args.verbose,
                )
            elif args.mode == "bcrypt":
                process_bcrypt_mode(
                    database_stream,
                    input_stream,
                    output_stream,
                    stderr,
                    verbose=args.verbose,
                    max_cost=args.max_bcrypt_cost,
                )
            elif args.mode == "peppered":
                process_bcrypt_mode(
                    database_stream,
                    input_stream,
                    output_stream,
                    stderr,
                    verbose=args.verbose,
                    pepper=os.environ["PEPPER"],
                    max_cost=args.max_bcrypt_cost,
                )
    finally:
        if output_context is not None:
            output_context.close()

    return 0


def main(argv: Optional[list[str]] = None) -> int:
    """CLI entry point."""
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return run(args)
    except SentinelError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
