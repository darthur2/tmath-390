"""Scenario schema for Module 2 (exploratory data analysis) quizzes.

This model validates ``scenario_schema.json`` files produced by the
EDA scenario designer. It describes the variables in a dataset and the
expected statistical properties of those variables.
"""

from typing import Literal

from pydantic import BaseModel, Field


class EDAScenarioSchema(BaseModel):
    """Details of a dataset scenario used to design EDA quiz questions.

    Lists with one entry per quantitative variable are ordered to match
    the order of ``quantitative_variables``.
    """

    dataset: str = Field(description="Domain for the scenario.")
    categorical_variables: list[str] = Field(
        description="Names of categorical variables in the dataset."
    )
    quantitative_variables: list[str] = Field(
        description="Names of quantitative variables in the dataset."
    )
    discrete_variables: list[str] = Field(
        description="Names of quantitative variables that are discrete."
    )
    continuous_variables: list[str] = Field(
        description="Names of quantitative variables that are continuous."
    )
    skew: list[Literal["Left", "Right", "None"]] = Field(
        description="Skew for each quantitative variable; Left, Right, or None."
    )
    modality: list[Literal["Unimodal", "Multimodal"]] = Field(
        description="Modality for each quantitative variable; Unimodal or Multimodal."
    )
    central_tendency_type: list[Literal["Mean", "Median", "Mode"]] = Field(
        description="Best measure of central tendency for each variable: Mean, Median, or Mode."
    )
    central_tendency_values: list[float] = Field(
        description="Value for each measure of central tendency."
    )
    variability_spread_type: list[Literal["Variance", "IQR"]] = Field(
        description="Best measure of variability or spread for each variable: Variance or IQR."
    )
    variability_spread_values: list[float] = Field(
        description="The value for each measure of central tendency."
    )
    outliers: dict[str, list[float]] = Field(
        description="Observations identified as outliers (if any) for each quantitative variable."
    )
    scatterplot_description: str = Field(
        description="Description of the scatterplot in terms of strength, direction, and linearity."
    )
    boxplots_description: str = Field(
        description="Description of side-by-side boxplots in terms of differences in median and variability across groups."
    )