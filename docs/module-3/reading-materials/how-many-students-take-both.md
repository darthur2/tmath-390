# How Many Students Take Both?

A high school has 300 students. A survey finds that 200 play soccer, 180 play basketball, and 110 play both. The athletic director reads the results and announces, "380 of our students play soccer or basketball!" But there are only 300 students in the school. Something is clearly wrong. The problem is that the 110 students who play *both* sports were counted in both the soccer number and the basketball number. Adding 200 and 180 counts those 110 students twice. The real number of students who play at least one sport is not 380 — it is $200 + 180 - 110 = 270$. The 110 students who play both got added twice, so you have to subtract them once to get the correct total.

This is the **inclusion-exclusion principle**. For any two sets $A$ and $B$, the size of their union — everything in at least one of them — is

$$
|A \cup B| = |A| + |B| - |A \cap B|.
$$

The same logic works for probabilities. If $P(A)$ is the probability a student plays soccer and $P(B)$ is the probability they play basketball, then

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B).
$$

In the survey, picking a random student gives $P(\text{soccer}) = 200/300$, $P(\text{basketball}) = 180/300$, and $P(\text{both}) = 110/300$. So

$$
P(\text{soccer or basketball}) = \frac{200}{300} + \frac{180}{300} - \frac{110}{300} = \frac{270}{300} = 0.90.
$$

Now compare this with the additivity rule from *What Are the Chances?*. That rule said $P(A \cup B) = P(A) + P(B)$ when $A$ and $B$ are **mutually exclusive** — meaning they cannot happen at the same time. But soccer and basketball *can* happen at the same time: 110 students play both. When events overlap, the additivity rule overcounts. The inclusion-exclusion principle fixes that by subtracting the overlap.

Real-life events are rarely mutually exclusive. A person can have a cat *and* a dog. A patient can have high blood pressure *and* diabetes. A phone can be made by Samsung *and* run Android. Every time you see "or" in probability, ask yourself: could both happen? If the answer is yes, you need the inclusion-exclusion principle. Just add, then subtract the overlap, and the double counting takes care of itself.