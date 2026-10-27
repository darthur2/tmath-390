# How Do We Model Counts and Successes?

Probability models give us a compact way to describe uncertainty and answer questions about it. For each distribution below, we begin with a scenario and ask about a probability, an average, and a variance. We then summarize the distribution with its PMF or PDF, CDF, expectation, and variance, and use those quantities to answer the questions.

R's distribution functions use a consistent naming pattern: `d` gives a PMF or PDF, and `p` gives a CDF. Setting `lower.tail = FALSE` requests an upper-tail probability. The examples use these functions for probabilities, and show how to calculate expectations and variances in R alongside each distribution.

## Bernoulli

A quality technician checks one filter cartridge for a leak. Let $X=1$ if a leak is detected and $X=0$ otherwise, with detection probability $p=0.08$. The questions are:

- **(a)** What is the probability that a leak is detected?
- **(b)** What is the average value of $X$ over many cartridges?
- **(c)** What is the variance of $X$?

A **Bernoulli**$(p)$ variable represents one trial with two outcomes. Its PMF, CDF, expectation, and variance are

$$
P_X(x)=p^x(1-p)^{1-x},\qquad x\in\{0,1\},
$$

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
1-p, & 0\leq x<1,\\
1, & x\geq1,
\end{cases}
\qquad E[X]=p,\qquad \operatorname{Var}[X]=p(1-p).
$$

For part (a), $P(X=1)=p=0.08$. R evaluates this PMF value with:

```r
dbinom(1, size = 1, prob = 0.08)
```

For part (b), the average value is $E[X]=p=0.08$. For part (c),

$$
\operatorname{Var}[X]=p(1-p)=0.08(0.92)=0.0736.
$$

In R, the expectation and variance follow directly from the Bernoulli formulas:

```r
p <- 0.08
c(mean = p, variance = p * (1 - p))
```

## Binomial

A production line packs batches of $n=10$ chips. Each chip is independently defective with probability $p=0.2$. Let $X$ be the number of defective chips in a batch. We ask:

- **(a)** What is the probability that at least three chips are defective?
- **(b)** What is the average number of defective chips per batch?
- **(c)** What is the variance in the number of defective chips per batch?

A **Binomial**$(n,p)$ variable counts successes in a fixed number of independent trials, each with the same success probability. Its PMF, CDF, expectation, and variance are

$$
P_X(x)=\binom{n}{x}p^x(1-p)^{n-x},\qquad x=0,1,\ldots,n,
$$

$$
F_X(x)=\sum_{k=0}^{\lfloor x\rfloor}\binom{n}{k}p^k(1-p)^{n-k},
\qquad E[X]=np,\qquad \operatorname{Var}[X]=np(1-p),
$$

where the CDF sum is understood to include only values from $0$ to $n$.

For part (a), subtract the probability of at most two defective chips from $1$:

$$
P(X\geq3)=1-\sum_{x=0}^{2}\binom{10}{x}(0.2)^x(0.8)^{10-x}\approx0.3222.
$$

R computes this upper tail directly:

```r
pbinom(2, size = 10, prob = 0.2, lower.tail = FALSE)

# Probability of exactly 2 defective chips
dbinom(2, size = 10, prob = 0.2)

# Probability of exactly 2, 3, or 4 defective chips
pbinom(4, size = 10, prob = 0.2) - pbinom(1, size = 10, prob = 0.2)
```

For part (b), $E[X]=np=10(0.2)=2$ defective chips per batch. For part (c),

$$
\operatorname{Var}[X]=np(1-p)=10(0.2)(0.8)=1.6\text{ chips}^2.
$$

In R:

```r
n <- 10
p <- 0.2
c(mean = n * p, variance = n * p * (1 - p))
```

## Multinomial

A materials lab inspects $n=20$ turbine blades. Each blade is classified as pass, rework, or reject, with probabilities $0.7$, $0.2$, and $0.1$. Let $(X_1,X_2,X_3)$ be the three category counts. We ask:

- **(a)** What is the probability of exactly 14 passes, 4 blades needing rework, and 2 rejects?
- **(b)** What is the average number of blades needing rework?
- **(c)** What is the variance in the number of blades needing rework?

A **Multinomial**$(n;p_1,\ldots,p_m)$ variable records counts in $m$ mutually exclusive categories across $n$ independent trials. The category counts sum to $n$. Its joint PMF is

$$
P_{\mathbf X}(x_1,\ldots,x_m)=
\frac{n!}{x_1!\cdots x_m!}\prod_{i=1}^{m}p_i^{x_i},
\qquad x_i\in\{0,1,\ldots,n\},\quad \sum_{i=1}^{m}x_i=n.
$$

The joint CDF accumulates the joint PMF over all category-count vectors no larger than the given vector:

$$
F_{\mathbf X}(x_1,\ldots,x_m)=
\sum_{\substack{0\leq k_i\leq\lfloor x_i\rfloor\\
                 k_1+\cdots+k_m=n}}
\frac{n!}{k_1!\cdots k_m!}\prod_{i=1}^{m}p_i^{k_i}.
$$

For each category count $X_i$,

$$
E[X_i]=np_i,\qquad \operatorname{Var}[X_i]=np_i(1-p_i)
$$

For part (a),

$$
P(X_1=14,X_2=4,X_3=2)=
\frac{20!}{14!4!2!}(0.7)^{14}(0.2)^4(0.1)^2\approx0.0631.
$$

Use `dmultinom()` for this joint probability:

```r
dmultinom(x = c(14, 4, 2), prob = c(0.7, 0.2, 0.1))
```

For parts (b) and (c), focus on the rework count $X_2$. Its average is
$E[X_2]=np_2=20(0.2)=4$ blades per batch, and its variance is

$$
\operatorname{Var}[X_2]=np_2(1-p_2)=20(0.2)(0.8)=3.2\text{ blades}^2.
$$

In R, use the formulas for the rework count $X_2$:

```r
n <- 20
p_rework <- 0.2
c(mean = n * p_rework,
  variance = n * p_rework * (1 - p_rework))
```

## Poisson

A network relay records packet failures in fixed 15-minute intervals. Failures occur independently at an average rate of $\lambda=3$ per interval. Let $X$ count failures in one interval. We ask:

- **(a)** What is the probability of at least five failures in an interval?
- **(b)** What is the average number of failures per interval?
- **(c)** What is the variance in the number of failures per interval?

A **Poisson**$(\lambda)$ distribution models counts of events in a fixed interval when they occur independently at a steady average rate. Its PMF, CDF, expectation, and variance are

$$
P_X(x)=\frac{e^{-\lambda}\lambda^x}{x!},\qquad x=0,1,2,\ldots,
$$

$$
F_X(x)=\sum_{k=0}^{\lfloor x\rfloor}\frac{e^{-\lambda}\lambda^k}{k!},
\qquad E[X]=\lambda,\qquad \operatorname{Var}[X]=\lambda.
$$

For part (a),

$$
P(X\geq5)=1-\sum_{x=0}^{4}\frac{e^{-3}3^x}{x!}\approx0.1847.
$$

R computes the upper tail with:

```r
ppois(4, lambda = 3, lower.tail = FALSE)

# Probability of exactly 2 failures
dpois(2, lambda = 3)
```

For part (b), the average is $E[X]=\lambda=3$ failures per interval. For part (c), the variance is also $\lambda=3$ failures$^2$ per interval.

In R:

```r
lambda <- 3
c(mean = lambda, variance = lambda)
```

## Geometric

A welding process produces welds that pass inspection with probability $p=0.25$, independently from weld to weld. Let $X$ be the number of failed welds before the first pass. We ask:

- **(a)** What is the probability that more than four welds fail before the first pass?
- **(b)** What is the average number of failed welds before the first pass?
- **(c)** What is the variance in the number of failed welds before the first pass?

Here the **Geometric**$(p)$ distribution counts failures before the first success. With this convention, its PMF, CDF, expectation, and variance are

$$
P_X(x)=(1-p)^x p,\qquad x=0,1,2,\ldots,
$$

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
1-(1-p)^{\lfloor x\rfloor+1}, & x\geq0,
\end{cases}
\qquad E[X]=\frac{1-p}{p},\qquad
\operatorname{Var}[X]=\frac{1-p}{p^2}.
$$

For part (a), more than four failures means $X>4$, so

$$
P(X>4)=(1-p)^5=(0.75)^5\approx0.2373.
$$

In R, `pgeom()` uses this same failures-before-the-first-success convention:

```r
pgeom(4, prob = 0.25, lower.tail = FALSE)
```

For part (b),
$E[X]=(1-0.25)/0.25=3$ failed welds. For part (c),

$$
\operatorname{Var}[X]=\frac{1-0.25}{(0.25)^2}=12\text{ failures}^2.
$$

In R:

```r
p <- 0.25
c(mean = (1 - p) / p, variance = (1 - p) / p^2)
```

## Negative Binomial

A lab repeats an assay until it has collected three valid readings. Each assay independently yields a valid reading with probability $p=0.4$. Let $X$ be the number of failed assays before the third valid reading. We ask:

- **(a)** What is the probability that more than five assays fail before the third valid reading?
- **(b)** What is the average number of failed assays before the third valid reading?
- **(c)** What is the variance in the number of failed assays before the third valid reading?

The **Negative Binomial**$(r,p)$ distribution here counts failures before the $r$th success. Its PMF, CDF, expectation, and variance are

$$
P_X(x)=\binom{x+r-1}{x}(1-p)^x p^r,\qquad x=0,1,2,\ldots,
$$

$$
F_X(x)=\sum_{k=0}^{\lfloor x\rfloor}\binom{k+r-1}{k}(1-p)^k p^r,
\qquad E[X]=\frac{r(1-p)}{p},\qquad
\operatorname{Var}[X]=\frac{r(1-p)}{p^2}.
$$

For part (a),

$$
P(X>5)=1-\sum_{x=0}^{5}\binom{x+2}{x}(0.6)^x(0.4)^3\approx0.3154.
$$

Use `pnbinom()` for this upper-tail probability:

```r
pnbinom(5, size = 3, prob = 0.4, lower.tail = FALSE)

# Probability of exactly 2 failures before the third success
dnbinom(2, size = 3, prob = 0.4)
```

For part (b),
$E[X]=3(0.6)/0.4=4.5$ failed assays. For part (c),

$$
\operatorname{Var}[X]=\frac{3(0.6)}{(0.4)^2}=11.25\text{ failures}^2.
$$

In R:

```r
r <- 3
p <- 0.4
c(mean = r * (1 - p) / p,
  variance = r * (1 - p) / p^2)
```
