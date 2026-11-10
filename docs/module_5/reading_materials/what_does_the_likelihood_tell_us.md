# What Does the Likelihood Tell Us?

*How observed data rank possible parameter values—and why we often work with the log-likelihood.*

A campus coffee shop records the number of mobile orders that arrive each hour. The counts vary from hour to hour, and the manager wants to estimate the average arrival rate $\lambda$. A quality engineer at a solar-panel factory inspects 20 panels and counts how many are defective; they want to estimate the defect probability $p$. In both cases, we have data and a model with an unknown parameter. The question is: which parameter values are most plausible in light of the data?

The likelihood function answers that question. It takes a model and a data set, and scores each possible parameter value by how well it explains the observed data.

## From probability to likelihood

In probability, we fix the parameter and ask about possible data. For a Bernoulli random variable with success probability $p$, the PMF is

$$
P_X(x)=p^x(1-p)^{1-x},\qquad x\in\{0,1\}.
$$

For a Poisson random variable with rate $\lambda$, the PMF is

$$
P_X(x)=e^{-\lambda}\frac{\lambda^x}{x!},\qquad x=0,1,2,\ldots.
$$

These functions tell us how likely different data values are when the parameter is known.

In statistics, we reverse the roles. The data are now fixed—we have already observed them—and the parameter is unknown. The **likelihood function** is the probability (or density) of the observed data, viewed as a function of the parameter.

For independent observations $x_1,\ldots,x_n$ from a model with PMF $P_X(x;\theta)$ or PDF $f_X(x;\theta)$, the likelihood is

$$
L(\theta)=\prod_{i=1}^n p_\theta(x_i),
$$

where $p_\theta(x_i)$ denotes the PMF value $P_X(x_i;\theta)$ for discrete data or the PDF value $f_X(x_i;\theta)$ for continuous data.

For discrete data, $L(\theta)$ is the joint probability of the observed sample. For continuous data, it is a product of densities. In either case, larger values of $L(\theta)$ mean the parameter value $\theta$ does a better job of explaining the data.

The likelihood is not a probability distribution over $\theta$. It does not integrate or sum to $1$ over the parameter space. It is a relative measure of fit: we can compare $L(\theta_1)$ and $L(\theta_2)$, but the individual values are not probabilities of the parameters.

For example, suppose the quality engineer observes 14 defective panels out of 20. With $x=14$ and $n=20$, the Bernoulli likelihood is

$$
L(p)=p^{14}(1-p)^6,\qquad 0<p<1.
$$

At $p=0.5$, $L(0.5)\approx 9.54\times 10^{-7}$. At $p=0.7$, $L(0.7)\approx 4.94\times 10^{-6}$. The likelihood is larger at $p=0.7$, so a 70% defect rate explains the observed data better than a 50% defect rate.

## Building likelihoods for the two scenarios

Let's derive the likelihood for each scenario from the PMF.

For the panel inspections, let $X_i=1$ if panel $i$ is defective and $X_i=0$ otherwise, with success probability $p$. The PMF is

$$
P_X(x_i)=p^{x_i}(1-p)^{1-x_i}.
$$

Multiplying over the $n$ independent inspections gives

$$
L(p)=\prod_{i=1}^n p^{x_i}(1-p)^{1-x_i}
=p^{\sum_{i=1}^n x_i}(1-p)^{n-\sum_{i=1}^n x_i}.
$$

The exponent on $p$ is the total number of defective panels, and the exponent on $1-p$ is the number of non-defective panels.

For the coffee shop, let $X_i$ be the number of mobile orders in hour $i$, with $X_i\sim\operatorname{Poisson}(\lambda)$. The PMF is

$$
P_X(x_i)=e^{-\lambda}\frac{\lambda^{x_i}}{x_i!}.
$$

Multiplying over the $n$ hours gives

$$
L(\lambda)=\prod_{i=1}^n e^{-\lambda}\frac{\lambda^{x_i}}{x_i!}
=e^{-n\lambda}\frac{\lambda^{\sum_{i=1}^n x_i}}{\prod_{i=1}^n x_i!}.
$$

The factor $e^{-n\lambda}$ comes from multiplying $e^{-\lambda}$ once for each observation, and the exponent on $\lambda$ is the total number of orders.

The same product rule applies to any PMF or PDF. The assessments use other distributions, but the steps are identical: write the PMF or PDF for one observation, multiply over the independent observations, and simplify.

Some factors in a likelihood do not depend on the parameter. In the Poisson likelihood, $\prod x_i!$ is a constant. Constants can be dropped when comparing parameter values, but the full expression is still the likelihood. In this course, keep the full expression unless you are explicitly told that constants may be ignored.

## Why take the log?

Likelihoods are products, and products become hard to work with. The values can be extremely small: a likelihood for 90 observations might be $10^{-100}$ or smaller. Differentiating a product of many terms is also cumbersome. The log-likelihood solves both problems.

The **log-likelihood** is

$$
\ell(\theta)=\ln L(\theta)
=\ln\left(\prod_{i=1}^n p_\theta(x_i)\right)
=\sum_{i=1}^n \ln p_\theta(x_i).
$$

Taking the log turns a product into a sum. It turns powers into multipliers and exponentials into linear terms. It also makes the numbers much more manageable. Because the natural logarithm is an increasing function, $\ell(\theta)$ and $L(\theta)$ reach their maximum at the same parameter value. Maximizing the log-likelihood is therefore equivalent to maximizing the likelihood.

For the Bernoulli example,

$$
\ell(p)=\ln\left[p^{\sum x_i}(1-p)^{n-\sum x_i}\right]
=\left(\sum_{i=1}^n x_i\right)\ln p
+\left(n-\sum_{i=1}^n x_i\right)\ln(1-p).
$$

For the Poisson example,

$$
\ell(\lambda)=\ln\left[e^{-n\lambda}\frac{\lambda^{\sum x_i}}{\prod x_i!}\right]
=-n\lambda+\left(\sum_{i=1}^n x_i\right)\ln\lambda
-\sum_{i=1}^n \ln x_i!.
$$

The last term, $-\sum \ln x_i!$, does not depend on $\lambda$, so it does not affect the location of the maximum. It is still part of the full log-likelihood.

The following R code evaluates and plots the Bernoulli likelihood and log-likelihood for the 14-out-of-20 example.

```r
p <- seq(0.01, 0.99, by = 0.01)
x <- 14
n <- 20

lik <- p^x * (1 - p)^(n - x)
loglik <- x * log(p) + (n - x) * log(1 - p)

plot(p, lik, type = "l", lwd = 2,
     xlab = "p", ylab = "Likelihood",
     main = "Bernoulli likelihood")
plot(p, loglik, type = "l", lwd = 2,
     xlab = "p", ylab = "Log-likelihood",
     main = "Bernoulli log-likelihood")
```

Both curves peak near $p=0.7$. The likelihood scale is tiny, while the log-likelihood scale is easier to read. The peak is in the same place.

## Worked example: coffee shop orders

Suppose the coffee shop records these order counts over 10 hours:

```r
orders <- c(2, 3, 5, 4, 3, 6, 2, 4, 5, 3)
```

There are $n=10$ observations and $\sum x_i=37$ total orders. The Poisson likelihood is

$$
L(\lambda)=e^{-10\lambda}\frac{\lambda^{37}}{\prod x_i!}.
$$

The log-likelihood is

$$
\ell(\lambda)=-10\lambda+37\ln\lambda-\sum_{i=1}^{10}\ln x_i!.
$$

The term $-\sum \ln x_i!$ is constant with respect to $\lambda$. Evaluating the full log-likelihood at a few values gives:

| $\lambda$ | $\ell(\lambda)$ |
|---:|---:|
| 3.0 | $-18.62$ |
| 3.7 | $-17.86$ |
| 4.0 | $-17.98$ |
| 5.0 | $-19.72$ |

The largest value among these is at $\lambda=3.7$, which is the sample mean. The log-likelihood is highest there, so $3.7$ is the most plausible order rate among the values considered. We will see in the next reading how to find this value systematically.

The following code evaluates the full log-likelihood over a grid and plots it.

```r
orders <- c(2, 3, 5, 4, 3, 6, 2, 4, 5, 3)
n <- length(orders)
lambda <- seq(0.5, 8, by = 0.01)

loglik <- -n * lambda + sum(orders) * log(lambda) -
  sum(lgamma(orders + 1))

plot(lambda, loglik, type = "l", lwd = 2,
     xlab = expression(lambda), ylab = "Log-likelihood",
     main = "Poisson log-likelihood")
abline(v = mean(orders), lty = 2)
```

The dashed line marks $\bar x=3.7$, the peak of the curve.

## Worked example: panel defects

Return to the 14 defective panels out of 20. The likelihood and log-likelihood are

$$
L(p)=p^{14}(1-p)^6,
\qquad
\ell(p)=14\ln p+6\ln(1-p).
$$

Evaluating the log-likelihood at a few values:

| $p$ | $L(p)$ | $\ell(p)$ |
|---:|---:|---:|
| 0.5 | $9.54\times 10^{-7}$ | $-13.86$ |
| 0.6 | $3.21\times 10^{-6}$ | $-12.65$ |
| 0.7 | $4.94\times 10^{-6}$ | $-12.22$ |
| 0.8 | $2.81\times 10^{-6}$ | $-12.78$ |

The log-likelihood increases from $p=0.5$ to $p=0.6$ to $p=0.7$, peaks at $p=0.7$, and then decreases at $p=0.8$. The peak occurs at the observed proportion of defective panels. This is the same peak we saw in the plots. The likelihood values are all tiny, but their relative sizes are what matter, and the log-likelihood makes those relative sizes easier to see.

## Common mistakes

When building a likelihood or log-likelihood, watch for these errors:

- Mixing up the role of the data and the parameter. The data are fixed, and the parameter varies.
- Using the sample size where a sum of observations belongs, or vice versa. A product of $n$ factors often introduces an exponent of $n$.
- Dropping a term that still depends on the parameter. Constants can be dropped for optimization, but parameter-dependent terms cannot.
- Treating the likelihood as a probability distribution over the parameter. Likelihood values are relative measures of fit, not probabilities of parameter values.
- Confusing the PMF or PDF with the likelihood. The PMF or PDF describes the data for a fixed parameter; the likelihood views the same expression as a function of the parameter for fixed data.
- Forgetting to multiply over all independent observations before simplifying.

## Putting the pieces together

The likelihood function turns a probability model around: instead of asking how likely the data are for a known parameter, it asks how plausible each parameter value is for the data we actually observed. For independent observations, the likelihood is the product of the PMF or PDF values. The log-likelihood is the sum of the logs, which is easier to work with and has the same maximum. In the next reading, we will find that maximum by hand when a formula exists, and with R when it does not.
