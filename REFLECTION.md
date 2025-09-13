# Reflection

## 1. Correctness

*What makes a CSV parser “correct”? We're not asking for additional input-output pairs here, but fairly precise, natural-language descriptions. Put another way, what kinds of general properties should your tests be checking about your CSV parser?*

A correct CSV parser must convert the file's contents into a format that is helpful for developers' purposes. A correct CSV parser must be able to handle tough edge cases, and have extensive customization for developers to be able to tweak the output for their needs.

In Particular:
- the CSV parser should be able to deal with tough edge cases
- the CSV parser should offer a plethora of options to customize the output
- the CSV parser should return an output that the developer can easily index into and find data
- the CSV parser should be able to validate data

## 2. Random, On-Demand Generation

*Suppose we gave you a function that randomly produced CSV data on demand. You could then call this class from your testing code. How might you use this source of random data to expand the power of your testing?*


Random, on-demand generation can help ensure that biases in the test suite don't hold back its strength by utilizing the power of **non-determinism**. Currently, my testing suite is deterministic. It will either pass every single time or fail every single time. While this may seem beneficial, all it does is instill false hope in a developer since it's possible a test case exists that they haven't yet considered. Moreover, a random CSV generator is going to be able to generate cases that a human would not be able to think of. Human biases are towards simpler, logical, and easier to understand test cases. The random test cases can go well beyond that and find the outer edges of the program's functionality.

## 3. Overall experience, bugs encountered

*In what ways did this sprint differ from prior programming assignments you’ve done? Did anything surprise you? Did you encounter any bugs during your work on this sprint? If yes, what were they and how did you fix them? If not, how do you think that you managed to avoid them?*

This sprint was one of the most unique assignments I've done. First of all, allowing AI on the assignment was very new. In my internship, I use Cursor for vibe coding to help me with my work. On this assignment however, I learned to use AI very sparingly because I didn't want the AI to mess code up and cause things to fail. This was surprising for me.

One bug I ran into was in creating a Zod Schema to represent a linkedlist. I was having trouble defining the Zod Schema with unions and without creating a circular definition that wouldn't upset the linter. In general, I found that the toughest problem was simply keeping the linter happy. I solved this problem with zod schemas for the supplemental challenge by going to Tim's office hours and asking him about it. We found ultimately that it came down to creating normal typescript interfaces, since these are okay to use with circularity in the definiton, and then incorporating this interface into the schema.

I was suprised how much more work there is in documenting, writing up reflection/READMEs, testing, citing, etc. than there is in doing the actual coding work.



