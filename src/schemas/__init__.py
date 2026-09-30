"""Pydantic models for the TMATH 390 course schemas.

These models mirror the JSON schemas previously defined in the prompt
files under ``prompts/``. Each model is used to validate the JSON files
produced for scenarios, questions, and knowledge checks.
"""

from .scenario_schema import ScenarioSchema
from .scenario import Scenario
from .question import Question
from .eda_scenario_schema import EDAScenarioSchema

__all__ = [
    "ScenarioSchema",
    "Scenario",
    "Question",
    "EDAScenarioSchema",
]