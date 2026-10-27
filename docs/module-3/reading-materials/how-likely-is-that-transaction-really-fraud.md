# How Likely Is That Transaction Really Fraud?

A bank processes millions of transactions a day, and its fraud detection system flags thousands. The system is advertised as catching 90% of fraudulent transactions. But when the fraud team investigates a flagged transaction, the vast majority turn out to be legitimate. How can a system that sounds so good be wrong so often?

The answer is base rates. Fraud is rare. Suppose only 1 in 1,000 transactions (0.1%) is actually fraudulent. A detection system correctly flags 90% of fraudulent transactions. But if its false positive rate is 0.5%, then out of the 999 legitimate transactions per 1,000, about 5 will be flagged incorrectly.

$$
\begin{aligned}
P(\text{flag} \cap \text{fraud}) &= 0.90 \times 0.001 = 0.0009 \\
P(\text{flag} \cap \text{legit}) &= 0.005 \times 0.999 = 0.004995
\end{aligned}
$$

The total probability of a flag is the sum of the joint probabilities. This is the **law of total probability**: the overall probability of an event is the weighted average of its conditional probabilities across all possible scenarios. Here, $P(\text{flag}) = 0.0009 + 0.004995 = 0.005895$. Now, given that the system flagged a transaction, what is the probability it is actually fraud?

$$
P(\text{fraud} \mid \text{flag}) = \frac{0.0009}{0.005895} \approx 0.153.
$$

Only about 15%. Out of every 100 flagged transactions, roughly 85 are false alarms. The system is not broken — it is working exactly as advertised. The problem is that when the event you are looking for is extremely rare, even a tiny false positive rate can overwhelm the signal. This is **Bayes' Theorem** in action:

$$
P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}.
$$

The theorem tells you how to reverse a conditional probability. Instead of asking "what fraction of frauds get flagged?" — which is $P(\text{flag} \mid \text{fraud})$, the true positive rate — it answers the question the bank actually cares about: "given a flag, what is the probability it is fraud?" The two are not the same, and the gap between them is driven by the base rate $P(A)$.

If fraud were more common, the same detector would look much better. At a 10% fraud rate with the same true positive rate and false positive rate, $P(\text{fraud} \mid \text{flag})$ rises to about 0.95. Bayes' Theorem makes this dependence explicit: the strength of your conclusion depends on both the evidence and your starting assumption. Ignore the base rate, and even a good test can fool you.