"""Scenario schema for Module 1 quizzes.

This model validates ``scenario_schema.json`` files, which describe the
key statistical elements of a scenario before questions are written.
"""

from typing import Literal

from pydantic import BaseModel, Field


class ScenarioSchema(BaseModel):
    """Details of a scenario used to design Module 1 quiz questions.

    Each field corresponds to one element of the scenario that the
    question writer will later turn into a multiple-choice question.
    """

    domain: str = Field(description="Domain for the scenario.")
    target_population: str = Field(description="Target population of the study.")
    question: str = Field(description="Question being asked about the population.")
    sampling_frame: str = Field(description="Sampling frame for the study.")
    population_frame_match: bool = Field(
        description="True if the sampling frame and population align."
    )
    population_frame_reasoning: str = Field(
        description="Detailed explanation regarding 'population_frame_match'."
    )
    sampling_method: Literal[
        "Simple Random Sample", "Systematic", "Cluster", "Stratified", "Convenience", "Multistage"
    ] = Field(
        description=(
            "Simple Random Sample, Systematic, Cluster, Stratified, "
            "Convenience, or Multistage."
        )
    )
    sampling_bias: Literal["None", "Undercoverage", "Self-Selection"] = Field(
        description="None, Undercoverage, or Self-Selection."
    )
    sampling_bias_reasoning: str = Field(
        description="Detailed explanation regarding 'sampling_bias'."
    )
    statistics_type: Literal["Inferential", "Descriptive"] = Field(
        description="Inferential or Descriptive."
    )
    statistics_type_reasoning: str = Field(
        description="Detailed explanation regarding 'statistics_type'."
    )
    parameter: str = Field(description="Population parameter.")
    statistic: str = Field(description="Sample statistic.")
    parameter_statistic_match: bool = Field(
        description="True if the statistic and parameter align."
    )
    parameter_statistic_match_reasoning: str = Field(
        description="Detailed explanation regarding 'parameter_statistic_match'."
    )
    question_type: Literal["Observational", "Causal"] = Field(
        description="Observational or Causal."
    )
    question_type_reasoning: str = Field(
        description="Detailed explanation regarding 'question_type'."
    )
    study_design: Literal[
        "Experimental (Completely Randomized Design)", "Observational"
    ] = Field(
        description="Experimental (Completely Randomized Design) or Observational."
    )
    design_issue: Literal["None", "Replication", "Randomization", "Control"] = Field(
        description="None, Replication, Randomization, or Control."
    )
    design_issue_explanation: str = Field(
        description="Detailed explanation regarding 'design_issue'."
    )