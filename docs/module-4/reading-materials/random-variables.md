# How Do We Model Data?

*How uncertain outcomes become numbers—and how those numbers help us answer practical questions.*

An electronics lab tests three sensor modules. Each module either passes or fails inspection. Before testing, an engineer might ask: **How many of the $3$ modules will pass?** A soil scientist faces a different question when studying a core sample: **What fraction of the pore space is filled with water?** The first answer is a count. The second is a measurement that can take any value in $[0,1]$.

Both questions begin with uncertain outcomes. To reason mathematically about them, we first need to turn each outcome into a number.

## From outcomes to numbers

The **sample space**, written $S$, is the set of all possible outcomes of a random process. A **random variable** is a function that assigns a real number to each outcome in $S$:

$$
X:S\longrightarrow S_X\subseteq\mathbb{R}.
$$

Here, $X$ is the function and $S_X$ is the set of values it can take, called its **support**. If $s$ is one outcome in $S$, then $X(s)$ is the number assigned to that outcome. The random variable is the rule; a value such as $X(s)=2$ is what the rule returns for a particular outcome.

For the sensor test, the sample space is

$$
S=\{PPP,PPF,PFP,FPP,PFF,FPF,FFP,FFF\},
$$

where $P$ means a module passes and $F$ means it fails. Define $X(s)$ to be the number of passes in outcome $s$. For example, $X(PFP)=2$, while $X(FFF)=0$. Several different outcomes map to the same number, and the support is $S_X=\{0,1,2,3\}$.

The soil-core measurement is also a random variable. An outcome $s\in S$ describes the water occupancy of the core's pores. The rule $X(s)$ returns the water-filled volume divided by the total pore volume. Its support is $[0,1]$, and unlike a count, it can take infinitely many possible values.

## How probability is assigned

For a **discrete** random variable, probability is assigned to individual possible values. The function that gives these probabilities is the **probability mass function**, or **PMF**:

We write the PMF as $P_X(x)$; this is interchangeable with $P(X=x)$, the probability that $X$ equals $x$.

$$
P_X(x)=P(X=x).
$$

Each value $P_X(x)$ is nonnegative, and the probabilities over the support add to $1$. To find the probability of an event, add the PMF values for the outcomes that belong to that event.

For a **continuous** random variable, probabilities are described by a **probability density function**, or **PDF**, written $f_X(x)$. A PDF is nonnegative and has total area $1$:

$$
\int_{-\infty}^{\infty} f_X(x)\,dx=1.
$$

Probability comes from the area under the PDF over an interval:

$$
P(a<X<b)=\int_a^b f_X(x)\,dx.
$$

The PDF value at a point is a density, not a probability. For a continuous variable, the probability of any one exact value is $0$.

Both types of variables also have a **cumulative distribution function**, or **CDF**:

$$
F_X(x)=P(X\leq x).
$$

The CDF accumulates probability up to $x$. For a discrete variable it adds the PMF values up through $x$; for a continuous variable it integrates the PDF up to $x$:

$$
F_X(x)=\sum_{t\leq x}P_X(t)
\qquad\text{or}\qquad
F_X(x)=\int_{-\infty}^{x} f_X(t)\,dt,
$$

depending on whether $X$ is discrete or continuous. In either case, a probability over an interval can be found from the CDF. In general,

$$
P(a<X\leq b)=F_X(b)-F_X(a).
$$

For continuous variables, including or excluding an endpoint does not change the probability. For discrete variables it can, because an individual value may have positive probability.

The CDF and the PMF or PDF carry the same information, and each can be recovered from the other. For a continuous variable, the CDF is continuous and its derivative is the PDF wherever the derivative exists:

$$
f_X(x)=\frac{d}{dx}F_X(x).
$$

For a discrete variable, the CDF is a step function. Its jump at each support point equals the PMF value there:

$$
P_X(x)=F_X(x)-F_X(x^-),
$$

where $F_X(x^-)$ is the limit of $F_X(t)$ as $t$ approaches $x$ from below.

## What expectation and variance measure

The **expectation** is the probability-weighted long-run average value of a random variable. It does not have to be a value the variable can actually take. For a discrete variable, multiply each value by its probability and add; for a continuous variable, multiply by the density and integrate:

$$
E[X]=\sum_x xP_X(x)
\qquad\text{or}\qquad
E[X]=\int_{-\infty}^{\infty}x f_X(x)\,dx.
$$

The **variance** describes the average squared distance from the expectation. It is computed by weighting squared deviations from the mean:

$$
\operatorname{Var}[X]=\sum_x(x-E[X])^2P_X(x)
\qquad\text{or}\qquad
\operatorname{Var}[X]=\int_{-\infty}^{\infty}(x-E[X])^2f_X(x)\,dx.
$$

An equivalent shortcut for either type of variable is

$$
\operatorname{Var}[X]=E[X^2]-(E[X])^2.
$$

## Counting passing sensor modules

Suppose each module passes independently with probability $0.8$ and fails with probability $0.2$. The PMF for the count $X$ is

$$
P_X(x)=\binom{3}{x}(0.8)^x(0.2)^{3-x},\qquad x\in\{0,1,2,3\}.
$$

Exactly two modules pass in three different outcomes: $PPF$, $PFP$, and $FPP$. Each outcome has probability $(0.8)^2(0.2)$, so

$$
P_X(2)=3(0.8)^2(0.2)=0.384.
$$

The complete PMF is:

| $x$ | $0$ | $1$ | $2$ | $3$ |
|---|---:|---:|---:|---:|
| $P_X(x)$ | $0.008$ | $0.096$ | $0.384$ | $0.512$ |

The probabilities add to $1$. The CDF accumulates these PMF values. For example, $F_X(1)=P(X\leq1)=P_X(0)+P_X(1)=0.104$; at $x=1$, the CDF has accumulated the probability of outcomes with $0$ or $1$ passing module. The chance that at least $2$ modules pass is the sum for $x=2$ and $x=3$:

$$
P(X\geq 2)=P_X(2)+P_X(3)=0.384+0.512=0.896.
$$

The expectation is the long-run average number passing:

$$
E[X]=0(0.008)+1(0.096)+2(0.384)+3(0.512)=2.4.
$$

Across many groups of $3$ modules, the average number passing will approach $2.4$. A single group cannot have $2.4$ passing modules, but the long-run average can be $2.4$.

The second moment is $E[X^2]=6.24$, so the variance is

$$
\operatorname{Var}[X]=E[X^2]-(E[X])^2=6.24-(2.4)^2=0.48.
$$

In R, use the possible counts and their probabilities to compute the expectation and variance:

```r
x <- 0:3
p <- c(0.008, 0.096, 0.384, 0.512)
expectation <- sum(x * p)
variance <- sum((x - expectation)^2 * p)
c(expectation = expectation, variance = variance)
```

## Measuring water in a soil core

Now let $X$ be the fraction of a soil core's pore volume filled with water. It is continuous and bounded between $0$ and $1$. Suppose its PDF is

$$
f_X(x)=12x(1-x)^2,\qquad x\in(0,1),
$$

and $f_X(x)=0$ outside this interval. The total area under the PDF is $1$:

$$
\int_0^1 12x(1-x)^2\,dx=1.
$$

The probability that the water-filled fraction is between $0.25$ and $0.75$ is the area under the density in that interval:

$$
P(0.25<X<0.75)=\int_{0.25}^{0.75}12x(1-x)^2\,dx=0.6875.
$$

R can evaluate this interval probability directly:

```r
integrate(function(x) 12 * x * (1 - x)^2,
          lower = 0.25, upper = 0.75)$value
```

Here the CDF is $0$ below the support and $1$ above it. Within the support, it is the accumulated area from $0$ to $x$:

$$
F_X(x)=\int_0^x12t(1-t)^2\,dt=6x^2-8x^3+3x^4,\qquad 0\leq x\leq1.
$$

Differentiating this CDF recovers the PDF, as the general relationship predicts:

$$
\frac{d}{dx}F_X(x)=\frac{d}{dx}\left(6x^2-8x^3+3x^4\right)=12x-24x^2+12x^3=12x(1-x)^2=f_X(x).
$$

The same interval probability can therefore be found by subtracting CDF values:

$$
P(0.25<X<0.75)=F_X(0.75)-F_X(0.25)=0.6875.
$$

Although $f_X(0.5)=1.5$, the probability that $X$ is exactly $0.5$ is $0$. Probability is area over an interval, not the density at a point.

The expectation of the water-filled fraction is

$$
E[X]=\int_0^1 x\,12x(1-x)^2\,dx=0.4.
$$

Also, $E[X^2]=0.2$, so

$$
\operatorname{Var}[X]=E[X^2]-(E[X])^2=0.2-(0.4)^2=0.04.
$$

In R, integrate the density directly to compute the expectation and variance:

```r
expectation <- integrate(function(x) x * 12 * x * (1 - x)^2,
                         lower = 0, upper = 1)$value
variance <- integrate(function(x) (x - expectation)^2 * 12 * x * (1 - x)^2,
                      lower = 0, upper = 1)$value
c(expectation = expectation, variance = variance)
```

## Putting the pieces together

A random variable turns uncertain outcomes in a sample space $S$ into numbers. Its support tells us which values are possible. A PMF assigns probability to each possible value of a discrete variable; a PDF describes density for a continuous variable, with area giving probability. The CDF accumulates probability up to a value. Expectations describe long-run averages, and variances describe spread around those averages.

The next reading will introduce specific distribution families. The ideas here—mapping outcomes to numbers and using PMFs, PDFs, CDFs, expectations, and variances—are the foundation for working with those models.
