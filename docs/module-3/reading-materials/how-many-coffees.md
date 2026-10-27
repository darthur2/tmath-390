# How Many Unique Cups of Coffee Can You Make at Starbucks?

Walk into a Starbucks and order a coffee. Just a coffee — a simple, straightforward cup of coffee. But before you can get it, the barista has to ask you a few questions: hot or iced? What size? What kind of milk? Any flavor syrups? Whipped cream? Extra shot? By the time you finish answering, that "simple coffee" has turned into something you have never ordered the exact same way twice. And that is the question: how many different ways are there to order a cup of coffee at Starbucks? How many unique combinations exist in that menu — even before you get to the Frappuccinos?

To answer this, you have to start counting. But you are not counting one thing at a time. You are counting possibilities: every choice multiplies the number of possible drinks. This is the **Fundamental Theorem of Counting**. Formally, if a task consists of $k$ steps, where step $i$ can be done in $n_i$ ways regardless of the choices made in earlier steps, then the total number of ways to complete the task is

$$
n_1 \times n_2 \times \cdots \times n_k.
$$

It is the simplest, most powerful idea in probability, and once you start using it, you will see it everywhere.

Let us apply it. Suppose you are ordering a hot latte. You have to pick a size — tall, grande, or venti. That is 3 choices. You have to pick a milk type — whole, 2%, nonfat, oat, almond, or soy. That is 6 choices. Already, $3 \times 6 = 18$ possible lattes before you have done anything interesting. Now add syrups. Starbucks offers vanilla, caramel, hazelnut, white mocha, cinnamon dolce, and sugar-free vanilla. You can add any combination of syrups. With 6 syrups, each can be either included or not, so there are $2^6 = 64$ possible syrup combinations. The total so far: $3 \times 6 \times 64 = 1,\!152$ lattes.

That is just hot lattes. You could also ask for an extra shot (2 choices), whipped cream (2 choices), or a different roast (blonde, medium, or dark — 3 choices). Even a simple "hot latte with an extra shot and no whipped cream" is one of many thousands of possibilities that the menu never lists but the register happily accepts. By the time you multiply everything together, the number of drinkable combinations at Starbucks runs into the tens of thousands. No one has tried them all. No one could. The menu board is not the menu — it is only the headline.

The Fundamental Theorem of Counting turns a problem that looks impossible into one that is not even hard. Instead of listing every possible drink by hand, you break the ordering process into decisions and multiply the number of options at each step. That is the whole idea. It is also why something as simple as a 4-digit PIN has $10 \times 10 \times 10 \times 10 = 10,\!000$ possibilities. Every digit is a step, every step has 10 options, and the multiplication does the listing for you. The same principle applies whether you are making coffee, choosing a password, or designing an experiment — you count the choices at each stage and multiply.

So, how many unique cups of coffee can you make? It depends on how many choices you include. But the answer is easily in the tens of thousands, maybe hundreds of thousands. The next time you stare at the menu and feel overwhelmed, remember that you are not looking at a menu — you are looking at a multiplication problem. And sometimes the best way to understand what is possible is simply to start counting.