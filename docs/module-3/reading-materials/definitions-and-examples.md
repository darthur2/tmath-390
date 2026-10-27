# Glossary

Welcome to the glossary for Module 3 (Probability). Each entry gives the definition of a key term, the sources used for that definition, and three examples drawn from a variety of fields to show the term in action. The terms are listed alphabetically.

## Bayes' Theorem

**Definition:** A formula that describes how to update the probability of an event based on new evidence. For events $A$ and $B$,

$$
P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}.
$$

The denominator $P(B)$ is usually found using the law of total probability.

**Source:** Mathematical Statistics with Applications in R, p. 30; Introductory Statistics 2e, p. 214

**Example 1:** A rapid antigen test for a virus has 93% sensitivity and 97% specificity. The virus is present in 4% of the population. If a randomly selected person tests positive, the probability they actually have the virus is

$$
P(\text{virus} \mid +) = \frac{0.93 \times 0.04}{0.93 \times 0.04 + 0.03 \times 0.96} \approx 0.564.
$$

**Example 2:** A factory has three machines. Machine A makes 50% of the parts (1% defective), Machine B makes 30% (3% defective), and Machine C makes 20% (2% defective). If a defective part is found, the probability it came from Machine A is

$$
P(A \mid D) = \frac{0.50 \times 0.01}{0.50 \times 0.01 + 0.30 \times 0.03 + 0.20 \times 0.02} = \frac{0.005}{0.022} \approx 0.227.
$$

**Example 3:** A company drug test has a 99% true positive rate and 96% true negative rate. About 6% of employees use the drug. If an employee tests positive, the probability they actually use the drug is

$$
P(\text{use} \mid +) = \frac{0.99 \times 0.06}{0.99 \times 0.06 + 0.04 \times 0.94} \approx 0.612.
$$

## Classical Probability

**Definition:** When all outcomes in a sample space $S$ are equally likely, the probability of an event $E$ is

$$
P(E) = \frac{|E|}{|S|},
$$

where $|E|$ is the number of outcomes in $E$ and $|S|$ is the number of outcomes in $S$.

**Source:** Introductory Statistics 2e, p. 189

**Example 1:** A fair six-sided die is rolled. The sample space is $S = \{1,2,3,4,5,6\}$ with $|S| = 6$. The probability of rolling a 4 is $1/6$.

**Example 2:** A standard deck of 52 cards is shuffled and one card is drawn. The probability of drawing a king is $4/52 = 1/13$, since there are 4 kings in the deck.

**Example 3:** A bag contains 6 green marbles and 4 yellow marbles. One marble is selected at random. The probability it is green is $6/10 = 0.60$.

## Combinations

**Definition:** A combination is a selection of $k$ objects from a set of $n$ distinct objects where the order of selection does not matter. The number of combinations is

$$
C(n,k) = \binom{n}{k} = \frac{n!}{k!\,(n-k)!}.
$$

**Source:** Mathematical Statistics with Applications in R, p. 10; Introductory Statistics 2e, p. 177

**Example 1:** A manager must choose 5 employees from a team of 12 to attend a conference. The number of possible groups is $C(12,5) = 792$.

In R: `choose(12, 5)` returns 792.

**Example 2:** A lottery requires picking 6 numbers from 1 to 49. The number of possible tickets is $C(49,6) = 13,\!983,\!816$.

**Example 3:** A quality inspector selects 4 components from a batch of 20 for testing. The number of possible samples is $C(20,4) = 4,\!845$.

## Complement Rule

**Definition:** The probability that an event does not occur is one minus the probability that it does occur:

$$
P(\text{not } E) = 1 - P(E).
$$

Equivalently, $P(E^c) = 1 - P(E)$, where $E^c$ denotes the complement of $E$.

**Source:** Introductory Statistics 2e, p. 196

**Example 1:** The probability that a flight departs on time is 0.91. The probability it does not depart on time is $1 - 0.91 = 0.09$.

**Example 2:** A fair coin is flipped 6 times. The probability of getting at least one head is

$$
P(\text{at least one head}) = 1 - P(\text{no heads}) = 1 - \left(\frac{1}{2}\right)^6 = 1 - \frac{1}{64} = \frac{63}{64} \approx 0.984.
$$

**Example 3:** Three fair dice are rolled. The probability of getting at least one 6 is

$$
P(\text{at least one 6}) = 1 - \left(\frac{5}{6}\right)^3 = 1 - \frac{125}{216} \approx 0.421.
$$

## Conditional Probability

**Definition:** The probability that event $A$ occurs given that event $B$ has already occurred is

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)},
$$

provided $P(B) > 0$.

**Source:** Mathematical Statistics with Applications in R, p. 27; Introductory Statistics 2e, p. 206

**Example 1:** A company surveyed 200 employees. Of these, 80 are in engineering, 50 are in management, and 30 are in both. If an employee is in engineering, the probability they are also in management is $30/80 = 0.375$.

**Example 2:** Three cards are drawn without replacement from a deck of 52. The probability the third card is a heart given that the first two were hearts is $11/50$, since 11 hearts remain out of 50 cards.

**Example 3:** A school has 300 students. Of these, 90 are in orchestra, 60 are in choir, and 24 are in both. If a student is in orchestra, the probability they are also in choir is $24/90 \approx 0.267$.

## Empirical Probability

**Definition:** The empirical (or frequentist) probability of an event is the relative frequency with which it occurs in a set of observations:

$$
P(E) = \frac{\text{number of times } E \text{ occurs}}{\text{total number of observations}}.
$$

**Source:** Introductory Statistics 2e, p. 189

**Example 1:** A restaurant had more than 100 customers on 12 of the last 30 days. The empirical probability of having more than 100 customers on a randomly selected day is $12/30 = 0.40$.

**Example 2:** A clinic recorded the blood types of 200 patients: 70 had Type O, 85 had Type A, 30 had Type B, and 15 had Type AB. The empirical probability of Type O is $70/200 = 0.35$.

**Example 3:** A customer service center recorded the number of calls per hour: 45, 52, 38, 61, 47, 55, 42, 50. The total number of calls over the 8-hour shift was 390. The busiest hour had 61 calls. The empirical probability that a randomly selected call occurred during the busiest hour is $61/390 \approx 0.156$.

## Event

**Definition:** An event is a subset of the sample space — a set of outcomes that we care about. Events are usually denoted by capital letters such as $A$, $B$, and $E$.

**Source:** Introductory Statistics 2e, p. 184

**Example 1:** For a single die roll, the event "rolling an even number" is $E = \{2, 4, 6\}$.

**Example 2:** For two coin flips, the event "at least one head" is $E = \{HH, HT, TH\}$.

**Example 3:** In a deck of 52 cards, the event "drawing a face card" is the set of all 12 face cards.

## Factorial

**Definition:** The factorial of a non-negative integer $n$, denoted $n!$, is the product of all positive integers less than or equal to $n$:

$$
n! = n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1.
$$

By definition, $0! = 1$.

**Source:** Mathematical Statistics with Applications in R, p. 10; Introductory Statistics 2e, p. 173

**Example 1:** The number of ways to arrange 6 books on a shelf is $6! = 720$.

In R: `factorial(6)` returns 720.

**Example 2:** The number of ways to arrange 10 contestants in a finish order is $10! = 3,\!628,\!800$.

**Example 3:** Factorials appear in the formulas for combinations and permutations. For instance, $C(14,3) = 14!/(3!\,11!) = 364$.

## Fundamental Theorem of Counting

**Definition:** If a task can be broken into a sequence of $k$ steps, where the first step has $n_1$ possible outcomes, the second step has $n_2$ possible outcomes, and so on, then the total number of outcomes for the task is

$$
n_1 \times n_2 \times \cdots \times n_k.
$$

**Source:** Introductory Statistics 2e, p. 172

**Example 1:** A pizza shop offers 3 types of crust, 7 toppings, and 4 cheeses. A customer picking one of each can make $3 \times 7 \times 4 = 84$ different pizzas.

**Example 2:** A password consists of 2 uppercase letters (A-Z) followed by 3 digits (0-9), all repeatable. The number of possible passwords is $26 \times 26 \times 10 \times 10 \times 10 = 676,\!000$.

**Example 3:** An ice cream shop offers 5 flavors, 2 cone types (regular or waffle), and 3 topping choices. The number of possible single-scoop cones is $5 \times 2 \times 3 = 30$.

## Inclusion-Exclusion Principle

**Definition:** For any two events $A$ and $B$, the probability that at least one occurs is

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B).
$$

When $A$ and $B$ cannot happen simultaneously (mutually exclusive), $P(A \cap B) = 0$ and $P(A \cup B) = P(A) + P(B)$.

**Source:** Introductory Statistics 2e, p. 198

**Example 1:** In a group of 120 students, 50 take physics, 40 take chemistry, and 18 take both. The probability a random student takes physics or chemistry is

$$
P(P \cup C) = \frac{50}{120} + \frac{40}{120} - \frac{18}{120} = \frac{72}{120} = 0.60.
$$

**Example 2:** The probability of snow on Friday is 0.20, on Saturday is 0.15, and on both days is 0.05. The probability of snow on Friday or Saturday is $0.20 + 0.15 - 0.05 = 0.30$.

**Example 3:** In a company of 300 employees, 150 use a Mac, 100 use a PC, and 40 use both. The number that use at least one type is $150 + 100 - 40 = 210$.

## Independence

**Definition:** Two events $A$ and $B$ are independent if the occurrence of one does not affect the probability of the other. Formally,

$$
P(A \cap B) = P(A)\,P(B).
$$

Equivalently, $P(A \mid B) = P(A)$ and $P(B \mid A) = P(B)$ when the events are independent.

**Source:** Mathematical Statistics with Applications in R, p. 27; Introductory Statistics 2e, p. 209

**Example 1:** A fair coin is flipped twice. The outcome of the first flip does not affect the second. The probability of two heads is $(1/2) \times (1/2) = 1/4$.

**Example 2:** Two pumps in a water system operate independently. Pump A has reliability 0.97 and Pump B has reliability 0.85. The probability both work is $0.97 \times 0.85 = 0.8245$.

**Example 3:** Drawing two cards *with replacement* from a deck is independent. The probability of drawing a heart then a spade is $(13/52) \times (13/52) = 1/16 = 0.0625$.

## Joint, Marginal, and Conditional Probabilities

**Definition:** For two events $A$ and $B$:

- The **joint probability** $P(A \cap B)$ is the probability both occur.
- The **marginal probability** $P(A)$ is the probability of $A$ regardless of $B$.
- The **conditional probability** $P(A \mid B) = P(A \cap B)\,/\,P(B)$ is the probability of $A$ given $B$ has occurred.

**Source:** Introductory Statistics 2e, pp. 204--206

**Example 1:** At a company, 55% of employees are male. Among males, 30% are in computing. Among females, 45% are in computing. The joint probability a randomly selected employee is male and in computing is $0.55 \times 0.30 = 0.165$.

**Example 2:** In a survey, 65% of adults own a laptop and 25% own both a laptop and a tablet. The conditional probability an adult owns a tablet given they own a laptop is $0.25/0.65 \approx 0.385$.

**Example 3:** At a hospital, 45% of patients are over 65 and 18% are over 65 with high cholesterol. The conditional probability a patient over 65 has high cholesterol is $0.18/0.45 = 0.40$.

## Law of Total Probability

**Definition:** If events $A_1, A_2, \dots, A_k$ form a partition of the sample space (they are mutually exclusive and their union is the whole space), then for any event $B$,

$$
P(B) = P(A_1)\,P(B \mid A_1) + P(A_2)\,P(B \mid A_2) + \cdots + P(A_k)\,P(B \mid A_k).
$$

In the two-event case,

$$
P(B) = P(A)\,P(B \mid A) + P(A^c)\,P(B \mid A^c).
$$

**Source:** Mathematical Statistics with Applications in R, p. 30

**Example 1:** A factory has two machines: Machine A produces 75% of the output (3% defective) and Machine B produces 25% (8% defective). The overall defect rate is

$$
P(D) = 0.75 \times 0.03 + 0.25 \times 0.08 = 0.0225 + 0.020 = 0.0425.
$$

**Example 2:** At a college, 70% of students are undergraduates and 30% are graduates. Among undergraduates, 20% live on campus. Among graduates, 5% live on campus. The overall proportion living on campus is

$$
P(\text{on campus}) = 0.70 \times 0.20 + 0.30 \times 0.05 = 0.14 + 0.015 = 0.155.
$$

**Example 3:** A medical lab processes tests from two clinics. Clinic 1 sends 65% of the samples (2% test positive) and Clinic 2 sends 35% (6% test positive). The overall proportion of positive tests is $0.65 \times 0.02 + 0.35 \times 0.06 = 0.034$.

## Law of Large Numbers

**Definition:** As the number of trials in a random experiment increases, the empirical (observed) probability of an event tends to get closer to its theoretical (classical) probability.

**Source:** Introductory Statistics 2e, p. 201

**Example 1:** A fair coin has a 50% theoretical chance of heads. In 10 flips you might see 7 heads, giving an empirical probability of $7/10 = 0.70$. In 1000 flips the number of heads will almost certainly be close to 500, giving an empirical probability near $500/1000 = 0.50$.

**Example 2:** The probability of rolling a 3 on a fair die is $1/6 \approx 0.167$. After 10 rolls you might see 0 or 2 threes, giving empirical probabilities of $0/10 = 0$ or $2/10 = 0.20$. After 1000 rolls the number of threes will be near $1000/6 \approx 167$, for an empirical probability of $167/1000 = 0.167$.

**Example 3:** A restaurant claims 90% of customers are satisfied. A survey of 20 customers finds 17 satisfied, giving $17/20 = 0.85$. After surveying 2000 customers, 1790 report being satisfied, giving $1790/2000 = 0.895$ — close to the claimed 90%.

## Multiplication Rule

**Definition:** The probability that two events both occur is the product of the probability of the first and the conditional probability of the second given the first:

$$
P(A \cap B) = P(A) \times P(B \mid A).
$$

For three events,

$$
P(A \cap B \cap C) = P(A) \times P(B \mid A) \times P(C \mid A \cap B).
$$

When events are independent, the rule simplifies to

$$
P(A \cap B) = P(A)\,P(B).
$$

**Source:** Introductory Statistics 2e, p. 207

**Example 1:** A product passes a preliminary inspection with probability 0.88. Among those that pass the preliminary inspection, 93% pass the final inspection. The probability of passing both is $0.88 \times 0.93 = 0.8184$.

**Example 2:** Three cards are drawn without replacement from a deck of 52. The probability all three are hearts is

$$
P(\text{all hearts}) = \frac{13}{52} \times \frac{12}{51} \times \frac{11}{50} = \frac{1716}{132600} \approx 0.0129.
$$

**Example 3:** A quality control process has three independent checks with pass probabilities 0.96, 0.93, and 0.91. The probability a product passes all three is $0.96 \times 0.93 \times 0.91 \approx 0.812$.

## Mutually Exclusive

**Definition:** Two events are mutually exclusive (or disjoint) if they cannot happen at the same time: $A \cap B = \varnothing$, so $P(A \cap B) = 0$.

**Source:** Introductory Statistics 2e, p. 191

**Example 1:** For a single card drawn from a deck, "drawing a heart" and "drawing a club" are mutually exclusive — one card cannot be both suits.

**Example 2:** For a single die roll, "rolling a 3" and "rolling an even number" are mutually exclusive because 3 is not even.

**Example 3:** In a survey, "age under 18" and "age 65 and over" are mutually exclusive — a respondent cannot be in both categories.

## Outcome

**Definition:** An outcome is a single possible result of a random phenomenon. The collection of all possible outcomes forms the sample space.

**Source:** Introductory Statistics 2e, p. 184

**Example 1:** For a single coin flip, the possible outcomes are heads and tails.

**Example 2:** For rolling a fair six-sided die, the possible outcomes are $1, 2, 3, 4, 5, 6$.

**Example 3:** For a test with 10 true-false questions, each outcome is a sequence of 10 answers (e.g., T, F, T, T, F, F, T, F, T, T).

## Permutation

**Definition:** A permutation is an ordered arrangement of $k$ objects selected from a set of $n$ distinct objects. The number of permutations is

$$
P(n,k) = \frac{n!}{(n-k)!}.
$$

When $k = n$, this reduces to $n!$, the number of ways to arrange all $n$ objects.

**Source:** Mathematical Statistics with Applications in R, p. 10; Introductory Statistics 2e, p. 174

**Example 1:** Six people line up for a photo. The number of possible arrangements is $6! = 720$.

**Example 2:** A race has 8 runners. The number of ways to assign gold, silver, and bronze medals is

$$
P(8,3) = 8 \times 7 \times 6 = 336.
$$

In R: `factorial(8) / factorial(8 - 3)` returns 336.

**Example 3:** A 4-digit code uses the digits 1--9 without repetition. The number of possible codes is $P(9,4) = 9 \times 8 \times 7 \times 6 = 3,\!024$.

## Sample Space

**Definition:** The sample space $S$ of a random phenomenon is the set of all possible outcomes. An event $E$ is a subset of the sample space.

**Source:** Introductory Statistics 2e, p. 184

**Example 1:** For a single coin flip, $S = \{H, T\}$.

**Example 2:** For rolling a fair six-sided die, $S = \{1, 2, 3, 4, 5, 6\}$.

**Example 3:** For rolling two dice, the sample space consists of 36 ordered pairs:

$$
S = \{(1,1), (1,2), (1,3), (1,4), (1,5), (1,6),\\
(2,1), (2,2), (2,3), (2,4), (2,5), (2,6),\\
(3,1), (3,2), (3,3), (3,4), (3,5), (3,6),\\
(4,1), (4,2), (4,3), (4,4), (4,5), (4,6),\\
(5,1), (5,2), (5,3), (5,4), (5,5), (5,6),\\
(6,1), (6,2), (6,3), (6,4), (6,5), (6,6)\}.
$$

## Sensitivity

**Definition:** The probability that a test correctly identifies a person with the condition. Also called the true positive rate: $P(+ \mid \text{condition})$.

**Source:** Introductory Statistics 2e, p. 208

**Example 1:** In the diagnostic test from *How Reliable Is That Test?*, 85 of the 100 patients with the condition tested positive. The sensitivity is $85/100 = 0.85$.

**Example 2:** A rapid antigen test for a virus correctly identifies 93% of people who have the virus. Its sensitivity is 0.93.

**Example 3:** A mammogram has a sensitivity of approximately 0.87, meaning it correctly detects breast cancer in 87% of women who have it.

## Specificity

**Definition:** The probability that a test correctly identifies a person without the condition. Also called the true negative rate: $P(- \mid \text{no condition})$.

**Source:** Introductory Statistics 2e, p. 208

**Example 1:** In the diagnostic test from *How Reliable Is That Test?*, 855 of the 900 patients without the condition tested negative. The specificity is $855/900 = 0.95$.

**Example 2:** The same rapid antigen test correctly identifies 97% of people who do not have the virus. Its specificity is 0.97.

**Example 3:** A drug screening test has a specificity of 0.96, meaning it correctly returns a negative result for 96% of non-users.

## Two-Way Table

**Definition:** A two-way table (contingency table) displays the frequencies or proportions of observations that fall into each combination of two categorical variables. Rows represent categories of one variable and columns represent categories of the other.

**Source:** Introductory Statistics 2e, pp. 103--106

**Example 1:** A clinic recorded 200 patients by age and treatment outcome:

| | Improved | No change | Total |
|---|---:|---:|---:|
| Under 50 | 65 | 25 | 90 |
| 50 and over | 45 | 65 | 110 |
| Total | 110 | 90 | 200 |

The conditional probability a patient improved given they are under 50 is $65/90 \approx 0.722$.

**Example 2:** An insurance company surveyed 400 drivers by vehicle type and claim history:

| | Filed claim | No claim | Total |
|---|---:|---:|---:|
| Sedan | 30 | 170 | 200 |
| SUV | 45 | 155 | 200 |
| Total | 75 | 325 | 400 |

The probability a randomly selected driver filed a claim given they drive an SUV is $45/200 = 0.225$.

**Example 3:** A university compared 300 students by course format and pass rate:

| | Passed | Failed | Total |
|---|---:|---:|---:|
| Online | 140 | 20 | 160 |
| In-person | 110 | 30 | 140 |
| Total | 250 | 50 | 300 |

The joint probability a randomly selected student took an online course and passed is $140/300 \approx 0.467$.