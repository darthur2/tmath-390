"""Pydantic models for the TMATH 390 course schemas.

These models mirror the JSON schemas previously defined in the prompt
files under ``prompts/``. Each model is used to validate the JSON files
produced for scenarios, questions, and knowledge checks.
"""

from .intro_scenario_schema import ScenarioSchema
from .intro_scenario import Scenario
from .intro_question import Question, QuestionTopic
from .eda_scenario_schema import EDAScenarioSchema

__all__ = [
    "ScenarioSchema",
    "Scenario",
    "Question",
    "QuestionTopic",
    "EDAScenarioSchema",
]