# What Happens When You Shift or Rescale a Variable?

A bike-share operator reviews rental logs in equal 30-minute periods. The records are nonnegative counts, averaging about two rentals per period, with rentals arriving throughout the day rather than in obvious bursts. The station earns $\$5$ per rental, and the operator wants to know how often revenue meets a $\$10$ target. **What is the probability that revenue in a 30-minute period is at least $\$10$?**

A shipping manager faces a different uncertainty. Repeated measurements of a product's mass cluster around $0.50$ kilograms, with a standard deviation of about $0.02$ kilograms, and form a roughly symmetric, bell-shaped pattern. The shipping package adds $50$ grams. **What are the average total shipping weight and its variance?** These answers help estimate postage and check package limits.

In the first problem, we need a probability for a transformed discrete count. In the second, we need the mean and variance of a transformed continuous measurement. Both problems become easier once we see how a **linear transformation** changes a distribution.

## Transforming a distribution

Suppose $Y=g(X)$ and the transformation is one-to-one on the possible values of $X$. Each possible value of $Y$ then comes from exactly one value of $X$. For a discrete random variable,

$$
P_Y(y)=P_X\!\left(g^{-1}(y)\right),
$$

for values $y$ in the transformed support. The transformation changes the values and support; the probability attached to each value follows its corresponding value of $X$.

For a continuous random variable, probabilities can be found by transforming the CDF. If $g$ is increasing,

$$
F_Y(y)=P(Y\leq y)=P\!\left(X\leq g^{-1}(y)\right)
=F_X\!\left(g^{-1}(y)\right).
$$

If $g$ is decreasing, applying the inverse reverses the inequality:

$$
F_Y(y)=P(Y\leq y)=P\!\left(X\geq g^{-1}(y)\right)
=1-F_X\!\left(g^{-1}(y)\right),
$$

when $X$ is continuous. For a distribution with point masses, use $1-F_X(g^{-1}(y)^-)$ instead, where $F_X(t^-)=P(X<t)$.

For either increasing or decreasing transformations, the continuous PDF is

$$
f_Y(y)=f_X\!\left(g^{-1}(y)\right)
\left|\frac{d}{dy}g^{-1}(y)\right|.
$$

The absolute value accounts for a decreasing transformation as well as an increasing one. For a linear transformation $Y=aX+b$, with $a\ne0$, the inverse is $g^{-1}(y)=(y-b)/a$. Thus the continuous PDF is

$$
f_Y(y)=\frac{1}{|a|}f_X\!\left(\frac{y-b}{a}\right),
$$

and the discrete PMF is

$$
P_Y(y)=P_X\!\left(\frac{y-b}{a}\right),
$$

at values in the transformed support.

## What happens to the mean and variance?

The expected value shifts and scales with the transformation, while the variance is not affected by adding a constant. For $Y=aX+b$,

$$
E[Y]=aE[X]+b,
\qquad
\operatorname{Var}[Y]=a^2\operatorname{Var}[X].
$$

The square on $a$ is important: variance is measured in squared units. We can now use the distribution transformation to answer the bike-share operator's probability question, and the moment formulas to help the shipping manager.

## Answering the bike-share question: $Y=aX$

The number of rentals is a count of events in a fixed time interval, and the records suggest a steady average rate with arrivals occurring independently. A Poisson model is appropriate for this kind of count, so let $X\sim\operatorname{Poisson}(\lambda=2)$. The station earns $\$5$ per rental, making its revenue $Y=5X$ dollars. We want the probability that revenue is at least $\$10$.

The transformation is one-to-one on the possible counts: $X=0,1,2,\ldots$ maps to $Y=0,5,10,\ldots$. Since

$$
P_X(x)=\frac{e^{-2}2^x}{x!},
$$

the PMF of revenue is

$$
P_Y(y)=
\begin{cases}
\displaystyle e^{-2}\frac{2^{y/5}}{(y/5)!}, & y=0,5,10,\ldots,\\[6pt]
0, & \text{otherwise}.
\end{cases}
$$

Revenue of at least $\$10$ means at least two rentals. Therefore,

$$
P(Y\geq10)=P(X\geq2)
=1-F_X(1)
=1-e^{-2}(1+2)
\approx0.5940.
$$

R can calculate this Poisson upper-tail probability directly:

```r
ppois(1, lambda = 2, lower.tail = FALSE)
```

The calculation uses the original count distribution after translating the event into terms of $X$. Equivalently, one could add the transformed PMF values for $y=10,15,20,\ldots$.

## Answering the shipping question: $Y=aX+b$

Because the repeated mass measurements are continuous and approximately bell-shaped, we model the product mass as $X\sim\operatorname{Normal}(\mu=0.50,\sigma=0.02)$ kilograms. The reported shipping weight in grams is

$$
Y=1000X+50.
$$

Here $a=1000$ converts kilograms to grams and $b=50$ adds the package. The average shipping weight is

$$
E[Y]=1000E[X]+50
=1000(0.50)+50
=550\text{ grams}.
$$

Adding the package weight shifts every shipment by the same amount, so it does not change the variance. Converting kilograms to grams multiplies the variance by $1000^2$:

$$
\operatorname{Var}[Y]=1000^2\operatorname{Var}[X]
=1000^2(0.02)^2
=400\text{ grams}^2.
$$

The standard deviation is $\sqrt{400}=20$ grams. It scales by $1000$, but unlike the variance, it is not squared.

R can calculate the transformed moments and density using the same formulas. Here, $Y=1000X+50$ for the shipping-weight example:

```r
a <- 1000
b <- 50
mean_x <- 0.50
sd_x <- 0.02

mean_y <- a * mean_x + b
variance_y <- a^2 * sd_x^2
mean_y
variance_y

# Density of Y at y = 550 grams
dnorm((550 - b) / a, mean = mean_x, sd = sd_x) / abs(a)

# CDF of Y at y = 550 grams
pnorm((550 - b) / a, mean = mean_x, sd = sd_x)

# PMF of revenue Y = 5X, where X ~ Poisson(2)
p_revenue <- function(y) {
  result <- numeric(length(y))
  on_support <- y >= 0 & y %% 5 == 0
  result[on_support] <- dpois(y[on_support] / 5, lambda = 2)
  result
}
p_revenue(c(0, 5, 10, 7))
```

## The pattern

For a one-to-one linear transformation, probabilities move to the corresponding transformed support values. To find a probability, translate the event back to the original variable or add the appropriate transformed PMF/PDF probabilities. For moments, use

$$
E[aX+b]=aE[X]+b,
\qquad
\operatorname{Var}[aX+b]=a^2\operatorname{Var}[X].
$$
