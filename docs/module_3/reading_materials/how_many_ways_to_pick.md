# How Many Ways Can You Pick a Team?

A science fair has 30 students, and the organizers need to pick 3 to present at the regional competition. Simple enough: put all 30 names in a hat and draw 3. But here is the question — how many different groups of 3 could possibly be chosen? Not just the one that actually gets picked, but every possible combination of students that could end up on that stage.

The answer is not 30 times 3, and it is not 30 plus 3 either. The trick is to think about it this way: for the first pick, there are 30 choices. For the second, there are 29 left. For the third, there are 28 left. That gives $30 \times 29 \times 28 = 24,\!360$ ways to draw three names in order. But here is the catch: the order of the three names does not matter for the committee. The group {Alice, Bob, Carlos} is the same as {Bob, Carlos, Alice} — they are all going to the same competition. When you counted $30 \times 29 \times 28$, you counted each group multiple times. How many times? Exactly $3 \times 2 \times 1 = 6$, which is the number of ways to arrange three people once you have them. So the actual number of distinct groups is

$$
\frac{30 \times 29 \times 28}{3 \times 2 \times 1} = \frac{24,\!360}{6} = 4,\!060.
$$

This kind of count — selecting a group where order does not matter — is called a **combination**. The notation is $C(n,k)$ or $\binom{n}{k}$, read as "n choose k." It counts the number of ways to pick $k$ items from $n$ without caring about the order:

$$
C(30,3) = \binom{30}{3} = \frac{30!}{3!\,27!} = 4,\!060.
$$

The exclamation mark is a **factorial**: $30!$ means $30 \times 29 \times 28 \times \cdots \times 1$. It is just a shorthand for multiplying a number by every positive integer below it.

Now change the scenario. Suppose the fair needs a president, a treasurer, and a secretary — three distinct jobs. Now order matters. Picking Alice as president and Bob as treasurer is different from picking Bob as president and Alice as treasurer. When order matters, the count is called a **permutation**, and it is simply

$$
P(30,3) = 30 \times 29 \times 28 = 24,\!360.
$$

No division by $3!$, because each ordering is a different outcome. The general formula for a permutation is

$$
P(n,k) = n \times (n-1) \times \cdots \times (n-k+1) = \frac{n!}{(n-k)!}.
$$

So the same group of 30 students, the same three positions, but whether order matters changes the count from 4,060 to 24,360 — a factor of 6. That is the difference between a combination and a permutation. One says "who is on the team," and the other says "who sits in which chair."

Why does any of this matter for probability? Because once you can count how many things *can* happen, you can compute the chance that something *does* happen. If the 3 regional spots are awarded by drawing names from a hat, and your name is one of the 30, how likely are you to be chosen? You count the total number of possible committees — $C(30,3) = 4,\!060$ — and then count how many of those committees include you. If you are on the committee, the other 2 spots come from the remaining 29 students: $C(29,2) = 406$. So the probability you are selected is

$$
\frac{406}{4,\!060} = \frac{1}{10},
$$

or 10%. Not bad. But that is only because you can count the possibilities. Without counting, you are guessing. With counting, you can calculate.

This is the bridge from counting to probability. Every probability problem starts with the same question: how many things can happen? Once you can answer that, you are already most of the way to finding the chance that your particular outcome is the one that does. Whether you are pulling names from a hat, dealing cards from a deck, or picking lottery numbers, the logic is the same — count the total, count the favorable, and divide.