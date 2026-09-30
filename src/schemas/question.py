"""Multiple-choice question schema.

This model validates both ``questions.json`` files for quizzes and
``*.json`` knowledge-check files, since every question uses the same
structure: a stem, four options, the correct answer, and an explanation.

Each question also carries a ``topic`` identifying which of the 13
question types it represents.
"""

from enum import Enum
from typing import Literal

from pydantic import BaseModel, Field


class QuestionTopic(str, Enum):
    """The 13 question types used for quizzes and knowledge checks.

    Each member knows the canonical quiz stem and the knowledge-check
    question suffix (the part that follows the scenario).
    """

    TARGET_POPULATION = "Target Population"
    RESEARCH_QUESTION = "Research Question"
    SAMPLING_FRAME = "Sampling Frame"
    SAMPLING_FRAME_POPULATION_MATCH = "Sampling Frame Population Match"
    SAMPLING_METHOD = "Sampling Method"
    SAMPLING_METHOD_BIAS = "Sampling Method Bias"
    STATISTICS_TYPE = "Statistics Type"
    PARAMETER = "Parameter"
    STATISTIC = "Statistic"
    PARAMETER_STATISTIC_MATCH = "Parameter Statistic Match"
    QUESTION_TYPE = "Question Type"
    STUDY_DESIGN = "Study Design"
    EXPERIMENTAL_DESIGN_ISSUES = "Experimental Design Issues"

    @property
    def quiz_stem(self) -> str:
        return _QUIZ_STEMS[self]

    @property
    def knowledge_check_stem(self) -> str:
        return _KNOWLEDGE_CHECK_STEMS[self]


_QUIZ_STEMS = {
    QuestionTopic.TARGET_POPULATION: "What is the target population in this scenario?",
    QuestionTopic.RESEARCH_QUESTION: "What is the hypothesis being tested or the question being asked about the population?",
    QuestionTopic.SAMPLING_FRAME: "What is the sampling frame in this scenario?",
    QuestionTopic.SAMPLING_FRAME_POPULATION_MATCH: "In this scenario, does the sampling frame align with the target population?",
    QuestionTopic.SAMPLING_METHOD: "What sampling method was used in this scenario to collect the sample for the study?",
    QuestionTopic.SAMPLING_METHOD_BIAS: "Did the sampling method result in any sampling bias in this scenario?",
    QuestionTopic.STATISTICS_TYPE: "Is the research question about descriptive statistics or statistical inference?",
    QuestionTopic.PARAMETER: "What is the parameter being studied in this scenario?",
    QuestionTopic.STATISTIC: "What is the statistic used in this scenario?",
    QuestionTopic.PARAMETER_STATISTIC_MATCH: "Can the statistic be used to answer the question about the population?",
    QuestionTopic.QUESTION_TYPE: "Is the question being asked causal in nature?",
    QuestionTopic.STUDY_DESIGN: "Is the study design experimental (completely randomized design) or observational?",
    QuestionTopic.EXPERIMENTAL_DESIGN_ISSUES: "Are there any issues with the experimental design with regard to randomization, replication, or control?",
}

_KNOWLEDGE_CHECK_STEMS = {
    QuestionTopic.TARGET_POPULATION: "What is the target population in this scenario?",
    QuestionTopic.RESEARCH_QUESTION: "What is the research question in this scenario?",
    QuestionTopic.SAMPLING_FRAME: "What is the sampling frame in this scenario?",
    QuestionTopic.SAMPLING_FRAME_POPULATION_MATCH: "Does the sampling frame align with the target population?",
    QuestionTopic.SAMPLING_METHOD: "What sampling method is used in this scenario?",
    QuestionTopic.SAMPLING_METHOD_BIAS: "Did sampling bias occur and if so, what type?",
    QuestionTopic.STATISTICS_TYPE: "Is this an example of inferential statistics or descriptive statistics?",
    QuestionTopic.PARAMETER: "What is the parameter in this scenario?",
    QuestionTopic.STATISTIC: "What is the statistic in this scenario?",
    QuestionTopic.PARAMETER_STATISTIC_MATCH: "Does the statistic in this scenario align with the parameter?",
    QuestionTopic.QUESTION_TYPE: "Is the question being asked causal or observational in nature?",
    QuestionTopic.STUDY_DESIGN: "Is this an observational study or a completely randomized design experiment?",
    QuestionTopic.EXPERIMENTAL_DESIGN_ISSUES: "Was there an issue with the experimental design with regard to randomization, replication, and control?",
}


class Question(BaseModel):
    """A single multiple-choice question.

    Fields mirror the question schema used for both Module 1 quizzes and
    knowledge checks.
    """

    topic: QuestionTopic = Field(description="Which of the 13 question types this is.")
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