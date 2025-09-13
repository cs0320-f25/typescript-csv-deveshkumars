# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

1. The parser needs to be able to correctly parse commas inside of quotations "veni, vidi, vici"
2. It needs to be able to ask how empty rows should be dealt with (ignored or empty array)
3. Should the CSV be parsed as an array of arrays or an array of objects?
4. Should the parser ensure that data is well formed in terms of missing columns and extra columns, or is that the responsibility of the user?
5. How should misplaced newlines be dealt with?
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

    *Note: When I say both me and the LLM, that means I came up with it first and one of my LLM prompts also brought it up.*

    1. Commas in Quotations - Functionality - Both me and the LLM
    As a user of the application, I can parse a CSV that will correctly handle commas placed within quotation marks so that a quote like "veni, vidi, vici" is not split up into separate columns.
    2. Empty Columns/Inconsistent Column Counts - Extensibility - Both me and the LLM
    As a user of the application, I can indiciate how I want rows with inconsistent rows to be handled so that I can avoid errors later in my application
    Acceptance Criteria:
    - The default behavior will be to not to react at all to inconsistent rows
    - The user can indicate whether they would like padding with undefined values, an error, or for the row to be thrown out
    3. Label Row - Extensibility - Both me and the LLM
    As a user of the application, I want to be able to indicate to the application that the first row of my CSV is a row of labels so that the program can execute logic based on that information.
    Acceptance Criteria:
    - User can specify whether the CSV data includes a header row, the default is that there is a header row
    - User can specify whether or not the header row should be included
    4. Newslines within fields - Functionality - Both me and the LLM
    As a user of the program, I can include a newline character within a column without the program thinking that it's a row delimiter so that I can include richer data within each column of the CSV.

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    My initial ideas were that the parser should be able ot parse commas inside quotations, handle empty rows, deal with misplaced newlines, enforce data types, and other similar issues. The LLM suggested a pretty similar set of ideas, but didn't take into account the existence of Zod and included ideas that aren't part of the official CSV spec, like comments. I liked how the LLM was able to identify key edge cases, but I also realized how every idea needed to be validated by a human otherwise a hallucination would get through. Also, I realized that context is important.

### Design Choices
- Parser should ignore empty rows

### 1340 Supplement

I created a LinkedList schema in Zod to parse a CSV.

```typescript
// For more, see basic-parser.test.ts
// More is included at the bottom of that file
// This schema should correctly represent a Zod Schema, but there's some tweaks needed to be able to transform CSV files
type Node = {value: string, next: Node | null}

const NodeSchema: z.ZodType<Node> = z.lazy(() => 
z.object({
    value: z.string(),
    next: z.union([z.lazy(() => NodeSchema), z.null()]) // recursive definition
})
);

type LinkedList = Node | null;

const LinkedListSchema: z.ZodType<LinkedList> = z.union([z.literal(null), NodeSchema]);
```

- #### 1. Correctness

A correct CSV parser must convert the file's contents into a format that is helpful for developers' purposes. A correct CSV parser must be able to handle tough edge cases, and have extensive customization for developers to be able to tweak the output for their needs.

In Particular:
- the CSV parser should be able to deal with tough edge cases
- the CSV parser should offer a plethora of options to customize the output
- the CSV parser should return an output that the developer can easily index into and find data
- the CSV parser should be able to validate data

- #### 2. Random, On-Demand Generation

Random, on-demand generation can help ensure that biases in the test suite don't hold back its strength by utilizing the power of **non-determinism**. Currently, my testing suite is deterministic. It will either pass every single time or fail every single time. While this may seem beneficial, all it does is instill false hope in a developer since it's possible a test case exists that they haven't yet considered. Moreover, a random CSV generator is going to be able to generate cases that a human would not be able to think of. Human biases are towards simpler, logical, and easier to understand test cases. The random test cases can go well beyond that and find the outer edges of the program's functionality.


- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
For the purposes of this sprint, all functionality is in place and functioning. For the supplement, the schema is created and is capable of holding the data, but some additional work is needed for test cases can pass. Not all the tests pass yet because some functionality for dealing with quotations, newlines, empty columns, etc. is not yet implemented.
#### Tests:
✓ parseCSV yields arrays  
✓ parseCSV yields only arrays  
✓ parseCSV can use a schema with a header  
✓ parseCSV can use a schema without a header  
✓ parseCSV can deal with empty columns  
✕ parseCSV can deal with empty rows  
✓ parseCSV can deal with empty file  
✕ parseCSV can deal with quotes  
✓ parseCSV can deal with different lengths  
✕ parseCSV can handle extra columns  
✕ parseCSV can handle awkward spacing  
✕ parseCSV can detect misplaced newlines  
✕ parseCSV can deal with different delimiters  
✕ SUPPLEMENTAL CHALLENGE: parseCSV can deal with a linked list schema  
#### How To…
It's recommended to run tests
```bash
# To run code
npm run run
# To run tests
npm run test
```



#### Team members and contributions (include cs logins):
#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
- I used tab completions to help speed up the process of creating tests
- I used Google AI Overview to help with the supplement "how to represent an linked list in zod"
- I used AI as instructued in Part B
    - https://g.co/gemini/share/6252059de645
    - https://g.co/gemini/share/6a28041d93b1
    - https://g.co/gemini/share/71e457cb8c5a 
#### Total estimated time it took to complete project:
6 hours
#### Link to GitHub Repo:
https://github.com/cs0320-f25/typescript-csv-deveshkumars   
