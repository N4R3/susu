import io
import os
import tempfile
import unittest
from argparse import Namespace
from unittest.mock import patch

import bcrypt

from sentinel import (
    SentinelError,
    load_normalized_database,
    normalize_string,
    process_bcrypt_mode,
    process_normalized_mode,
    run,
    verify_bcrypt,
)


class TestNormalization(unittest.TestCase):
    def test_mixed_case_handling(self):
        self.assertEqual(normalize_string("AbC"), "abc")

    def test_punctuation_and_space_removal(self):
        self.assertEqual(normalize_string("a.b c-d"), "abcd")

    def test_null_and_empty_string_resilience(self):
        self.assertEqual(normalize_string(None), "")
        self.assertEqual(normalize_string(""), "")
        self.assertEqual(normalize_string("!!!"), "")

    def test_equivalent_formats_have_same_canonical_form(self):
        self.assertEqual(normalize_string("A-B 123"), "ab123")
        self.assertEqual(normalize_string("a.b.123"), "ab123")
        self.assertEqual(normalize_string("ab123"), "ab123")


class TestNormalizedMode(unittest.TestCase):
    def test_database_is_loaded_into_set(self):
        database = io.StringIO("A-B 123\nOther\n")
        result = load_normalized_database(database)
        self.assertIsInstance(result, set)
        self.assertIn("ab123", result)

    def test_match_and_non_match_after_normalization(self):
        database = io.StringIO("A-B 123\nsecret99\n")
        input_data = io.StringIO("a.b.123\nmissing\nSecret 99\n")
        stdout = io.StringIO()
        stderr = io.StringIO()

        count = process_normalized_mode(database, input_data, stdout, stderr, verbose=True)

        self.assertEqual(count, 2)
        self.assertEqual(stdout.getvalue(), "a.b.123\nSecret 99\n")
        self.assertIn("Completed normalized scan", stderr.getvalue())

    def test_stdout_remains_clean_when_verbose_is_enabled(self):
        database = io.StringIO("abc\n")
        input_data = io.StringIO("AbC\n!!!\n")
        stdout = io.StringIO()
        stderr = io.StringIO()

        process_normalized_mode(database, input_data, stdout, stderr, verbose=True)

        self.assertEqual(stdout.getvalue(), "AbC\n")
        self.assertIn("Warning:", stderr.getvalue())
        self.assertNotIn("Warning:", stdout.getvalue())


class TestBcryptMode(unittest.TestCase):
    def test_valid_and_invalid_bcrypt_hashes(self):
        valid_hash = bcrypt.hashpw(b"abc123", bcrypt.gensalt(rounds=4))
        self.assertTrue(verify_bcrypt("abc123", valid_hash, max_cost=4))
        self.assertFalse(verify_bcrypt("wrong", valid_hash, max_cost=4))
        self.assertFalse(verify_bcrypt("abc123", b"not-a-valid-hash", max_cost=4))

    def test_normalization_feeds_bcrypt_verification(self):
        valid_hash = bcrypt.hashpw(b"ab123", bcrypt.gensalt(rounds=4)).decode("utf-8")
        database = io.StringIO(valid_hash + "\n")
        input_data = io.StringIO("A-B 123\nNo Match\n")
        stdout = io.StringIO()
        stderr = io.StringIO()

        count = process_bcrypt_mode(database, input_data, stdout, stderr, max_cost=4)

        self.assertEqual(count, 1)
        self.assertEqual(stdout.getvalue(), "MATCH (line 1)\n")

    def test_high_cost_hash_is_skipped_with_warning(self):
        high_cost_like_hash = b"$2b$15$abcdefghijklmnopqrstuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"
        database = io.StringIO(high_cost_like_hash.decode("utf-8") + "\n")
        input_data = io.StringIO("abc\n")
        stdout = io.StringIO()
        stderr = io.StringIO()

        count = process_bcrypt_mode(database, input_data, stdout, stderr, verbose=True, max_cost=4)

        self.assertEqual(count, 0)
        self.assertIn("exceeds allowed maximum", stderr.getvalue())


class TestPepperedMode(unittest.TestCase):
    def test_peppered_mode_uses_environment_variable(self):
        pepper = "InternalSecret2026"
        valid_hash = bcrypt.hashpw(b"ab123" + pepper.encode("utf-8"), bcrypt.gensalt(rounds=4)).decode("utf-8")
        database = io.StringIO(valid_hash + "\n")
        input_data = io.StringIO("A-B 123\n")
        stdout = io.StringIO()
        stderr = io.StringIO()

        count = process_bcrypt_mode(database, input_data, stdout, stderr, pepper=pepper, max_cost=4)

        self.assertEqual(count, 1)
        self.assertEqual(stdout.getvalue(), "MATCH (line 1)\n")

def test_run_requires_pepper_environment_variable(self):
    args = Namespace(
        mode="peppered",
        database="missing.db",
        input="missing.txt",
        output=None,
        verbose=False,
        max_bcrypt_cost=4,
    )

    stdout = io.StringIO()
    stderr = io.StringIO()

    with patch.dict(os.environ, {}, clear=True):
        exit_code = run(args, stdout=stdout, stderr=stderr)

    # Hibával kell visszatérnie
    self.assertEqual(exit_code, 1)

    # stdout üres marad
    self.assertEqual(stdout.getvalue(), "")

    # stderr-ben legyen hibaüzenet
    self.assertIn("PEPPER", stderr.getvalue())

    def test_run_accepts_pepper_environment_variable(self):
        pepper = "pepper"
        valid_hash = bcrypt.hashpw(b"abc" + pepper.encode("utf-8"), bcrypt.gensalt(rounds=4)).decode("utf-8")
        with tempfile.TemporaryDirectory() as temporary_directory:
            database_path = os.path.join(temporary_directory, "hashes.db")
            input_path = os.path.join(temporary_directory, "input.txt")
            with open(database_path, "w", encoding="utf-8") as database_file:
                database_file.write(valid_hash + "\n")
            with open(input_path, "w", encoding="utf-8") as input_file:
                input_file.write("A-B-C\n")

            args = Namespace(
                mode="peppered",
                database=database_path,
                input=input_path,
                output=None,
                verbose=False,
                max_bcrypt_cost=4,
            )
            stdout = io.StringIO()
            with patch.dict(os.environ, {"PEPPER": pepper}, clear=True):
                exit_code = run(args, stdout=stdout, stderr=io.StringIO())

        self.assertEqual(exit_code, 0)
        self.assertEqual(stdout.getvalue(), "MATCH (line 1)\n")


if __name__ == "__main__":
    unittest.main()
