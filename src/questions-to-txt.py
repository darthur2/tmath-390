#!/usr/bin/env python3

import json
import sys
from pathlib import Path


def main() -> int:
    args = [arg for arg in sys.argv[1:] if arg != "--no-asterisks"]
    include_asterisks = "--no-asterisks" not in sys.argv[1:]

    input_path = Path(args[0]) if len(args) > 0 else Path(__file__).resolve().parent.parent / "docs" / "module-1" / "quizzes" / "button-placement-conversion" / "questions.json"
    output_path = Path(args[1]) if len(args) > 1 else input_path.with_name("questions.txt")

    with input_path.open("r", encoding="utf-8") as f:
        questions = json.load(f)

    blocks = []
    for index, question in enumerate(questions, start=1):
        correct_letter = question["correct_answer"].lower()
        lines = [f"{index}. {question['stem']}"]
        for letter in ("A", "B", "C", "D"):
            prefix = "*" if include_asterisks and letter.lower() == correct_letter else ""
            lines.append(f"{prefix}{letter.lower()}) {question[f'option {letter}']}")
        blocks.append("\n".join(lines))

    with output_path.open("w", encoding="utf-8") as f:
        f.write("\n\n".join(blocks) + "\n")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
