"""Scenario text schema for Module 1 quizzes.

This model validates ``scenario.json`` files, which contain the written
scenario prose that students read before answering questions.
"""

from pydantic import BaseModel, Field


class Scenario(BaseModel):
    """The full written scenario for a Module 1 quiz.

    The scenario is a single block of prose that contains enough
    information for students to answer all of the associated questions
    without directly stating the answers.
    """

    scenario: str = Field(description="Full scenario text.")