# Module 6 Glossary

This glossary supports Module 6 (Sampling Distributions and the Central Limit Theorem). Entries are listed alphabetically. Each entry gives a definition, a cited source, and examples with by-hand work and R code. The examples use fresh contexts and values so they extend, rather than repeat, the course readings and assessments.

## Bimodal Distribution

**Definition:** A distribution with two distinct peaks or modes. A bimodal population can produce a sample mean that is approximately normal when the sample size is large, because the central limit theorem depends on the sample size rather than on the population being unimodal.

**Source:** Introductory Statistics 2e, Chapter 2; Mathematical Statistics with Applications in R, Chapter 4.

**Example 1:** Packet sizes on a network link often form a bimodal distribution: many small control packets and many larger data packets.

**By hand:** A histogram shows peaks near 80 bytes and near 1,200 bytes. The population is clearly bimodal, so a single normal model is not appropriate for individual packet sizes.

```r
hist(packet_size, breaks = 30)
```

**Example 2:** A service has two customer groups with different session lengths, producing a bimodal distribution of session times.

**By hand:** The population has modes near 2 minutes and near 20 minutes. For samples of size \(n=81\), the CLT can still make the sample mean approximately normal.

```r
means <- replicate(3000, mean(sample(session_time, 81)))
```

## Central Limit Theorem

**Definition:** The result that, for independent observations with finite mean and finite standard deviation, the sampling distribution of the sample mean becomes approximately normal as the sample size grows. It describes the shape of the sampling distribution, not the shape of the raw data.

**Source:** Mathematical Statistics with Applications in R, Chapter 4; Introductory Statistics 2e, Chapter 7.

**Example 1:** A strongly right-skewed population has mean 10 and standard deviation 10. Samples of size 81 are selected.

**By hand:** The sampling distribution of \(\bar X\) has mean 10 and standard error \(10/\sqrt{81}=1.111\). Because \(n=81\) is large, the CLT makes the sampling distribution approximately normal.

```r
means <- replicate(4000, mean(rexp(81, rate = 1/10)))
```

**Example 2:** A uniform population on \(4\) to \(20\) is sampled with \(n=100\).

**By hand:** The population mean is 12 and the population standard deviation is \(16/\sqrt{12}\). The sampling distribution has mean 12 and standard error \(16/(10\sqrt{12})\approx0.462\), and it is approximately normal by the CLT.

```r
means <- replicate(4000, mean(runif(100, 4, 20)))
```

**Example 3:** A population is approximately normal with mean 150 and standard deviation 12. Samples of size 25 are selected.

**By hand:** The sampling distribution is exactly normal with mean 150 and standard error \(12/5=2.4\). The CLT is not needed because the population is already normal.

```r
means <- replicate(4000, mean(rnorm(25, 150, 12)))
```

## Expected Value of the Sample Mean

**Definition:** The long-run average value of the sample mean over repeated random samples. For independent observations from a population with mean \(\mu\), the expected value of the sample mean is \(\mu\).

**Source:** Mathematical Statistics with Applications in R, Chapter 4.

**Example 1:** A population has mean 85 and standard deviation 24. Samples of size 64 are selected.

**By hand:** The expected value of \(\bar X\) is 85, the population mean. The sample size does not change the center.

```r
mean_many <- replicate(4000, mean(sample(population, 64))); mean(mean_many)
```

**Example 2:** An exponential population has mean 10 hours. Samples of size 81 are selected.

**By hand:** The expected value of the sample mean is 10 hours. The strong skew of the exponential population does not move the center.

```r
means <- replicate(4000, mean(rexp(81, rate = 1/10))); mean(means)
```

## Independent Observations

**Definition:** Observations are independent when the value of one observation does not change the probability distribution of any other observation. Independence is a standard assumption behind the formula \(\operatorname{SE}(\bar X)=\sigma/\sqrt n\) and behind the central limit theorem.

**Source:** Mathematical Statistics with Applications in R, Chapter 4; Introductory Statistics 2e, Chapter 7.

**Example 1:** A lab measures 64 different randomly selected sensors once each.

**By hand:** The readings come from different sensors, so treating them as independent is reasonable if the sensors are unrelated and the sampling is random.

```r
sensor_reading <- c(12.1, 11.8, 12.5, 12.2, 11.9)
```

**Example 2:** A researcher measures the same sensor 64 times in a row.

**By hand:** These are repeated measurements on one unit. They may be correlated, so the independence assumption is questionable and the usual standard error may be too small.

```r
repeated <- rep(12.1, 64)
```

## Law of Large Numbers

**Definition:** The result that the sample mean tends to get closer to the population mean as the sample size grows. It describes the behavior of the average in large samples, while the central limit theorem describes the shape of the sampling distribution around that average.

**Source:** Introductory Statistics 2e, Chapter 7.

**Example 1:** A fair coin is flipped many times and the proportion of heads is recorded.

**By hand:** As the number of flips grows, the proportion of heads tends to get closer to 0.5. This is the law of large numbers in action.

```r
prop <- cumsum(rbinom(10000, 1, 0.5)) / (1:10000)
```

**Example 2:** A team records average API latency for increasing sample sizes.

**By hand:** As the sample size grows, the sample mean latency tends to get closer to the population mean latency. The standard error shrinks like \(1/\sqrt n\).

```r
means <- sapply(c(9, 25, 64, 100), function(n) mean(sample(latency, n)))
```

## Normal Distribution

**Definition:** A continuous distribution with a symmetric bell shape, specified by its mean \(\mu\) and standard deviation \(\sigma\). If a population is normal, then the sampling distribution of the sample mean is exactly normal for every sample size.

**Source:** Mathematical Statistics with Applications in R, Chapter 4; Introductory Statistics 2e, Chapter 6.

**Example 1:** Sensor noise is modeled as normal with mean 0 and standard deviation 0.4.

**By hand:** Individual readings vary around 0 with standard deviation 0.4. For samples of size \(n=16\), the sample mean has standard error \(0.4/4=0.1\).

```r
means <- replicate(4000, mean(rnorm(16, 0, 0.4)))
```

**Example 2:** A measurement is normal with mean 150 and standard deviation 12. A sample of size 25 is selected.

**By hand:** The sample mean is exactly normal with mean 150 and standard error \(12/5=2.4\). No central limit theorem argument is needed.

```r
means <- replicate(4000, mean(rnorm(25, 150, 12)))
```

## Population Distribution

**Definition:** The distribution of a variable across the entire population. It is fixed but usually unknown. It should be distinguished from the distribution of a sample and from the sampling distribution of a statistic.

**Source:** Mathematical Statistics with Applications in R, Chapter 4.

**Example 1:** Query latencies for all possible requests form a strongly right-skewed population distribution.

**By hand:** The population distribution describes individual query times. It is not the distribution of sample means.

```r
population <- rlnorm(200000, meanlog = 5.2, sdlog = 0.8)
```

**Example 2:** A random number generator produces values uniformly distributed between 4 and 20.

**By hand:** The population distribution is uniform. The sampling distribution of the mean for large \(n\) is approximately normal.

```r
population <- runif(200000, 4, 20)
```

## Sample Mean

**Definition:** The arithmetic average of the observations in a sample, \(\bar X=(1/n)\sum_{i=1}^n X_i\). It is a statistic and a random variable before the data are observed.

**Source:** Mathematical Statistics with Applications in R, Chapter 4.

**Example 1:** A sample of four API response times is 120, 90, 150, and 100 ms.

**By hand:** The sample mean is \((120+90+150+100)/4=115\) ms.

```r
latency <- c(120, 90, 150, 100); mean(latency)
```

**Example 2:** A sample of five sensor readings is 12.1, 11.8, 12.5, 12.2, and 11.9.

**By hand:** The sample mean is \(60.5/5=12.1\).

```r
sensor <- c(12.1, 11.8, 12.5, 12.2, 11.9); mean(sensor)
```

## Sample Size

**Definition:** The number of observations in a sample, usually denoted \(n\). It affects the standard error through the factor \(1/\sqrt n\) and affects whether the central limit theorem is a reasonable justification for a normal model.

**Source:** Mathematical Statistics with Applications in R, Chapter 4.

**Example 1:** A population has standard deviation 120. Compare sample sizes 16 and 64.

**By hand:** The standard errors are \(120/4=30\) and \(120/8=15\). Quadrupling the sample size halves the standard error.

```r
sigma <- 120; sigma / sqrt(c(16, 64))
```

**Example 2:** A population has standard deviation 10. Compare sample sizes 9 and 81.

**By hand:** The standard errors are \(10/3\approx3.33\) and \(10/9\approx1.11\). The larger sample is three times as precise.

```r
sigma <- 10; sigma / sqrt(c(9, 81))
```

## Sampling Distribution

**Definition:** The probability distribution of a statistic over repeated random samples of the same size from the same population. The sampling distribution of the sample mean has center \(\mu\), standard error \(\sigma/\sqrt n\), and a shape determined by the population and sample size.

**Source:** Mathematical Statistics with Applications in R, Chapter 4; Introductory Statistics 2e, Chapter 7.

**Example 1:** A population has mean 85 and standard deviation 24. Samples of size 64 are selected.

**By hand:** The sampling distribution of \(\bar X\) has mean 85 and standard error \(24/8=3\). Its shape depends on the population shape.

```r
means <- replicate(4000, mean(sample(population, 64)))
```

**Example 2:** A strongly skewed population is sampled with \(n=100\).

**By hand:** The sampling distribution of the mean is approximately normal by the CLT, with mean \(\mu\) and standard error \(\sigma/10\).

```r
means <- replicate(4000, mean(sample(population, 100)))
```

## Sampling Variability

**Definition:** The natural variation in a statistic from one random sample to another. Sampling variability is described by the sampling distribution and measured in part by the standard error.

**Source:** Introductory Statistics 2e, Chapter 7.

**Example 1:** Two analysts each take a random sample of 25 requests and compute the average latency.

**By hand:** They will generally get different sample means because of sampling variability. The difference is expected even when both samples are random.

```r
means <- replicate(2, mean(sample(latency, 25)))
```

**Example 2:** A simulation draws 1,000 different samples of size 64 from the same population.

**By hand:** The spread of the 1,000 sample means is the sampling variability. Its standard deviation is approximately \(\sigma/\sqrt{64}\).

```r
means <- replicate(1000, mean(sample(population, 64))); sd(means)
```

## Skewed Distribution

**Definition:** A distribution that is not symmetric, with a longer tail on one side. Strong skew in the population can make the sampling distribution of the sample mean noticeably nonnormal when the sample size is small.

**Source:** Introductory Statistics 2e, Chapter 2; Mathematical Statistics with Applications in R, Chapter 4.

**Example 1:** API latency often has a long right tail because a few requests take much longer than most.

**By hand:** The population is strongly right-skewed. A sample of size 16 may not produce a normal sampling distribution for the mean.

```r
hist(latency, breaks = 20)
```

**Example 2:** Repair times can be strongly left-skewed because most repairs finish near a minimum time and a few finish much earlier.

**By hand:** With a small sample, the sampling distribution may remain visibly left-skewed. A larger sample is needed for the CLT to take over.

```r
hist(repair_time, breaks = 20)
```

## Standard Deviation

**Definition:** A measure of the spread of individual observations around their mean, equal to the square root of the variance. It describes the population or sample, not the variability of a sample mean.

**Source:** Mathematical Statistics with Applications in R, Chapter 1; Introductory Statistics 2e, Chapter 2.

**Example 1:** A population has standard deviation 24. A sample of size 64 is selected.

**By hand:** The standard deviation of individual observations is 24. The standard error of the sample mean is \(24/\sqrt{64}=3\).

```r
sd(population); sd(population) / sqrt(64)
```

**Example 2:** A sample of latencies has standard deviation 18 ms.

**By hand:** The sample standard deviation summarizes the spread of the individual observations. It is not the standard error of the sample mean.

```r
latency <- c(120, 90, 150, 100); sd(latency)
```

## Standard Error

**Definition:** The standard deviation of a statistic's sampling distribution. For the sample mean from independent observations, the standard error is \(\sigma/\sqrt n\), or \(s/\sqrt n\) when the population standard deviation is estimated by the sample standard deviation.

**Source:** Mathematical Statistics with Applications in R, Chapter 4; Introductory Statistics 2e, Chapter 7.

**Example 1:** A population has standard deviation 120. Samples of size 64 are selected.

**By hand:** The standard error of the sample mean is \(120/\sqrt{64}=15\).

```r
sigma <- 120; sigma / sqrt(64)
```

**Example 2:** A pilot sample has standard deviation 122.4. A future sample of size 64 is planned.

**By hand:** The estimated standard error is \(122.4/\sqrt{64}=15.3\). This is an estimate because the population standard deviation is unknown.

```r
s <- 122.4; s / sqrt(64)
```
