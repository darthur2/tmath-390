# How Reliable Is That Test?

A hospital screens 1,000 patients for a condition using a new diagnostic test. The results come back as a **two-way table**:

| | Has Condition | No Condition | Total |
|---|---|---|---|
| Test Positive | 85 | 45 | 130 |
| Test Negative | 15 | 855 | 870 |
| Total | 100 | 900 | 1000 |

The hospital wants to know: how good is this test? The answer is not a single number. It depends on what question you are asking, and different questions mean looking at the table from different angles.

The four inner cells are **joint probabilities** — the chance that two things are simultaneously true. Pick a random patient and the chance they both have the condition *and* test positive is $85/1000 = 0.085$. The chance they have the condition and test negative is $15/1000 = 0.015$. Together, the four joint probabilities sum to 1.

The row and column totals give the **marginal probabilities** — the chance of a single event regardless of the other. The prevalence of the condition in the screened population is $P(\text{condition}) = 100/1000 = 0.10$. The overall chance of a positive test is $P(+) = 130/1000 = 0.13$. These are called marginal because they live in the "margins" of the table.

Now ask: of the 100 patients who actually have the condition, how many tested positive? That is $85/100 = 0.85$ — the true positive rate, also called the **sensitivity**, written $P(+ \mid \text{condition})$. Of the 900 patients without the condition, $45/900 = 0.05$ tested positive — the false positive rate, $P(+ \mid \text{no condition})$. The test's **specificity** — the true negative rate — is $855/900 = 0.95$. These are **conditional probabilities**. They reframe the two-way table by restricting attention to a specific subgroup. The general formula is

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)},
$$

and rearranging gives the **multiplication rule**:

$$
P(A \cap B) = P(B) \times P(A \mid B).
$$

This rule says: to find the probability that two things both happen, start with the probability of one and then multiply by the probability of the other given the first already occurred. In the table, $P(\text{condition} \cap +) = P(\text{condition}) \times P(+ \mid \text{condition}) = 0.10 \times 0.85 = 0.085$, which matches the joint probability directly from the table.

What would it look like if the test were useless? If knowing the condition told you nothing about the test result, then $P(+ \mid \text{condition})$ would equal $P(+)$ — the conditional would match the marginal. That is **independence**, and when it holds the multiplication rule simplifies to

$$
P(A \cap B) = P(A) \times P(B).
$$

But in this table, $P(+ \mid \text{condition}) = 0.85$ while $P(+) = 0.13$. They are nothing alike, which is exactly why the test is useful: the condition changes the distribution of test results.

All five ideas — joint, marginal, conditional, multiplication, and independence — are the same core relationship viewed from different angles. Joint tells you about "both." Marginal tells you about "one." Conditional reframes it given what you already know. Multiplication builds the joint from the parts. And independence is the special case where the condition does not change anything. The table is just one way to arrange the numbers, but every question you can ask about probability is hiding in its rows and columns.