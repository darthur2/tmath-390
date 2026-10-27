# Glossary

This glossary supports Module 4 (Distributions and Statistical Models). Entries are listed alphabetically. Each entry gives a definition, a cited source, and three examples. Each example presents a realistic scenario and question, a by-hand derivation, and matching R code so students can connect the two calculations. The examples use fresh contexts and values so they extend, rather than repeat, the course materials.

## Bernoulli Distribution

**Definition:** A discrete model for a single trial with two possible outcomes. If success has probability $p$, then $X=1$ for success and $X=0$ otherwise. Use it when each observation is one yes/no event with a constant success probability.

**Source:** *Introductory Statistics*, pp. 237-241; *Mathematical Statistics with Applications in R*, pp. 90-93.

$$
P_X(x)=p^x(1-p)^{1-x},\qquad x\in\{0,1\}
$$

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
1-p, & 0\leq x<1,\\
1, & x\geq1,
\end{cases}
\qquad E[X]=p,\qquad \operatorname{Var}[X]=p(1-p)
$$

**Example 1:** A beekeeper inspects one hive and finds the queen with probability $0.78$. How often will a single inspection miss her?

**By hand:** Let $X=1$ mean the queen is found. Then $X\sim\operatorname{Bernoulli}(0.78)$, so $P(X=0)=1-0.78=0.22$. In R, `dbinom` with `size = 1` gives the Bernoulli PMF.

**In R:**
```r
p <- 0.78
1 - p
dbinom(0, size = 1, prob = p)
```

**Example 2:** A website shows one ad impression, and a click occurs with probability $0.04$. What is the expected number of clicks per impression, and how variable is it?

**By hand:** For $X\sim\operatorname{Bernoulli}(0.04)$, $E[X]=p=0.04$ and $\operatorname{Var}[X]=p(1-p)=0.04(0.96)=0.0384$.

**In R:**
```r
p <- 0.04
c(mean = p, variance = p * (1 - p))
```

**Example 3:** A factory checks one part, and the chance it is defective is $0.03$. What is the probability the part passes?

**By hand:** Let $X=1$ mean defective. Then $P(X=0)=1-P(X=1)=1-0.03=0.97$. In R, `pbinom` gives the Bernoulli CDF directly.

**In R:**
```r
p <- 0.03
1 - p
pbinom(0, size = 1, prob = p)
```

## Beta Distribution

**Definition:** A continuous model for proportions or fractions on $0<X<1$. Its shape parameters $\alpha$ and $\beta$ let it represent symmetric, skewed, or U-shaped proportions. Use it when the data are percentages or rates bounded between zero and one.

**Source:** *Mathematical Statistics with Applications in R*, pp. 108-109.

$$
f_X(x)=\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)},\qquad 0<x<1
$$

$$
F_X(x)=
\begin{cases}
0, & x\leq0,\\
I_x(\alpha,\beta), & 0<x<1,\\
1, & x\geq1,
\end{cases}
\qquad E[X]=\frac{\alpha}{\alpha+\beta},\qquad \operatorname{Var}[X]=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}
$$

**Example 1:** A marine biologist records the fraction of a coral reef that is bleached, and a Beta$(4,2)$ model fits the observed proportions. What is the chance that more than 70% of the reef is bleached?

**By hand:** Here $B(4,2)=\Gamma(4)\Gamma(2)/\Gamma(6)=6/120=1/20$, so $f(x)=20x^3(1-x)$. Thus
$$
P(X>0.7)=20\int_{0.7}^{1}(x^3-x^4)\,dx
=20\left[\frac{x^4}{4}-\frac{x^5}{5}\right]_{0.7}^{1}=0.4718.
$$
R evaluates this beta-tail integral with `pbeta`.

**In R:**
```r
pbeta(0.7, shape1 = 4, shape2 = 2, lower.tail = FALSE)
```

**Example 2:** A device's battery charge at a random time is modeled as Beta$(2,5)$, a proportion between empty and full. What is the height of the density curve at 30% charge?

**By hand:** Here $B(2,5)=\Gamma(2)\Gamma(5)/\Gamma(7)=24/720=1/30$, so
$$
f(0.3)=\frac{(0.3)^{1}(0.7)^{4}}{1/30}=30(0.3)(0.7)^4=2.1609.
$$
In R, `dbeta` evaluates this density.

**In R:**
```r
alpha <- 2
beta_shape <- 5
x <- 0.3
30 * x * (1 - x)^4
dbeta(x, shape1 = alpha, shape2 = beta_shape)
```

**Example 3:** An urban ecologist models the share of a neighborhood covered by trees as Beta$(3,4)$. What is the chance the tree cover is between 30% and 70%?

**By hand:** Since $B(3,4)=1/60$, $f(x)=60x^2(1-x)^3$. Expanding,
$$
P(0.3<X<0.7)=60\int_{0.3}^{0.7}(x^2-3x^3+3x^4-x^5)\,dx
=60\left[\frac{x^3}{3}-\frac{3x^4}{4}+\frac{3x^5}{5}-\frac{x^6}{6}\right]_{0.3}^{0.7}=0.6738.
$$

**In R:**
```r
pbeta(0.7, shape1 = 3, shape2 = 4) - pbeta(0.3, shape1 = 3, shape2 = 4)
```

## Binomial Distribution

**Definition:** A discrete model for the number of successes in a fixed number $n$ of independent trials, each with the same success probability $p$. Use it when the total number of trials is known in advance and each trial is binary.

**Source:** *Introductory Statistics*, pp. 237-241; *Mathematical Statistics with Applications in R*, pp. 90-94.

$$
P_X(x)=\binom{n}{x}p^x(1-p)^{n-x},\qquad x=0,1,\ldots,n
$$

$$
F_X(x)=\sum_{k=0}^{\lfloor x\rfloor}\binom{n}{k}p^k(1-p)^{n-k},\qquad E[X]=np,\qquad \operatorname{Var}[X]=np(1-p)
$$

**Example 1:** A biologist monitors 12 eggs in a clutch, each hatching independently with probability $0.75$. What is the chance that at least 9 hatch?

**By hand:** For $X\sim\operatorname{Binomial}(12,0.75)$,
$$
P(X\geq9)=\sum_{x=9}^{12}\binom{12}{x}(0.75)^x(0.25)^{12-x}=0.6488.
$$
In R, `dbinom` gives the individual PMF values and `pbinom` gives the accumulated tail probability.

**In R:**
```r
n <- 12
p <- 0.75
sum(dbinom(9:12, size = n, prob = p))
pbinom(8, size = n, prob = p, lower.tail = FALSE)
```

**Example 2:** A basketball player takes 20 free throws, each made independently with probability $0.8$. What are the expected number made and the variance?

**By hand:** For $X\sim\operatorname{Binomial}(20,0.8)$, $E[X]=np=20(0.8)=16$ and $\operatorname{Var}[X]=np(1-p)=20(0.8)(0.2)=3.2$.

**In R:**
```r
n <- 20
p <- 0.8
c(mean = n * p, variance = n * p * (1 - p))
```

**Example 3:** An airline offers upgrades to 30 passengers, each accepting independently with probability $0.6$. What is the chance that at most 15 accept?

**By hand:** For $X\sim\operatorname{Binomial}(30,0.6)$,
$$
P(X\leq15)=\sum_{x=0}^{15}\binom{30}{x}(0.6)^x(0.4)^{30-x}=0.1754.
$$
In R, `pbinom` evaluates this CDF directly.

**In R:**
```r
n <- 30
p <- 0.6
sum(dbinom(0:15, size = n, prob = p))
pbinom(15, size = n, prob = p)
```

## Conditional Distribution

**Definition:** The distribution of one variable after the value of another variable is known. For discrete variables, divide the joint PMF by the marginal PMF of the conditioning variable; for continuous variables, divide the joint PDF by the marginal PDF. Use it to describe one variable within a subgroup defined by the other.

**Source:** *Mathematical Statistics with Applications in R*, pp. 114-117.

$$
P_{Y\mid X}(y\mid x)=\frac{P_{X,Y}(x,y)}{P_X(x)},\qquad
f_{Y\mid X}(y\mid x)=\frac{f_{X,Y}(x,y)}{f_X(x)}
$$

$$
E[Y\mid X=x]=\sum_y yP_{Y\mid X}(y\mid x)\quad\text{or}\quad
E[Y\mid X=x]=\int yf_{Y\mid X}(y\mid x)\,dy
$$

**Example 1:** A gym model records whether a visitor takes a group class ($X=1$ if yes) and how many equipment stations they use ($Y=0,1,2$). The joint PMF is

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---:|---:|---:|
| $X=0$ | 0.15 | 0.25 | 0.10 |
| $X=1$ | 0.05 | 0.30 | 0.15 |

What is the conditional distribution of equipment use given that the visitor takes a group class?

**By hand:** The marginal probability of a group class is
$$
P_X(1)=0.05+0.30+0.15=0.50.
$$
Dividing each cell in the $X=1$ row by $0.50$ gives
$$
P_{Y\mid X}(0\mid1)=\frac{0.05}{0.50}=0.10,\quad
P_{Y\mid X}(1\mid1)=\frac{0.30}{0.50}=0.60,\quad
P_{Y\mid X}(2\mid1)=\frac{0.15}{0.50}=0.30.
$$

**In R:**
```r
x <- c(0, 0, 0, 1, 1, 1)
y <- c(0, 1, 2, 0, 1, 2)
joint <- c(0.15, 0.25, 0.10, 0.05, 0.30, 0.15)
p_x1 <- sum(joint[x == 1])
c(Y0 = sum(joint[x == 1 & y == 0]) / p_x1,
  Y1 = sum(joint[x == 1 & y == 1]) / p_x1,
  Y2 = sum(joint[x == 1 & y == 2]) / p_x1)
```

**Example 2:** A lab models normalized temperature $X$ and normalized pressure $Y$ with joint density
$$
f_{X,Y}(x,y)=x+y,\qquad 0<x<1,\;0<y<1.
$$
What is the probability that pressure is below 0.5 given that temperature is 0.25?

**By hand:** The marginal density at $x=0.25$ is
$$
f_X(0.25)=\int_{0}^{1}(0.25+y)\,dy=0.25+0.5=0.75.
$$
Thus
$$
f_{Y\mid X}(y\mid0.25)=\frac{0.25+y}{0.75},\qquad 0<y<1.
$$
Therefore
$$
P(Y<0.5\mid X=0.25)
=\int_{0}^{0.5}\frac{0.25+y}{0.75}\,dy
=\frac{0.125+0.125}{0.75}=\frac{1}{3}.
$$

**In R:** The marginal density divides out the joint density, and the conditional probability integrates that result.
```r
joint <- function(x, y) x + y
marginal_x <- function(x) {
  integrate(function(y) joint(x, y), lower = 0, upper = 1)$value
}
conditional_y <- function(y, x) joint(x, y) / marginal_x(x)
marginal_x(0.25)
integrate(function(y) conditional_y(y, 0.25), lower = 0, upper = 0.5)$value
```

**Example 3:** Using the gym model from Example 1, what is the expected number of equipment stations used by a visitor who takes a group class?

**By hand:** Use the conditional distribution from Example 1:
$$
E[Y\mid X=1]=0(0.10)+1(0.60)+2(0.30)=0+0.60+0.60=1.20.
$$

**In R:**
```r
y <- c(0, 1, 2)
p_y_given_x1 <- c(0.10, 0.60, 0.30)
sum(y * p_y_given_x1)
```

## Continuous Random Variable

**Definition:** A random variable whose values are measurements on a continuous scale. Probabilities are areas under a density, so the probability of any exact value is zero. Use it for quantities such as time, length, mass, or temperature.

**Source:** *Introductory Statistics*, pp. 291-292; *Mathematical Statistics with Applications in R*, pp. 65-66.

**Example 1:** A weather station models daily rainfall as Normal with mean 30 mm and standard deviation 8 mm. What is the chance that a day exceeds 40 mm?

**By hand:** Standardize: $z=(40-30)/8=1.25$. Then $P(X>40)=P(Z>1.25)=1-\Phi(1.25)=0.1056$.

**In R:**
```r
z <- (40 - 30) / 8
pnorm(z, lower.tail = FALSE)
```

**Example 2:** A commuter's travel time is modeled as Normal with mean 22 minutes and standard deviation 5 minutes. What is the chance the trip takes between 18 and 26 minutes?

**By hand:** The endpoints standardize to $z_1=(18-22)/5=-0.8$ and $z_2=(26-22)/5=0.8$. Thus $P(18<X<26)=\Phi(0.8)-\Phi(-0.8)=0.5763$.

**In R:**
```r
z1 <- (18 - 22) / 5
z2 <- (26 - 22) / 5
pnorm(z2) - pnorm(z1)
```

**Example 3:** A delivery service models order-to-door time as Normal with mean 120 minutes and standard deviation 20 minutes. What is the density at 150 minutes?

**By hand:** Here $z=(150-120)/20=1.5$, so
$$
f(150)=\frac{1}{20\sqrt{2\pi}}e^{-(1.5)^2/2}=0.006475.
$$
In R, `dnorm` evaluates this density.

**In R:**
```r
z <- (150 - 120) / 20
dnorm(150, mean = 120, sd = 20)
```

## Correlation

**Definition:** A standardized measure of the direction and strength of the linear association between two variables, $\operatorname{Corr}(X,Y)=\operatorname{Cov}(X,Y)/\sqrt{\operatorname{Var}[X]\operatorname{Var}[Y]}$. It ranges from $-1$ to $1$. Use it to summarize linear association, not to prove causation or independence.

**Source:** *Introductory Statistics*, pp. 630-631; *Mathematical Statistics with Applications in R*, p. 119.

**Example 1:** A solar engineer records sunlight hours and panel output for five days. Do long sunny days tend to produce more energy?

**By hand:** The means are $\bar x=4$ and $\bar y=18.6$. The summaries are
$$
\sum (x_i-\bar x)(y_i-\bar y)=41,\quad
\sum (x_i-\bar x)^2=10,\quad
\sum (y_i-\bar y)^2=169.2.
$$
Thus
$$
r=\frac{41}{\sqrt{(10)(169.2)}}=0.9967.
$$

**In R:**
```r
sunlight <- c(2, 3, 4, 5, 6)
output <- c(11, 14, 18, 23, 27)
cor(sunlight, output)
```

**Example 2:** An automotive engineer measures engine torque and fuel consumption at a fixed speed for five engines. Are the two quantities positively associated?

**By hand:** Here $\bar x=130$ and $\bar y=7.44$, with
$$
\sum (x_i-\bar x)(y_i-\bar y)=122,\quad
\sum (x_i-\bar x)^2=4000,\quad
\sum (y_i-\bar y)^2=3.732.
$$
Therefore
$$
r=\frac{122}{\sqrt{(4000)(3.732)}}=0.9985.
$$

**In R:**
```r
torque <- c(90, 110, 130, 150, 170)
fuel <- c(6.2, 6.8, 7.5, 8.1, 8.6)
cor(torque, fuel)
```

**Example 3:** A model pairs two binary indicators with joint probabilities $P(0,0)=0.4$, $P(0,1)=0.1$, $P(1,0)=0.1$, and $P(1,1)=0.4$. What is the model correlation?

**By hand:** The marginals are both $0.5$, so $E[X]=E[Y]=0.5$ and $\operatorname{Var}[X]=\operatorname{Var}[Y]=(0.5)(0.5)=0.25$. Also $E[XY]=P(X=1,Y=1)=0.4$, hence $\operatorname{Cov}(X,Y)=0.4-(0.5)(0.5)=0.15$. Therefore
$$
\operatorname{Corr}(X,Y)=\frac{0.15}{\sqrt{(0.25)(0.25)}}=0.6.
$$

**In R:**
```r
x <- c(0, 0, 1, 1)
y <- c(0, 1, 0, 1)
joint <- c(0.4, 0.1, 0.1, 0.4)
mean_x <- sum(x * joint)
mean_y <- sum(y * joint)
cov_xy <- sum(x * y * joint) - mean_x * mean_y
var_x <- sum((x - mean_x)^2 * joint)
var_y <- sum((y - mean_y)^2 * joint)
cov_xy / sqrt(var_x * var_y)
```

## Covariance

**Definition:** A measure of whether two variables tend to move above or below their means together, $\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$. Its sign gives the direction of association, while its size depends on the units. Use it as a building block for correlation and variance calculations.

**Source:** *Mathematical Statistics with Applications in R*, pp. 119-120.

**Example 1:** A downtown garage records whether it is peak hours and whether the garage is full, with joint probabilities $P(0,0)=0.25$, $P(0,1)=0.15$, $P(1,0)=0.15$, and $P(1,1)=0.45$. Do peak hours and fullness tend to occur together?

**By hand:** The marginals give $E[X]=0.15+0.45=0.6$ and $E[Y]=0.15+0.45=0.6$. Also $E[XY]=(1)(1)(0.45)=0.45$. Thus
$$
\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]=0.45-(0.6)(0.6)=0.09.
$$

**In R:**
```r
x <- c(0, 0, 1, 1)
y <- c(0, 1, 0, 1)
joint <- c(0.25, 0.15, 0.15, 0.45)
mean_x <- sum(x * joint)
mean_y <- sum(y * joint)
sum(x * y * joint) - mean_x * mean_y
```

**Example 2:** A chemical engineer measures reactor temperature and product viscosity for five batches. Does viscosity tend to fall as temperature rises?

**By hand:** The means are $\bar x=170$ and $\bar y=34.8$. The deviations give
$$
\sum (x_i-\bar x)(y_i-\bar y)=-350,
$$
so the sample covariance is
$$
s_{xy}=\frac{-350}{5-1}=-87.5.
$$

**In R:**
```r
temperature <- c(150, 160, 170, 180, 190)
viscosity <- c(42, 38, 35, 31, 28)
cov(temperature, viscosity)
```

**Example 3:** Two independent indicators have $P(X=1)=0.5$ and $P(Y=1)=0.4$. What is their covariance?

**By hand:** Independence gives $E[XY]=E[X]E[Y]=(0.5)(0.4)=0.2$. Since $E[X]=0.5$ and $E[Y]=0.4$,
$$
\operatorname{Cov}(X,Y)=0.2-(0.5)(0.4)=0.
$$

**In R:**
```r
x <- c(0, 0, 1, 1)
y <- c(0, 1, 0, 1)
joint <- c(0.3, 0.2, 0.3, 0.2)
mean_x <- sum(x * joint)
mean_y <- sum(y * joint)
sum(x * y * joint) - mean_x * mean_y
```

## Cross-Moment

**Definition:** The expectation of the product of two random variables, $E[XY]$. For discrete variables, sum $xyP_{X,Y}(x,y)$ over the joint support; for continuous variables, integrate $xyf_{X,Y}(x,y)$. Use it with $E[X]$ and $E[Y]$ to compute covariance.

**Source:** *Mathematical Statistics with Applications in R*, p. 119.

**Example 1:** A travel survey records whether a passenger uses a rail pass ($X=1$) and whether the trip includes a transfer ($Y=1$), with joint probabilities $P(0,0)=0.5$, $P(0,1)=0.2$, $P(1,0)=0.1$, and $P(1,1)=0.2$. What is $E[XY]$?

**By hand:** Only the $(1,1)$ cell has $xy=1$, so
$$
E[XY]=\sum_x\sum_y xyP(x,y)=1(1)(0.2)=0.2.
$$

**In R:**
```r
x <- c(0, 0, 1, 1)
y <- c(0, 1, 0, 1)
joint <- c(0.5, 0.2, 0.1, 0.2)
sum(x * y * joint)
```

**Example 2:** Two independent waiting times have $X\sim\operatorname{Exponential}(2)$ and $Y\sim\operatorname{Exponential}(4)$, so $E[X]=0.5$ and $E[Y]=0.25$. What is $E[XY]$?

**By hand:** Independence lets the expectation factor:
$$
E[XY]=E[X]E[Y]=\frac{1}{2}\cdot\frac{1}{4}=0.125.
$$

**In R:**
```r
mean_x <- 1 / 2
mean_y <- 1 / 4
mean_x * mean_y
```

**Example 3:** A delivery study lets $Y=1$ indicate an express order and $X$ be delivery distance. If $P(Y=1)=0.4$ and $E[X\mid Y=1]=3$, what is $E[XY]$?

**By hand:** Only express orders contribute, so
$$
E[XY]=E[X\mid Y=1]P(Y=1)=(3)(0.4)=1.2.
$$

**In R:**
```r
p_express <- 0.4
mean_distance_express <- 3
p_express * mean_distance_express
```

## Cumulative Distribution Function (CDF)

**Definition:** The function $F_X(x)=P(X\leq x)$, which gives the probability that a random variable is at most $x$. It is nondecreasing and contains the same information as a PMF or PDF. Use it to accumulate probability up to a threshold.

**Source:** *Introductory Statistics*, pp. 291-294; *Mathematical Statistics with Applications in R*, pp. 64-66.

**Example 1:** A quality inspector counts successes among 8 independent trials with success probability $0.4$. What is the probability of at most 3 successes?

**By hand:** For $X\sim\operatorname{Binomial}(8,0.4)$,
$$
F_X(3)=P(X\leq3)=\sum_{x=0}^{3}\binom{8}{x}(0.4)^x(0.6)^{8-x}=0.5941.
$$
In R, the CDF function `pbinom` returns this accumulated probability directly.

**In R:**
```r
sum(dbinom(0:3, size = 8, prob = 0.4))
pbinom(3, size = 8, prob = 0.4)
```

**Example 2:** A hydrologist models river depth as Normal with mean 4 m and standard deviation 1.2 m. What is the probability the depth is at most 5 m?

**By hand:** Standardize: $z=(5-4)/1.2=0.8333$. Then $F_X(5)=\Phi(0.8333)=0.7977$. In R, `pnorm` evaluates this CDF.

**In R:**
```r
z <- (5 - 4) / 1.2
pnorm(z)
pnorm(5, mean = 4, sd = 1.2)
```

**Example 3:** A piano tuner models a note's frequency as Normal with mean 440 Hz and standard deviation 2 Hz. What is the probability the frequency lands between 439.5 and 440.5 Hz?

**By hand:** The endpoints give $z_1=(439.5-440)/2=-0.25$ and $z_2=(440.5-440)/2=0.25$. Thus
$$
P(439.5<X<440.5)=\Phi(0.25)-\Phi(-0.25)=0.1974.
$$
In R, subtracting two `pnorm` CDF values gives the interval probability.

**In R:**
```r
z1 <- (439.5 - 440) / 2
z2 <- (440.5 - 440) / 2
pnorm(z2) - pnorm(z1)
pnorm(440.5, mean = 440, sd = 2) - pnorm(439.5, mean = 440, sd = 2)
```

## Discrete Random Variable

**Definition:** A random variable that takes a finite or countable set of separate values, usually counts. A PMF assigns probability to each value in its support. Use it when the outcomes can be listed and counted.

**Source:** *Introductory Statistics*, pp. 227-229; *Mathematical Statistics with Applications in R*, p. 64.

**Example 1:** A library models the number of books a member borrows in one visit as Poisson with mean 2.5. What is the probability the member borrows exactly 2 books?

**By hand:** For $X\sim\operatorname{Poisson}(2.5)$,
$$
P(X=2)=\frac{e^{-2.5}(2.5)^2}{2!}=0.2565.
$$
In R, the PMF function `dpois` evaluates this exact-value probability.

**In R:**
```r
lambda <- 2.5
x <- 2
exp(-lambda) * lambda^x / factorial(x)
dpois(x, lambda = lambda)
```

**Example 2:** A soccer analyst models goals per match as Poisson with mean 1.6. What is the probability a match has at least one goal?

**By hand:** Using the complement,
$$
P(X\geq1)=1-P(X=0)=1-e^{-1.6}=0.7981.
$$
In R, `ppois` evaluates the CDF, and `lower.tail = FALSE` gives the upper tail.

**In R:**
```r
lambda <- 1.6
1 - exp(-lambda)
ppois(0, lambda = lambda, lower.tail = FALSE)
```

**Example 3:** A utility models household power interruptions per month as Poisson with mean 0.8. What is the probability of no interruptions in a month?

**By hand:** $P(X=0)=e^{-0.8}(0.8)^0/0!=e^{-0.8}=0.4493$. In R, `dpois` gives this PMF value directly.

**In R:**
```r
lambda <- 0.8
exp(-lambda)
dpois(0, lambda = lambda)
```

## Expected Value (Expectation)

**Definition:** The probability-weighted average of a random variable. For discrete $X$, $E[X]=\sum_x xP_X(x)$; for continuous $X$, $E[X]=\int x f_X(x)\,dx$. Use it to describe the long-run average outcome of a model.

**Source:** *Introductory Statistics*, pp. 230-234; *Mathematical Statistics with Applications in R*, pp. 71-73.

**Example 1:** A museum records maps borrowed per visitor with probabilities $P(0)=0.2$, $P(1)=0.5$, and $P(2)=0.3$. What is the expected number of maps borrowed?

**By hand:** Weight each value by its probability:
$$
E[X]=0(0.2)+1(0.5)+2(0.3)=0+0.5+0.6=1.1.
$$

**In R:**
```r
items <- c(0, 1, 2)
probability <- c(0.2, 0.5, 0.3)
sum(items * probability)
```

**Example 2:** A shuttle arrives equally often at any time between 4 and 16 minutes after a rider reaches the stop. What is the expected wait?

**By hand:** The density is $f(x)=1/(16-4)=1/12$ on $[4,16]$, so
$$
E[X]=\int_{4}^{16}x\frac{1}{12}\,dx
=\left[\frac{x^2}{24}\right]_{4}^{16}
=\frac{256-16}{24}=10.
$$

**In R:**
```r
lower <- 4
upper <- 16
density <- 1 / (upper - lower)
integrate(function(x) x * density, lower = lower, upper = upper)
```

**Example 3:** A call center models the time between calls as Exponential with rate $1/4$ per minute. What is the expected time between calls?

**By hand:** Integration by parts with $u=x$ and $dv=(1/4)e^{-x/4}\,dx$ gives
$$
E[X]=\int_{0}^{\infty}x\frac{1}{4}e^{-x/4}\,dx
=\left[-xe^{-x/4}\right]_{0}^{\infty}+\int_{0}^{\infty}e^{-x/4}\,dx
=0+4=4.
$$

**In R:**
```r
rate <- 1 / 4
integrate(function(x) x * rate * exp(-rate * x), lower = 0, upper = Inf)
```

## Exponential Distribution

**Definition:** A continuous model for nonnegative waiting times between events that occur at a constant rate $\lambda$. Its mean is $1/\lambda$ and its variance is $1/\lambda^2$. Use it for time-until-event data with a constant hazard rate.

**Source:** *Introductory Statistics*, pp. 302-311; *Mathematical Statistics with Applications in R*, p. 106.

$$
f_X(x)=\lambda e^{-\lambda x},\qquad x\geq0
$$

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
1-e^{-\lambda x}, & x\geq0,
\end{cases}
\qquad E[X]=\frac{1}{\lambda},\qquad \operatorname{Var}[X]=\frac{1}{\lambda^2}
$$

**Example 1:** Buses reach a remote stop at an average rate of 3 per hour. What is the probability the next bus takes longer than 20 minutes?

**By hand:** Convert 20 minutes to $1/3$ hour. For $X\sim\operatorname{Exponential}(3)$,
$$
P(X>1/3)=e^{-3(1/3)}=e^{-1}=0.3679.
$$
In R, `pexp` evaluates the exponential CDF/tail.

**In R:**
```r
rate <- 3
x <- 1 / 3
exp(-rate * x)
pexp(x, rate = rate, lower.tail = FALSE)
```

**Example 2:** A radioactive isotope decays at an average rate of one atom per 8 years. What is the probability a particular atom survives more than 5 years?

**By hand:** Here $\lambda=1/8$, so
$$
P(X>5)=e^{-(1/8)(5)}=e^{-0.625}=0.5353.
$$
In R, `pexp` gives this survival probability directly.

**In R:**
```r
rate <- 1 / 8
x <- 5
exp(-rate * x)
pexp(x, rate = rate, lower.tail = FALSE)
```

**Example 3:** Visitors enter a quiet museum at an average rate of 0.2 per minute. What is the density of the waiting time at 3 minutes?

**By hand:** For $\lambda=0.2$,
$$
f(3)=(0.2)e^{-(0.2)(3)}=0.2e^{-0.6}=0.1098.
$$
In R, `dexp` evaluates this density.

**In R:**
```r
rate <- 0.2
x <- 3
rate * exp(-rate * x)
dexp(x, rate = rate)
```

## Gamma Distribution

**Definition:** A continuous model for nonnegative waiting times or positive amounts, with shape $\alpha>0$ and rate $\beta>0$. It generalizes the Exponential and can model sums of waiting times or right-skewed positive data. Use it when positive data are skewed and not well described by a symmetric model.

**Source:** *Mathematical Statistics with Applications in R*, pp. 104-108.

$$
f_X(x)=\frac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x},\qquad x\geq0
$$

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
\dfrac{\gamma(\alpha,\beta x)}{\Gamma(\alpha)}, & x\geq0,
\end{cases}
\qquad E[X]=\frac{\alpha}{\beta},\qquad \operatorname{Var}[X]=\frac{\alpha}{\beta^2}
$$

**Example 1:** A geochemist models dissolved mineral concentration as Gamma$(4,0.5)$. What is the chance a sample exceeds 10 units?

**By hand:** For $\alpha=4$ and $\beta=0.5$,
$$
P(X>10)=\int_{10}^{\infty}\frac{(0.5)^4}{\Gamma(4)}x^{3}e^{-0.5x}\,dx=0.2650.
$$
The integral is the upper gamma-tail probability, which is evaluated directly in R below.

**In R:**
```r
shape <- 4
rate <- 0.5
pgamma(10, shape = shape, rate = rate, lower.tail = FALSE)
```

**Example 2:** A climatologist models seasonal precipitation as Gamma$(3,2)$ in meters. What are the mean and variance?

**By hand:** Using $\alpha=3$ and $\beta=2$,
$$
E[X]=\frac{\alpha}{\beta}=\frac{3}{2}=1.5,\qquad
\operatorname{Var}[X]=\frac{\alpha}{\beta^2}=\frac{3}{4}=0.75.
$$

**In R:**
```r
shape <- 3
rate <- 2
c(mean = shape / rate, variance = shape / rate^2)
```

**Example 3:** A chemist models reagent concentration as Gamma$(2,4)$ in suitable units. What is the density at 1 unit?

**By hand:** Here $\alpha=2$ and $\beta=4$, so
$$
f(1)=\frac{4^2}{\Gamma(2)}(1)^{1}e^{-4}=16e^{-4}=0.2931.
$$
In R, `dgamma` evaluates this density.

**In R:**
```r
shape <- 2
rate <- 4
x <- 1
rate^shape / factorial(shape - 1) * x^(shape - 1) * exp(-rate * x)
dgamma(x, shape = shape, rate = rate)
```

## Geometric Distribution

**Definition:** A discrete model for the number of failures before the first success in independent trials with success probability $p$. Its support is $0,1,2,\ldots$ and $E[X]=(1-p)/p$. Use it when trials repeat until the first success and the number of trials is not fixed in advance.

**Source:** *Introductory Statistics*, pp. 242-245; *Mathematical Statistics with Applications in R*, pp. 187-189.

$$
P_X(x)=(1-p)^x p,\qquad x=0,1,2,\ldots
$$

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
1-(1-p)^{\lfloor x\rfloor+1}, & x\geq0,
\end{cases}
\qquad E[X]=\frac{1-p}{p},\qquad \operatorname{Var}[X]=\frac{1-p}{p^2}
$$

**Example 1:** A basketball player makes each free throw independently with probability $0.7$. What is the probability of at least 3 misses before the first make?

**By hand:** For $X\sim\operatorname{Geometric}(0.7)$,
$$
P(X\geq3)=P(X>2)=(1-0.7)^3=0.3^3=0.027.
$$
In R, `pgeom` evaluates this geometric tail probability.

**In R:**
```r
p <- 0.7
(1 - p)^3
pgeom(2, prob = p, lower.tail = FALSE)
```

**Example 2:** A photographer's shots are in focus independently with probability $0.5$. What is the probability exactly 2 shots are out of focus before the first good one?

**By hand:** Using $P(X=x)=(1-p)^x p$,
$$
P(X=2)=(1-0.5)^2(0.5)=0.5^2(0.5)=0.125.
$$
In R, `dgeom` evaluates this PMF value.

**In R:**
```r
p <- 0.5
x <- 2
(1 - p)^x * p
dgeom(x, prob = p)
```

**Example 3:** A driver finds an available parking stall with probability $0.3$ at each independently checked stall. How many occupied stalls does the driver expect before the first available one?

**By hand:** The geometric mean is
$$
E[X]=\frac{1-p}{p}=\frac{1-0.3}{0.3}=2.333.
$$

**In R:**
```r
p <- 0.3
(1 - p) / p
```

## Independence of Random Variables

**Definition:** Two random variables are independent when their joint distribution factors into their marginals: $P_{X,Y}(x,y)=P_X(x)P_Y(y)$ for discrete variables, or $f_{X,Y}(x,y)=f_X(x)f_Y(y)$ for continuous variables. Use independence to multiply probabilities, but remember that zero correlation alone does not prove it.

**Source:** *Mathematical Statistics with Applications in R*, p. 114.

**Example 1:** Two fair dice are rolled. What is the probability the first shows 3 and the second shows 4?

**By hand:** Independence multiplies the marginal probabilities:
$$
P(X=3,Y=4)=P(X=3)P(Y=4)=\frac{1}{6}\cdot\frac{1}{6}=0.0278.
$$

**In R:**
```r
(1 / 6) * (1 / 6)
```

**Example 2:** Two fair coins are tossed. What is the probability both land heads?

**By hand:** The tosses are independent, so
$$
P(\text{both heads})=(0.5)(0.5)=0.25.
$$

**In R:**
```r
0.5 * 0.5
```

**Example 3:** A model lets $X$ take values $-1$, $0$, and $1$ with equal probability, and sets $Y=X^2$. Can we conclude independence from zero correlation?

**By hand:** $E[X]=0$ and $E[Y]=E[X^2]=2/3$. Also $E[XY]=E[X^3]=0$, so
$$
\operatorname{Cov}(X,Y)=0-(0)\left(\frac{2}{3}\right)=0.
$$
Moreover $\operatorname{Var}[X]=E[X^2]-(E[X])^2=2/3$ and
$$
\operatorname{Var}[Y]=E[Y^2]-(E[Y])^2=\frac{2}{3}-\frac{4}{9}=\frac{2}{9},
$$
so the correlation is $0/\sqrt{(2/3)(2/9)}=0$. But $Y$ is completely determined by $X$, so the variables are dependent despite zero correlation.

**In R:**
```r
x <- c(-1, 0, 1)
y <- x^2
p <- c(1/3, 1/3, 1/3)
mean_x <- sum(x * p)
mean_y <- sum(y * p)
cov_xy <- sum(x * y * p) - mean_x * mean_y
var_x <- sum((x - mean_x)^2 * p)
var_y <- sum((y - mean_y)^2 * p)
c(covariance = cov_xy, correlation = cov_xy / sqrt(var_x * var_y))
```

## Joint Distribution

**Definition:** A PMF, PDF, or mixed model that describes two or more random variables together. It assigns probability to combinations of values and sums or integrates to one over the joint support. Use it when two variables are measured on the same unit and their relationship matters.

**Source:** *Mathematical Statistics with Applications in R*, pp. 112-113.

**Example 1:** A delivery hub uses two scanners to read each parcel label. Let $X=1$ if the first scanner reads the label and $Y=1$ if the second scanner does. Their joint PMF is
$$
P_{X,Y}(x,y)=
\begin{cases}
0.55, & (x,y)=(0,0)\text{ or }(1,1),\\
0.05, & (x,y)=(0,1)\text{ or }(1,0),\\
0, & \text{otherwise}.
\end{cases}
$$
What is the probability the two scanners disagree?

**By hand:** The scanners disagree in the cells $(0,1)$ and $(1,0)$, so
$$
P(X\neq Y)=P(0,1)+P(1,0)=0.05+0.05=0.10.
$$

**In R:**
```r
x <- c(0, 0, 1, 1)
y <- c(0, 1, 0, 1)
joint <- c(0.55, 0.05, 0.05, 0.35)
sum(joint[x != y])
```

**Example 2:** A farm stand records whether a customer buys fruit ($X=1$ if yes) and how many vegetables they buy ($Y=0,1,2$). The joint PMF is

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---:|---:|---:|
| $X=0$ | 0.30 | 0.15 | 0.05 |
| $X=1$ | 0.10 | 0.25 | 0.15 |

What is the probability a customer buys fruit and at least one vegetable?

**By hand:** The event is $X=1$ and $Y\geq1$, so add the two relevant cells:
$$
P(X=1,Y\geq1)=0.25+0.15=0.40.
$$

**In R:**
```r
x <- c(0, 0, 0, 1, 1, 1)
y <- c(0, 1, 2, 0, 1, 2)
joint <- c(0.30, 0.15, 0.05, 0.10, 0.25, 0.15)
sum(joint[x == 1 & y >= 1])
```

**Example 3:** A lab records normalized temperature $X$ and normalized pressure $Y$, both between 0 and 1. Their joint density is
$$
f_{X,Y}(x,y)=x+y,\qquad 0<x<1,\;0<y<1.
$$
What is the probability that the two normalized readings sum to less than 1?

**By hand:** The region is $0<x<1$ and $0<y<1-x$, so
$$
P(X+Y<1)=\int_{0}^{1}\int_{0}^{1-x}(x+y)\,dy\,dx
=\int_{0}^{1}\frac{1-x^2}{2}\,dx
=\frac{1}{3}.
$$

**In R:** The indicator restricts the unit square to the triangular region $y<1-x$, and `cubature` evaluates the double integral directly.
```r
library(cubature)
joint <- function(v) {
  x <- v[1]
  y <- v[2]
  ifelse(y < 1 - x, x + y, 0)
}
hcubature(joint, lowerLimit = c(0, 0), upperLimit = c(1, 1))$integral
```

## Linear Transformation

**Definition:** A transformation of the form $Y=aX+b$ with $a\neq0$. It shifts the mean to $E[Y]=aE[X]+b$ and scales the variance to $\operatorname{Var}[Y]=a^2\operatorname{Var}[X]$. Use it when changing units, rescaling scores, or applying a fixed fee.

**Source:** *Introductory Statistics*, p. 351; *Mathematical Statistics with Applications in R*, pp. 73-75.

**Example 1:** A lab records temperature in Celsius as $X\sim\operatorname{Normal}(20,4)$ and converts it to Fahrenheit with $Y=1.8X+32$. What are the mean and variance of $Y$?

**By hand:** Apply the linear rules with $a=1.8$ and $b=32$:
$$
E[Y]=1.8(20)+32=68,\qquad
\operatorname{Var}[Y]=(1.8)^2(16)=51.84.
$$

**In R:**
```r
mean_x <- 20
var_x <- 16
c(mean = 1.8 * mean_x + 32, variance = 1.8^2 * var_x)
```

**Example 2:** A recipe doubles the serving count from 2 to 6, multiplying each ingredient amount by 3. If the original amount has mean 2 and variance 4, what are the new mean and variance?

**By hand:** Here $a=3$ and $b=0$, so
$$
E[Y]=3(2)=6,\qquad \operatorname{Var}[Y]=3^2(4)=36.
$$

**In R:**
```r
c(mean = 3 * 2, variance = 3^2 * 4)
```

**Example 3:** A tutor reports a course score as $Y=1.25X+2.5$, where $X$ has mean 80 and variance 36. What are the mean and variance of the reported score?

**By hand:** With $a=1.25$ and $b=2.5$,
$$
E[Y]=1.25(80)+2.5=102.5,\qquad
\operatorname{Var}[Y]=(1.25)^2(36)=56.25.
$$

**In R:**
```r
mean_x <- 80
var_x <- 36
c(mean = 1.25 * mean_x + 2.5, variance = 1.25^2 * var_x)
```

## Log-Normal Distribution

**Definition:** A positive continuous variable $X$ is log-normal when $\ln X$ is Normal. The parameters $\mu_{\log}$ and $\sigma_{\log}$ describe the logarithm, not $X$ itself. Use it for positive, right-skewed data that vary multiplicatively, such as incomes, prices, or sizes.

**Source:** *Mathematical Statistics with Applications in R*, pp. 103-104.

$$
f_X(x)=\frac{1}{x\sigma_{\log}\sqrt{2\pi}}\exp\!\left(-\frac{(\ln x-\mu_{\log})^2}{2\sigma_{\log}^2}\right),\qquad x>0
$$

$$
F_X(x)=\Phi\!\left(\frac{\ln x-\mu_{\log}}{\sigma_{\log}}\right),\qquad E[X]=e^{\mu_{\log}+\sigma_{\log}^2/2},\qquad \operatorname{Var}[X]=\left(e^{\sigma_{\log}^2}-1\right)e^{2\mu_{\log}+\sigma_{\log}^2}
$$

**Example 1:** An architect models tall-building heights as log-normal with $\mu_{\log}=5$ and $\sigma_{\log}=0.6$. What is the chance a building exceeds 200 m?

**By hand:** Take logarithms:
$$
P(X>200)=P\!\left(Z>\frac{\ln 200-5}{0.6}\right)
=P(Z>0.4972)=1-\Phi(0.4972)=0.3095.
$$
In R, `plnorm` evaluates the log-normal CDF/tail directly.

**In R:**
```r
z <- (log(200) - 5) / 0.6
pnorm(z, lower.tail = FALSE)
plnorm(200, meanlog = 5, sdlog = 0.6, lower.tail = FALSE)
```

**Example 2:** A mineralogist models crystal sizes as log-normal with $\mu_{\log}=1$ and $\sigma_{\log}=0.5$. What is the density at a size of 1 unit?

**By hand:** Apply the log-normal density formula with $\ln 1=0$:
$$
f(1)=\frac{1}{(1)(0.5)\sqrt{2\pi}}\exp\!\left(-\frac{(0-1)^2}{2(0.5)^2}\right)
=0.7979e^{-2}=0.1080.
$$
In R, `dlnorm` evaluates this density.

**In R:**
```r
mu_log <- 1
sigma_log <- 0.5
x <- 1
1 / (x * sigma_log * sqrt(2 * pi)) *
  exp(-(log(x) - mu_log)^2 / (2 * sigma_log^2))
dlnorm(x, meanlog = mu_log, sdlog = sigma_log)
```

**Example 3:** An analyst models online sale values as log-normal with $\mu_{\log}=3$ and $\sigma_{\log}=1$. What is the chance a sale exceeds 100 units of currency?

**By hand:** Standardize the logarithm:
$$
P(X>100)=P\!\left(Z>\frac{\ln 100-3}{1}\right)
=P(Z>1.6052)=1-\Phi(1.6052)=0.0542.
$$
In R, `plnorm` evaluates this tail probability directly.

**In R:**
```r
z <- (log(100) - 3) / 1
pnorm(z, lower.tail = FALSE)
plnorm(100, meanlog = 3, sdlog = 1, lower.tail = FALSE)
```

## Marginal Distribution

**Definition:** The distribution of one variable on its own, ignoring the others in a joint model. Obtain a discrete marginal by summing the joint PMF over the other variable, or a continuous marginal by integrating the joint PDF. Use it to study one variable without conditioning on another.

**Source:** *Mathematical Statistics with Applications in R*, pp. 113-116.

**Example 1:** An event planner models whether a visitor attends the morning session ($X=1$ if yes) and how many workshops they join ($Y=0,1,2$). The joint PMF is

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---:|---:|---:|
| $X=0$ | 0.10 | 0.20 | 0.10 |
| $X=1$ | 0.15 | 0.30 | 0.15 |

What is the marginal distribution of morning attendance?

**By hand:** Sum the joint PMF across the workshop counts:
$$
P_X(0)=0.10+0.20+0.10=0.40,\qquad
P_X(1)=0.15+0.30+0.15=0.60.
$$

**In R:**
```r
x <- c(0, 0, 0, 1, 1, 1)
y <- c(0, 1, 2, 0, 1, 2)
joint <- c(0.10, 0.20, 0.10, 0.15, 0.30, 0.15)
c(P_X_0 = sum(joint[x == 0]), P_X_1 = sum(joint[x == 1]))
```

**Example 2:** A service model describes normalized arrival rate $X$ and normalized capacity $Y$ with joint density
$$
f_{X,Y}(x,y)=4xy,\qquad 0<x<1,\;0<y<1.
$$
Find the marginal density of $X$ and use it to compute $P(X<0.5)$.

**By hand:** Integrate the joint density over all possible values of $Y$:
$$
f_X(x)=\int_{0}^{1}4xy\,dy
=4x\left[\frac{y^2}{2}\right]_{0}^{1}=2x,\qquad 0<x<1.
$$
Therefore
$$
P(X<0.5)=\int_{0}^{0.5}2x\,dx
=\left[x^2\right]_{0}^{0.5}=0.25.
$$

**In R:** A single integral gives the marginal density at $x=0.5$, and `cubature` evaluates the double integral for $P(X<0.5)$ directly.
```r
library(cubature)
joint <- function(x, y) 4 * x * y
marginal_x <- function(x) {
  integrate(function(y) joint(x, y), lower = 0, upper = 1)$value
}
marginal_x(0.5)
hcubature(function(v) joint(v[1], v[2]),
          lowerLimit = c(0, 0), upperLimit = c(0.5, 1))$integral
```

**Example 3:** A joint model pairs a continuous measurement $X$ with a binary indicator $Y$. If $P(X\leq2\mid Y=0)=0.6$, $P(Y=0)=0.6$, $P(X\leq2\mid Y=1)=0.3$, and $P(Y=1)=0.4$, what is the marginal probability $P(X\leq2)$?

**By hand:** Sum over the two values of $Y$:
$$
P(X\leq2)=(0.6)(0.6)+(0.3)(0.4)=0.36+0.12=0.48.
$$

**In R:**
```r
0.6 * 0.6 + 0.3 * 0.4
```

## Multinomial Distribution

**Definition:** A distribution for the counts in $m$ mutually exclusive categories across $n$ independent trials. The category probabilities sum to one and the counts sum to $n$. Use it when each unit falls into exactly one of several categories and you record all category counts together.

**Source:** *Mathematical Statistics with Applications in R*, pp. 469-470.

$$
P_{\mathbf X}(x_1,\ldots,x_m)=\frac{n!}{x_1!\cdots x_m!}\prod_{i=1}^{m}p_i^{x_i},\qquad \sum_{i=1}^{m}x_i=n
$$

$$
F_{\mathbf X}(x_1,\ldots,x_m)=\sum_{\substack{0\leq k_i\leq\lfloor x_i\rfloor\\ k_1+\cdots+k_m=n}}\frac{n!}{k_1!\cdots k_m!}\prod_{i=1}^{m}p_i^{k_i},\qquad E[X_i]=np_i,\qquad \operatorname{Var}[X_i]=np_i(1-p_i)
$$

**Example 1:** In a community ballot, 30 participants independently choose one of three park projects with probabilities $0.4$, $0.35$, and $0.25$. What is the probability of the counts $(12,10,8)$?

**By hand:** Apply the multinomial PMF:
$$
P(12,10,8)=\frac{30!}{12!\,10!\,8!}(0.4)^{12}(0.35)^{10}(0.25)^{8}=0.0267.
$$
In R, `dmultinom` evaluates this PMF; base R does not provide a `pmultinom` function.

**In R:**
```r
counts <- c(12, 10, 8)
probs <- c(0.4, 0.35, 0.25)
factorial(30) / (factorial(12) * factorial(10) * factorial(8)) *
  probs[1]^counts[1] * probs[2]^counts[2] * probs[3]^counts[3]
dmultinom(counts, prob = probs)
```

**Example 2:** A bookstore classifies 20 buyers into print, audio, or e-book with probabilities $0.5$, $0.3$, and $0.2$. What is the probability of counts $(10,6,4)$?

**By hand:**
$$
P(10,6,4)=\frac{20!}{10!\,6!\,4!}(0.5)^{10}(0.3)^{6}(0.2)^{4}=0.0442.
$$
In R, `dmultinom` gives the same PMF value.

**In R:**
```r
counts <- c(10, 6, 4)
probs <- c(0.5, 0.3, 0.2)
factorial(20) / (factorial(10) * factorial(6) * factorial(4)) *
  probs[1]^counts[1] * probs[2]^counts[2] * probs[3]^counts[3]
dmultinom(counts, prob = probs)
```

**Example 3:** A theater polls 100 patrons about three showtimes with probabilities $0.5$, $0.3$, and $0.2$. What is the probability of counts $(60,30,10)$?

**By hand:**
$$
P(60,30,10)=\frac{100!}{60!\,30!\,10!}(0.5)^{60}(0.3)^{30}(0.2)^{10}=0.0002131.
$$
In R, `dmultinom` gives the same PMF value.

**In R:**
```r
counts <- c(60, 30, 10)
probs <- c(0.5, 0.3, 0.2)
factorial(100) / (factorial(60) * factorial(30) * factorial(10)) *
  probs[1]^counts[1] * probs[2]^counts[2] * probs[3]^counts[3]
dmultinom(counts, prob = probs)
```

## Negative Binomial Distribution

**Definition:** A discrete model for the number of failures before the $r$th success in independent trials with success probability $p$. Its support is $0,1,2,\ldots$ and $E[X]=r(1-p)/p$. Use it when trials continue until a fixed number of successes is reached.

**Source:** *Mathematical Statistics with Applications in R*, p. 198.

$$
P_X(x)=\binom{x+r-1}{x}(1-p)^x p^r,\qquad x=0,1,2,\ldots
$$

$$
F_X(x)=\sum_{k=0}^{\lfloor x\rfloor}\binom{k+r-1}{k}(1-p)^k p^r,\qquad E[X]=\frac{r(1-p)}{p},\qquad \operatorname{Var}[X]=\frac{r(1-p)}{p^2}
$$

**Example 1:** A survey team contacts households until 4 agree to participate, and each contact succeeds independently with probability $0.3$. What is the probability of exactly 3 refusals before the fourth agreement?

**By hand:** For $X\sim\operatorname{NegativeBinomial}(r=4,p=0.3)$,
$$
P(X=3)=\binom{3+4-1}{3}(1-0.3)^3(0.3)^4
=\binom{6}{3}(0.7)^3(0.3)^4=0.0556.
$$
In R, `dnbinom` evaluates this negative binomial PMF.

**In R:**
```r
r <- 4
p <- 0.3
x <- 3
choose(x + r - 1, x) * (1 - p)^x * p^r
dnbinom(x, size = r, prob = p)
```

**Example 2:** A field team digs until it finds a fourth site with a target mineral, with success probability $0.2$ per site. How many failed sites does the team expect before the fourth success?

**By hand:**
$$
E[X]=\frac{r(1-p)}{p}=\frac{4(0.8)}{0.2}=16.
$$

**In R:**
```r
r <- 4
p <- 0.2
r * (1 - p) / p
```

**Example 3:** A job seeker keeps applying until receiving a third offer, with offer probability $0.15$ per application. What is the probability of at most 5 unsuccessful applications before the third offer?

**By hand:** Sum the PMF for $x=0,\ldots,5$:
$$
P(X\leq5)=\sum_{x=0}^{5}\binom{x+2}{x}(0.85)^x(0.15)^3=0.1052.
$$
In R, `pnbinom` evaluates this CDF directly.

**In R:**
```r
r <- 3
p <- 0.15
x <- 0:5
sum(choose(x + r - 1, x) * (1 - p)^x * p^r)
pnbinom(5, size = r, prob = p)
```

## Nonlinear Transformation

**Definition:** A transformation $Y=g(X)$ that is not of the form $aX+b$. For discrete $X$, compute $E[g(X)]=\sum_x g(x)P_X(x)$; for continuous $X$, compute $E[g(X)]=\int g(x)f_X(x)\,dx$. Use it when a measured quantity is converted through a nonlinear rule such as a power, reciprocal, or exponential.

**Source:** *Mathematical Statistics with Applications in R*, pp. 124-129.

**Example 1:** A signal processor transforms intensity $X\in\{0,1,2\}$ with probabilities $0.2$, $0.5$, and $0.3$ into $Y=X^3$. What are the mean and variance of $Y$?

**By hand:** The transformed values are $0$, $1$, and $8$. Thus
$$
E[Y]=0(0.2)+1(0.5)+8(0.3)=2.9,
$$
and
$$
E[Y^2]=0^2(0.2)+1^2(0.5)+8^2(0.3)=19.7,
$$
so $\operatorname{Var}[Y]=19.7-(2.9)^2=11.29$.

**In R:**
```r
x <- c(0, 1, 2)
p <- c(0.2, 0.5, 0.3)
y <- x^3
mean_y <- sum(y * p)
variance_y <- sum(y^2 * p) - mean_y^2
c(mean = mean_y, variance = variance_y)
```

**Example 2:** A score is defined as $Y=1/X$ for a duration $X\in\{1,2,4\}$ with probabilities $0.2$, $0.5$, and $0.3$. What are the mean and variance of $Y$?

**By hand:** The transformed values are $1$, $1/2$, and $1/4$. Hence
$$
E[Y]=1(0.2)+0.5(0.5)+0.25(0.3)=0.525,
$$
and
$$
E[Y^2]=1^2(0.2)+0.5^2(0.5)+0.25^2(0.3)=0.34375,
$$
so $\operatorname{Var}[Y]=0.34375-(0.525)^2=0.068125$.

**In R:**
```r
x <- c(1, 2, 4)
p <- c(0.2, 0.5, 0.3)
y <- 1 / x
mean_y <- sum(y * p)
variance_y <- sum(y^2 * p) - mean_y^2
c(mean = mean_y, variance = variance_y)
```

**Example 3:** A service model uses waiting time $X\sim\mathrm{Exponential}(\lambda=2)$ and a penalty $Y=X^2$. What are the mean and variance of $Y$?

**By hand:** The density is $f_X(x)=2e^{-2x}$ for $x>0$. Using
$$
\int_{0}^{\infty}x^n e^{-ax}\,dx=\frac{n!}{a^{n+1}},
$$
we get
$$
E[Y]=\int_{0}^{\infty}x^2(2e^{-2x})\,dx
=2\cdot\frac{2!}{2^3}=\frac{1}{2},
$$
and
$$
E[Y^2]=\int_{0}^{\infty}x^4(2e^{-2x})\,dx
=2\cdot\frac{4!}{2^5}=\frac{3}{2}.
$$
Therefore
$$
\operatorname{Var}[Y]=\frac{3}{2}-\left(\frac{1}{2}\right)^2
=\frac{5}{4}=1.25.
$$

**In R:**
```r
density <- function(x) dexp(x, rate = 2)
mean_y <- integrate(function(x) x^2 * density(x), lower = 0, upper = Inf)$value
second_y <- integrate(function(x) x^4 * density(x), lower = 0, upper = Inf)$value
c(mean = mean_y, variance = second_y - mean_y^2)
```

## Normal Distribution

**Definition:** A continuous model for measurement data that are symmetric and bell-shaped around a mean $\mu$, with standard deviation $\sigma$. Its support is all real numbers. Use it for roughly symmetric measurement errors or sums of many small effects.

**Source:** *Introductory Statistics*, pp. 335-348; *Mathematical Statistics with Applications in R*, pp. 98-104.

$$
f_X(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right),\qquad -\infty<x<\infty
$$

$$
F_X(x)=\Phi\!\left(\frac{x-\mu}{\sigma}\right),\qquad E[X]=\mu,\qquad \operatorname{Var}[X]=\sigma^2
$$

**Example 1:** Repeated tuning-fork measurements are Normal with mean 500 Hz and standard deviation 8 Hz. What is the chance a measurement is below 512 Hz?

**By hand:** Standardize: $z=(512-500)/8=1.5$. Then
$$
P(X<512)=\Phi(1.5)=0.9332.
$$

**In R:**
```r
z <- (512 - 500) / 8
pnorm(z)
```

**Example 2:** Resting pulse rates in a homogeneous group are Normal with mean 70 bpm and standard deviation 10 bpm. What is the chance a rate falls between 60 and 80 bpm?

**By hand:** The endpoints give $z_1=(60-70)/10=-1$ and $z_2=(80-70)/10=1$. Thus
$$
P(60<X<80)=\Phi(1)-\Phi(-1)=0.6827.
$$

**In R:**
```r
z1 <- (60 - 70) / 10
z2 <- (80 - 70) / 10
pnorm(z2) - pnorm(z1)
```

**Example 3:** A test score is Normal with mean 70 and standard deviation 10. What is the density at 85?

**By hand:** Standardize: $z=(85-70)/10=1.5$. Then
$$
f(85)=\frac{1}{10\sqrt{2\pi}}e^{-(1.5)^2/2}=0.01295.
$$
In R, `dnorm` evaluates this density.

**In R:**
```r
z <- (85 - 70) / 10
dnorm(85, mean = 70, sd = 10)
```

## Poisson Distribution

**Definition:** A discrete model for the number of events in a fixed interval when events occur independently at a steady average rate $\lambda$. Its support is $0,1,2,\ldots$ and its mean equals its variance. Use it for counts of rare or independent events in time, space, or volume.

**Source:** *Introductory Statistics*, pp. 250-253; *Mathematical Statistics with Applications in R*, pp. 94-96.

$$
P_X(x)=\frac{e^{-\lambda}\lambda^x}{x!},\qquad x=0,1,2,\ldots
$$

$$
F_X(x)=\sum_{k=0}^{\lfloor x\rfloor}\frac{e^{-\lambda}\lambda^k}{k!},\qquad E[X]=\lambda,\qquad \operatorname{Var}[X]=\lambda
$$

**Example 1:** An observatory counts meteors during 30-minute watches, averaging 1.7 per watch. What is the probability of exactly 2 meteors in a watch?

**By hand:** For $X\sim\operatorname{Poisson}(1.7)$,
$$
P(X=2)=\frac{e^{-1.7}(1.7)^2}{2!}=0.2640.
$$
In R, `dpois` evaluates this PMF value.

**In R:**
```r
lambda <- 1.7
x <- 2
exp(-lambda) * lambda^x / factorial(x)
dpois(x, lambda = lambda)
```

**Example 2:** A printer produces small blemishes at an average of 0.5 per page. What is the probability a page has no blemishes?

**By hand:** $P(X=0)=e^{-0.5}(0.5)^0/0!=e^{-0.5}=0.6065$. In R, `dpois` gives this PMF value.

**In R:**
```r
lambda <- 0.5
exp(-lambda)
dpois(0, lambda = lambda)
```

**Example 3:** A mailroom averages 2 damaged envelopes per batch. What is the probability a batch has at least one damaged envelope?

**By hand:** Use the complement:
$$
P(X\geq1)=1-P(X=0)=1-e^{-2}=0.8647.
$$
In R, `ppois` with `lower.tail = FALSE` gives this upper-tail probability.

**In R:**
```r
lambda <- 2
1 - exp(-lambda)
ppois(0, lambda = lambda, lower.tail = FALSE)
```

## Probability Density Function (PDF)

**Definition:** A nonnegative function $f_X(x)$ that gives the density of a continuous random variable. Probability is area under the density: $P(a<X<b)=\int_a^b f_X(x)\,dx$, and the total area is one. Use it to compute interval probabilities for continuous measurements.

**Source:** *Introductory Statistics*, pp. 291-292; *Mathematical Statistics with Applications in R*, pp. 65-66.

$$
f_X(x)\ge0,\qquad \int_{-\infty}^{\infty}f_X(x)\,dx=1
$$

$$
P(a<X<b)=\int_a^b f_X(x)\,dx,\qquad F_X(x)=\int_{-\infty}^x f_X(t)\,dt
$$

**Example 1:** A material's impurity fraction is modeled as Beta$(2,1)$ with density $f(x)=2x$ on $0<x<1$. What is the probability the fraction is between 0.2 and 0.6?

**By hand:** Integrate the density over the interval:
$$
P(0.2<X<0.6)=\int_{0.2}^{0.6}2x\,dx
=\left[x^2\right]_{0.2}^{0.6}=0.36-0.04=0.32.
$$

**In R:**
```r
integrate(function(x) 2 * x, lower = 0.2, upper = 0.6)$value
pbeta(0.6, shape1 = 2, shape2 = 1) - pbeta(0.2, shape1 = 2, shape2 = 1)
```

**Example 2:** A call center models the time between calls as Exponential with rate 3 per minute. What are the density at 1 minute and the probability the wait exceeds 1 minute?

**By hand:** For $f(x)=3e^{-3x}$,
$$
f(1)=3e^{-3}=0.1494,
\qquad
P(X>1)=\int_{1}^{\infty}3e^{-3x}\,dx=e^{-3}=0.0498.
$$

**In R:**
```r
dexp(1, rate = 3)
pexp(1, rate = 3, lower.tail = FALSE)
```

**Example 3:** A measurement is Normal with mean 10 and standard deviation 2. What are the density at 12 and the probability the measurement falls between 9 and 11?

**By hand:** Standardize: $z=(12-10)/2=1$. The density is
$$
f(12)=\frac{1}{2\sqrt{2\pi}}e^{-1^2/2}=0.1210.
$$
For the interval, $z_1=(9-10)/2=-0.5$ and $z_2=(11-10)/2=0.5$, so
$$
P(9<X<11)=\Phi(0.5)-\Phi(-0.5)=0.3829.
$$

**In R:**
```r
dnorm(12, mean = 10, sd = 2)
pnorm(11, mean = 10, sd = 2) - pnorm(9, mean = 10, sd = 2)
```

## Probability Mass Function (PMF)

**Definition:** A function $P_X(x)=P(X=x)$ that assigns probability to each possible value of a discrete random variable. Values are nonnegative and sum to one over the support. Use it to answer exact-value questions for counts or categories.

**Source:** *Mathematical Statistics with Applications in R*, p. 64.

$$
P_X(x)=P(X=x)
$$

$$
F_X(x)=\sum_{k\leq x}P_X(k),\qquad E[X]=\sum_x xP_X(x),\qquad \operatorname{Var}[X]=\sum_x (x-E[X])^2P_X(x)
$$

**Example 1:** Misrouted postcards arrive at a mean rate of 1.4 per day. What is the probability of exactly 2 on a day?

**By hand:** For $X\sim\operatorname{Poisson}(1.4)$,
$$
P(X=2)=\frac{e^{-1.4}(1.4)^2}{2!}=0.2417.
$$
In R, `dpois` evaluates this PMF value.

**In R:**
```r
lambda <- 1.4
x <- 2
exp(-lambda) * lambda^x / factorial(x)
dpois(x, lambda = lambda)
```

**Example 2:** A parcel arrives intact with probability $0.93$. What is the probability it arrives intact?

**By hand:** With $X\sim\operatorname{Bernoulli}(0.93)$,
$$
P(X=1)=p^1(1-p)^0=0.93.
$$
In R, `dbinom` with `size = 1` evaluates this Bernoulli PMF.

**In R:**
```r
p <- 0.93
p^1 * (1 - p)^0
dbinom(1, size = 1, prob = p)
```

**Example 3:** A count has a Poisson$(2.1)$ PMF. What is the probability it falls between 1 and 3?

**By hand:** Add the three PMF values:
$$
P(1\leq X\leq3)=\sum_{x=1}^{3}\frac{e^{-2.1}(2.1)^x}{x!}=0.7162.
$$
In R, `dpois` gives the PMF values and `ppois` differences give the same interval probability.

**In R:**
```r
lambda <- 2.1
x <- 1:3
sum(exp(-lambda) * lambda^x / factorial(x))
sum(dpois(x, lambda = lambda))
ppois(3, lambda = lambda) - ppois(0, lambda = lambda)
```

## Random Variable

**Definition:** A function that assigns a real number to every outcome of a random process. Uppercase $X$ names the variable and lowercase $x$ names a value it can take. Use it to translate outcomes such as “apartment” or “apple” into numbers that can be modeled.

**Source:** *Introductory Statistics*, pp. 227-229; *Mathematical Statistics with Applications in R*, p. 63.

**Example 1:** A housing inspector records the number of potted plants in a randomly chosen apartment, with counts $1$, $2$, and $4$ occurring with probabilities $0.4$, $0.4$, and $0.2$. What is the expected plant count?

**By hand:** Weight each value by its probability:
$$
E[X]=1(0.4)+2(0.4)+4(0.2)=0.4+0.8+0.8=2.
$$

**In R:**
```r
plants <- c(1, 2, 4)
probability <- c(0.4, 0.4, 0.2)
sum(plants * probability)
```

**Example 2:** An orchard models apple mass as Normal with mean 140 g and standard deviation 15 g. What is the probability an apple exceeds 150 g?

**By hand:** Standardize: $z=(150-140)/15=0.6667$. Then
$$
P(X>150)=1-\Phi(0.6667)=0.2525.
$$

**In R:**
```r
z <- (150 - 140) / 15
pnorm(z, lower.tail = FALSE)
```

**Example 3:** A realtor records the number of windows in randomly chosen houses, with counts $4$, $6$, and $8$ occurring with probabilities $0.3$, $0.5$, and $0.2$. What is the expected window count?

**By hand:**
$$
E[X]=4(0.3)+6(0.5)+8(0.2)=1.2+3+1.6=5.8.
$$

**In R:**
```r
windows <- c(4, 6, 8)
probability <- c(0.3, 0.5, 0.2)
sum(windows * probability)
```

## Sample Space

**Definition:** The set $S$ of all possible outcomes of a random process. A random variable assigns a real number to each outcome in $S$. Use it to list outcomes before defining events or random variables.

**Source:** *Introductory Statistics*, pp. 227-229; *Mathematical Statistics with Applications in R*, p. 63.

$$
S=\{\text{all possible outcomes}\},\qquad X:S\to\mathbb{R}
$$

**Example 1:** A quality check records two independent light bulbs as working ($W$) or failed ($F$). What is the sample space, and what is the probability exactly one works?

**By hand:** The sample space lists every ordered pair:
$$
S=\{WW,WF,FW,FF\}.
$$
Exactly one works in $WF$ and $FW$, so the probability is $2/4=0.5$.

**In R:**
```r
outcomes <- c("WW", "WF", "FW", "FF")
sum(outcomes %in% c("WF", "FW")) / length(outcomes)
```

**Example 2:** Two fair dice are rolled. What is the probability the sum is 7?

**By hand:** There are $6\cdot6=36$ ordered outcomes in $S$. The sum 7 occurs for $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$, so
$$
P(\text{sum}=7)=\frac{6}{36}=\frac{1}{6}.
$$

**In R:**
```r
rolls <- expand.grid(first = 1:6, second = 1:6)
sum(rolls$first + rolls$second == 7) / nrow(rolls)
```

**Example 3:** One card is drawn from a standard 52-card deck. What is the probability it is a heart?

**By hand:** The sample space has one outcome for each card, so $|S|=52$. There are 13 hearts, hence
$$
P(\text{heart})=\frac{13}{52}=0.25.
$$

**In R:**
```r
suits <- rep(c("hearts", "diamonds", "clubs", "spades"), each = 13)
sum(suits == "hearts") / length(suits)
```

## Standard Deviation

**Definition:** The square root of the variance, $\sqrt{\operatorname{Var}[X]}$. It measures spread in the same units as the variable, while variance is measured in squared units. Use it to report variability on the original scale.

**Source:** *Introductory Statistics*, pp. 230-234; *Mathematical Statistics with Applications in R*, p. 73.

**Example 1:** An audio recording's duration has variance $16$ seconds$^2$. What is its standard deviation?

**By hand:** The standard deviation is the square root of the variance:
$$
\sigma=\sqrt{16}=4.
$$

**In R:**
```r
sqrt(16)
```

**Example 2:** A Normal variable has standard deviation $\sigma=3$. What is its variance?

**By hand:** Square the standard deviation:
$$
\sigma^2=3^2=9.
$$

**In R:**
```r
3^2
```

**Example 3:** A measurement with standard deviation $2.5$ is multiplied by 100 to change units. What are the new standard deviation and variance?

**By hand:** Multiplying by $a=100$ changes the standard deviation to $|a|\sigma=100(2.5)=250$ and the variance to $a^2\sigma^2=100^2(2.5)^2=62{,}500$.

**In R:**
```r
c(sd = 2.5 * 100, variance = 2.5^2 * 100^2)
```

## Standardization

**Definition:** The conversion of a value to a z-score by subtracting its mean and dividing by its standard deviation, $z=(x-\mu)/\sigma$. For a Normal variable, the standardized variable has the standard Normal distribution. Use it to compare values from different Normal models or to use standard Normal probabilities.

**Source:** *Introductory Statistics*, pp. 335-348; *Mathematical Statistics with Applications in R*, pp. 98-104.

$$
z=\frac{x-\mu}{\sigma},\qquad
Z=\frac{X-\mu}{\sigma}\sim\operatorname{Normal}(0,1)
$$

**Example 1:** Exam scores are Normal with mean 72 and standard deviation 8. Standardize a score of 84 and find $P(X<84)$.

**By hand:**
$$
z=\frac{84-72}{8}=1.5,
\qquad P(X<84)=\Phi(1.5)=0.9332.
$$

**In R:**
```r
z <- (84 - 72) / 8
z
pnorm(z)
```

**Example 2:** Battery life is Normal with mean 500 hours and standard deviation 40 hours. Standardize 560 hours and find $P(X>560)$.

**By hand:**
$$
z=\frac{560-500}{40}=1.5,
\qquad P(X>560)=1-\Phi(1.5)=0.0668.
$$

**In R:**
```r
z <- (560 - 500) / 40
z
pnorm(z, lower.tail = FALSE)
```

**Example 3:** Two Normal models are $X\sim\operatorname{Normal}(70,10)$ and $Y\sim\operatorname{Normal}(50,5)$. Compare $x=85$ and $y=57.5$ on the standardized scale.

**By hand:**
$$
z_X=\frac{85-70}{10}=1.5,
\qquad
z_Y=\frac{57.5-50}{5}=1.5.
$$
Both values sit 1.5 standard deviations above their means.

**In R:**
```r
c(x = (85 - 70) / 10, y = (57.5 - 50) / 5)
```

## Support

**Definition:** The set of values a random variable can take with positive probability or density. A transformation can change the support, so it must be tracked carefully. Use the support to check whether a model is even possible for the data at hand.

**Source:** *Introductory Statistics*, pp. 227-229; *Mathematical Statistics with Applications in R*, p. 64.

**Example 1:** A hive inspection records whether the queen is present, coded as 1 or 0. What is the support of this random variable?

**By hand:** A Bernoulli outcome can only be failure or success, so the support is $\{0,1\}$. Both values have positive probability when $0<p<1$.

**In R:**
```r
support <- c(0, 1)
support
dbinom(support, size = 1, prob = 0.78)
```

**Example 2:** A quality count records successes in 8 trials. What values can the count take?

**By hand:** A Binomial$(8,p)$ count can be any whole number from 0 through 8 successes, so the support is $\{0,1,\ldots,8\}$.

**In R:**
```r
0:8
```

**Example 3:** A Normal model has support on all real numbers, while an Exponential model is restricted to nonnegative values. What is the probability an Exponential$(2)$ variable is negative?

**By hand:** The Exponential support is $[0,\infty)$, so negative values are impossible:
$$
P(X<0)=0.
$$

**In R:**
```r
pexp(0, rate = 2)
```

## Variance

**Definition:** The probability-weighted mean squared distance from the expectation, $\operatorname{Var}[X]=E[(X-E[X])^2]=E[X^2]-(E[X])^2$. It measures spread in squared units. Use it to compare variability and to derive the variance of transformed variables.

**Source:** *Introductory Statistics*, pp. 230-234; *Mathematical Statistics with Applications in R*, p. 73.

**Example 1:** A game awards $0$, $2$, or $5$ bonus credits with probabilities $0.25$, $0.5$, and $0.25$. What is the variance of the award?

**By hand:** First,
$$
E[X]=0(0.25)+2(0.5)+5(0.25)=2.25.
$$
Then
$$
E[X^2]=0^2(0.25)+2^2(0.5)+5^2(0.25)=8.25,
$$
so
$$
\operatorname{Var}[X]=8.25-(2.25)^2=3.1875.
$$

**In R:**
```r
x <- c(0, 2, 5)
p <- c(0.25, 0.5, 0.25)
mean_x <- sum(x * p)
sum((x - mean_x)^2 * p)
```

**Example 2:** A random variable always equals $7$. What is its variance?

**By hand:** There is no spread, so
$$
\operatorname{Var}[X]=E[(7-7)^2]=0.
$$

**In R:**
```r
x <- 7
p <- 1
mean_x <- sum(x * p)
sum((x - mean_x)^2 * p)
```

**Example 3:** A random variable with variance $9$ is multiplied by $3$. What is the new variance?

**By hand:** For $Y=3X$, the variance scales by $3^2$:
$$
\operatorname{Var}[Y]=3^2\operatorname{Var}[X]=9(9)=81.
$$

**In R:**
```r
3^2 * 9
```
