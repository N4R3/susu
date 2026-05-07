# Project Sentinel - Secret Database CLI Tool

Python 3.8+ command-line tool for robust matching against a secret database.

## Features

- Canonical normalization: lowercase and keep only `[a-z0-9]`
- Normalized plaintext matching using a `set` for O(1) lookup
- Streaming input processing line-by-line
- Bcrypt verification mode
- Peppered bcrypt verification mode using `PEPPER`
- Clean output separation: matches to stdout/output file, telemetry to stderr
- Unit tests for all required phases

## Installation

```bash
python -m pip install -r requirements.txt
```

## Usage

```bash
python sentinel.py --mode normalized --database ids.txt --input log.csv
python sentinel.py --mode bcrypt --database hashes.db --input data.txt
export PEPPER="InternalSecret2026"
python sentinel.py --mode peppered --database hashes.db --input data.txt
```

Optional output file:

```bash
python sentinel.py --mode normalized -d ids.txt -i log.csv -o matches.txt
```

Verbose status messages go to stderr:

```bash
python sentinel.py --mode normalized -d ids.txt -i log.csv --verbose
```

## Run tests

```bash
python -m unittest discover -s tests -v
```
