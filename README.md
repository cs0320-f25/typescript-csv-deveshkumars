# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

1. The parser needs to be able to correctly parse commas inside of quotations "veni, vidi, vici"
2. It needs to be able to ask how empty rows should be dealt with (ignored or empty array)
3. Should the CSV be parsed as an array of arrays or an array of objects?
4. Should the parser ensure that data is well formed in terms of missing columns and extra columns, or is that the responsibility of the user?
5. should email values be checked? 
6. should data types be enforced? 
7. How would a single quotation be dealt with (escaped quote)? 
8. Should a label row be treated differently? How will the parser know that there is a header row?

- #### Step 2: Use an LLM to help expand your perspective.

*For all of these, I used Gemini 2.5 pro*

**(Unchanged) Prompt: I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps?**

Gemini emphasizes the importance of rubstness and usability. It first gives me a section on dealing with format quirks and edge cases, like quoted fields, escaped quotes, newlines within fields, inconsistent column counts, alternative delimiters, comments and empty lines, leading/trailing whitespace, file encoding, and more. On the next section on developer experience and usability, it mentioned how there should be streaming support, flexible input sources, data type casting, typescript generics, a clean configuration object. Gemini then gave me an example of what a basic parsing function might look like.

In terms of what this response from the LLM did well, it found a number of cases I didn't yet think of. For example, I was unaware of comments in CSVs, and I didn't think about how to deal with large CSV files that would cause performance issues. When it came to the issues with the LLM response, the main one is that it didn't have the understanding that Zod would be useful to use here for configuration. Rather, the LLM started trying to think about making its own configuration object. There's certaintly overlap with my own thinking, especially as it relates to quotations, empty rows, missing columns, data types, and more.


**(Added prompt engineering elements) Prompt: You are a software engineering expert. I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps? Give me a list of features and improvements I can implement, each item should be one line.**

In this case, I tried adding some common prompt engineering tricks like giving it a role and specifying the output. While the original prompt was far more detailed, this one is more usable for me personally because it provides a concise list that actually includes more cases like dealing with "Byte Order Mark" and other character encodings. This modified prompt also discusses using promise-based parsing methods. Overall, this prompt gave more niche edge cases in a format that is easier to skim over and understand easily. The downside is that the lack of an example and explanation will then necessitate the usage of additional follow ups.


(Streamlined) Prompt: I’m working on a CSV parser in TypeScript. What are some essential features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps?

The idea behind this simplified prompt was to not constrain the LLM with our own biases. As in, what if the fundamental structure of the project is wrong? What if using the filename is a bad idea? What if there's another option besides turning rows into strings or objects? While it's most likely that the course provided project structure is the best way to go about it, I thought it would be interesting to see what the AI thinks.

AI is quite non-deterministic in its nature, and that was seen here. While I expected that the AI would first explain how it would deal with inputs and outputs, it instead jumped straight into the edge cases. Interestingly, it was only in this prompt that I got back some important features like dealing with labels. The lack of knowledge on zod is not beneficial, as without this knowledge from Tim, it would be quite hard to do this assignment.


- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    1. Quotations - Functionality - Both me and the LLM
    2. Escaped Quote - Functionality - Both me and the LLM
    3. 
    4. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
