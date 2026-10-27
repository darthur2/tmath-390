# Joint, Marginal, and Conditional Distributions

A café is reviewing orders to decide whether to offer a coffee-and-pastry bundle. The order records show whether a pastry was purchased and whether the customer ordered zero, one, or two coffees. Orders that include a pastry seem more likely to include coffee. **Given that an order includes a pastry, how likely is it to include at least one coffee?** How does that compare with the probability for all orders?

A production manager has a related question about two processing stages. In each run, both stage durations fall between zero and a fixed maximum, and longer first-stage durations tend to occur with longer second-stage durations. **Given that the first stage takes three-quarters of the maximum time, what is the probability that the second stage takes more than half the maximum time?**

To answer questions like these, we need a **joint distribution** that describes the pair of outcomes together. From that joint distribution, we can find each variable's **marginal distribution** and the distribution of one variable conditional on the other.

## Starting with a joint model

For two discrete random variables $X$ and $Y$, the **joint PMF** gives the probability of each pair:

$$
P_{X,Y}(x,y)=P(X=x,Y=y).
$$

The **marginal PMF** for one variable is found by adding the joint probabilities over all possible values of the other variable:

$$
P_X(x)=\sum_y P_{X,Y}(x,y),
\qquad
P_Y(y)=\sum_x P_{X,Y}(x,y).
$$

For continuous variables, a joint PDF describes the pair. Marginal PDFs are found by integrating over the other variable:

$$
f_X(x)=\int f_{X,Y}(x,y)\,dy,
\qquad
f_Y(y)=\int f_{X,Y}(x,y)\,dx.
$$

The **conditional distribution** describes one variable after the other is known. For discrete variables and for continuous variables with densities, respectively,

$$
P_{Y\mid X}(y\mid x)=\frac{P_{X,Y}(x,y)}{P_X(x)},
\qquad
f_{Y\mid X}(y\mid x)=\frac{f_{X,Y}(x,y)}{f_X(x)},
$$

provided the conditioning value has positive probability or density. In each case, the conditional probabilities or density must total or integrate to $1$ over the possible values of $Y$.

The conditional distribution also gives the conditional expectation, or average value of $Y$ among cases with a specified value of $X$. For discrete and continuous $Y$, respectively,

$$
E[Y\mid X=x]=\sum_y yP_{Y\mid X}(y\mid x),
\qquad
E[Y\mid X=x]=\int y f_{Y\mid X}(y\mid x)\,dy.
$$

## Answering the café question

Let $X=1$ mean that an order includes a pastry, and $X=0$ mean that it does not. Let $Y$ be the number of coffees in the order, so $Y\in\{0,1,2\}$. The records show all six combinations occur, with pastry orders more likely to include coffee. A simple joint PMF matching this pattern is

$$
P_{X,Y}(x,y)=
\begin{cases}
0.30,&(x,y)=(0,0),\\
0.24,&(x,y)=(0,1),\\
0.06,&(x,y)=(0,2),\\
0.10,&(x,y)=(1,0),\\
0.20,&(x,y)=(1,1),\\
0.10,&(x,y)=(1,2),\\
0,&\text{otherwise}.
\end{cases}
$$

The probabilities sum to $1$, and the support is the full product $\{0,1\}\times\{0,1,2\}$. Add across coffee counts to get the marginal distribution of pastry orders:

$$
P_X(0)=0.30+0.24+0.06=0.60,
\qquad
P_X(1)=0.10+0.20+0.10=0.40.
$$

Add across pastry status to get the marginal coffee-count distribution:

$$
P_Y(0)=0.40,\qquad P_Y(1)=0.44,\qquad P_Y(2)=0.16.
$$

Now condition on a pastry order, $X=1$. Divide the joint probabilities in that row by $P_X(1)=0.40$:

$$
P_{Y\mid X}(0\mid1)=0.25,\qquad
P_{Y\mid X}(1\mid1)=0.50,\qquad
P_{Y\mid X}(2\mid1)=0.25.
$$

Thus the probability of at least one coffee given a pastry is

$$
P(Y\geq1\mid X=1)=0.50+0.25=0.75.
$$

For all orders, the marginal probability of at least one coffee is

$$
P(Y\geq1)=P_Y(1)+P_Y(2)=0.44+0.16=0.60.
$$

The model therefore predicts that $75\%$ of pastry orders include at least one coffee, compared with $60\%$ of orders overall.

The conditional expectation is the average number of coffees in pastry orders:

$$
E[Y\mid X=1]=0(0.25)+1(0.50)+2(0.25)=1.
$$

R calculates this weighted average directly:

```r
y <- c(0, 1, 2)
p_y_given_pastry <- c(0.25, 0.50, 0.25)
sum(y * p_y_given_pastry)
```

## Answering the processing-time question

The paired durations both range from $0$ to $1$ after scaling by the maximum stage time, and the observations suggest a modest positive association. To represent this pattern with a simple joint PDF on the square, use

$$
f_{X,Y}(x,y)=
\begin{cases}
\dfrac{6}{7}(1+x^2y),&0<x<1,\;0<y<1,\\
0,&\text{otherwise}.
\end{cases}
$$

The density is nonnegative and integrates to $1$ over the rectangular support. R can check the total integral with `cubature::hcubature()`:

```r
library(cubature)

joint_pdf <- function(x, y) (6 / 7) * (1 + x^2 * y)
f_xy <- function(z) joint_pdf(z[1], z[2])

hcubature(f_xy, lowerLimit = c(0, 0), upperLimit = c(1, 1))$integral
```

To find the marginal density of the first-stage duration, integrate over the full range of the second-stage duration:

$$
f_X(x)=\int_0^1\frac67(1+x^2y)\,dy
=\frac67\left(1+\frac{x^2}{2}\right),\qquad 0<x<1.
$$

The marginal density of the second-stage duration is

$$
f_Y(y)=\int_0^1\frac67(1+x^2y)\,dx
=\frac67\left(1+\frac{y}{3}\right),\qquad 0<y<1.
$$

R can calculate these marginal densities by integrating the joint PDF over the other variable:

```r
marginal_x <- function(x) {
  integrate(function(y) joint_pdf(x, y), lower = 0, upper = 1)$value
}
marginal_y <- function(y) {
  integrate(function(x) joint_pdf(x, y), lower = 0, upper = 1)$value
}

marginal_x(0.75)
marginal_y(0.5)
```

To condition on a first-stage duration of $x$, divide the joint PDF by its marginal:

$$
f_{Y\mid X}(y\mid x)
=\frac{f_{X,Y}(x,y)}{f_X(x)}
=\frac{1+x^2y}{1+x^2/2},\qquad 0<y<1.
$$

At $x=0.75$, the requested conditional probability is

$$
P(Y>0.5\mid X=0.75)
=\int_{0.5}^1\frac{1+0.75^2y}{1+0.75^2/2}\,dy
=\frac{91}{164}\approx0.5549.
$$

R evaluates the same conditional probability by integrating the conditional density:

```r
integrate(function(y) joint_pdf(0.75, y) / marginal_x(0.75),
          lower = 0.5, upper = 1)$value
```

The same conditional density gives the expected second-stage duration at $X=0.75$:

$$
E[Y\mid X=0.75]
=\int_0^1 y\frac{1+0.75^2y}{1+0.75^2/2}\,dy
=\frac{22}{41}\approx0.5366.
$$

R calculates this conditional expectation by integrating $y$ times the conditional density:

```r
integrate(function(y) y * joint_pdf(0.75, y) / marginal_x(0.75),
          lower = 0, upper = 1)$value
```

The joint model lets us answer the question by first finding the conditional distribution. The marginal distribution describes the second-stage duration across all runs; the conditional distribution describes it among runs with a specified first-stage duration.

## The pattern

Start with a joint PMF or PDF for the pair. Sum or integrate over one variable to get a marginal distribution; divide the joint model by the relevant marginal to get a conditional distribution. The support determines which values are possible, and each marginal or conditional model must itself have total probability $1$.
