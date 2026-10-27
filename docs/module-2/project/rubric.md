# Exploratory Data Analysis Mini-Project

## Purpose

In this project, you will use exploratory data analysis (EDA) to understand an assigned dataset and communicate what it reveals. You will describe the variables, choose summaries and plots that fit the data, and investigate two relationships that interest you. The goal is to make evidence-based descriptions of patterns in the data—not to claim that one variable caused another unless the study design supports that conclusion.

## Materials

You will receive:

- A cleaned CSV dataset assigned to you.
- A background description and data dictionary for that dataset.

Use these materials to introduce the topic, observations, and available context. They are the intended source for your description; you do not need to search for the original website, study, or database. Do not invent a source, population, collection date, or procedure that the supplied materials do not provide. If an important detail is not available, say so briefly.

## What to do

### 1. Introduce the dataset

Write a concise introduction that explains what the dataset describes, what one row represents, and the context in which the data were gathered, using the supplied background and data dictionary. Describe the population or coverage and collection approach to the extent those details are provided. Briefly identify the variables and what they measure.

### 2. Describe every variable

Provide appropriate descriptive summaries for every variable in your assigned CSV. Choose summaries that fit each variable and its distribution, and explain what the results show in the context of the data.

Create an appropriate, clearly labeled visualization for every variable. Choose displays that fit the variables and help the reader understand patterns in the data.

### 3. Choose and investigate two research questions

Before you analyze relationships, choose **two questions** that you can investigate with the variables in your dataset. State both as explicit research questions in your report before presenting the corresponding analyses. No separate approval is required. Select variables that fit the required analysis for each question:

1. **Two quantitative variables:** Ask about a possible relationship between two numerical measurements. Use a scatterplot and a correlation measure. Describe the direction, form, and strength you see in the plot, and explain whether the correlation agrees with that visual pattern. Correlation summarizes a linear relationship; it does not by itself show that one variable causes the other.
2. **One categorical and one quantitative variable:** Ask how a numerical measurement differs across groups. Use side-by-side boxplots and a grouped summary table. Choose group summaries that suit the distribution, then use both the plot and table to support your comparison.

For both questions, connect your conclusion to the displays and summaries. Describe association or group differences; do not make causal claims unless the supplied study information supports them.

## Report format and R code

Choose one of these formats:

- **R Markdown:** Submit the `.Rmd` source file and its knitted report. Make sure the rendered report displays the R code, results, tables, and figures.
- **Word:** Submit a readable Word document that includes the relevant R code alongside the resulting tables, figures, and written interpretations.

In either format, include the code that produced the summaries and plots so your results can be followed. Use R functions and plotting methods covered in the course materials. The [Module 2 R reference](../reading-materials/definitions-and-examples.Rmd) and the Module 2 readings are available for review.

## Submission checklist

- The introduction uses the provided background and does not add unsupported source details.
- Every variable is summarized and has an appropriate, labeled univariate plot.
- Two research questions are stated before their analyses and use variable pairs suited to the required methods.
- Both relationship analyses include their required plot and numerical summary, with conclusions tied to the results.
- The report includes the R code and its output and is organized, readable, and complete.

## Grading Rubric

Total: 100 points

| Criterion                                                                | Points | Full Credit                                                                                                                                                                                                                        | Partial Credit                                                                                                       | Low / No Credit                                                                                     |
| ------------------------------------------------------------------------ | -----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Dataset introduction and background                                      |     20 | Clear, accurate introduction based on the supplied background and data dictionary. It explains what the dataset describes and includes the source/context, population or coverage, and collection approach to the extent provided. | Mostly complete introduction with minor missing detail or small imprecision.                                         | Missing several required background elements, unclear description, or not responsive to the prompt. |
| Descriptive statistics / numeric summaries                               |     20 | Appropriate summaries are provided for every variable. The choice of summaries fits the variables and their distributions, and the results are clearly interpreted in context.                                                     | Summaries are mostly appropriate, with only minor issues in choosing or interpreting statistics for a few variables. | Summaries are often mismatched to the variable or its distribution, or the response is incomplete.  |
| Univariate plots                                                         |     20 | An appropriate, clearly labeled plot is provided for every variable. Plot choices reflect the variables and their features and help the reader understand the data.                                                                | Plots are mostly appropriate and readable, with minor problems in choice, labeling, or presentation.                 | Plots are poorly chosen, weakly connected to the data, or the response is incomplete.               |
| Relationship question 1: scatterplot and correlation                     |     20 | States an answerable question about two quantitative variables, uses an appropriate scatterplot and correlation, and correctly interprets direction, form, and strength in context.                                                | Uses a reasonable scatterplot and correlation, but interpretation is incomplete or slightly unclear.                 | Plot or correlation is not fully appropriate, or the interpretation misses important features.      |
| Relationship question 2: side-by-side boxplots and grouped summary table |     20 | States an answerable question about a quantitative variable across groups, uses side-by-side boxplots and a grouped summary table correctly, and draws a clear, supported conclusion.                                              | The comparison is mostly correct and well supported, with only minor issues in presentation or interpretation.       | The summaries or boxplots do not fully support the conclusion, or the analysis is incomplete.       |

### General Expectations

- Exploration beyond the required analysis is welcome, especially when the data raise interesting questions or reveal unexpected patterns.
- Work should be organized, readable, and complete.
- Tables and figures should be clearly labeled and easy to interpret.
- Interpretations should be tied to the displays and summaries rather than stated in isolation.
- Good work shows that the choice of summaries and plots is informed by the data's type and features.
- Use the provided dataset description and dictionary; do not add unsupported details about the data's source or collection.
- Include the relevant R code with its output in the submitted report.
