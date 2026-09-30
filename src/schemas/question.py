"""Multiple-choice question schema.

This model validates both ``questions.json`` files for quizzes and
``*.json`` knowledge-check files, since every question uses the same
structure: a stem, four options, the correct answer, and an explanation.
"""

from typing import Literal

from pydantic import BaseModel, Field


class Question(BaseModel):
    """A single multiple-choice question.

    Fields mirror the question schema used for both Module 1 quizzes and
    knowledge checks.
    """

    stem: str = Field(description="The question being asked.")
    option_a: str = Field(description="First option for the MC question.", alias="option A")
    option_b: str = Field(description="Second option for the MC question.", alias="option B")
    option_c: str = Field(description="Third option for the MC question.", alias="option C")
    option_d: str = Field(description="Fourth option for the MC question.", alias="option D")
    correct_answer: Literal["A", "B", "C", "D"] = Field(
        description="The correct option, one of A, B, C, or D."
    )
    correct_answer_reasoning: str = Field(
        description="Explanation for why the correct answer is correct."
    )

    model_config = {"populate_by_name": True}