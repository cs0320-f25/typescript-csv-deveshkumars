import * as fs from "fs";
import * as readline from "readline";
import z, { ZodType } from "zod";

/**
 * A CSV parser that takes a CSV file and outputs an array of strings, or objects if a Zod Schema is specified.
 * 
 * @param path The path to the file being loaded.
 * @param schema An optional Zod schema to validate each row. If not provided, the function returns a 2D array of strings.
 * @param header An optional boolean indicating whether the first row is a header row. If true, the first row is skipped.
 * @returns a "promise" to produce either a 2D array of strings if no schema or an array of objects as specified by the schema.
 */
export async function parseCSV<T>(path: string, schema?: ZodType<T>, header?: boolean): Promise<string[][] | T[]> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // Create an empty array to hold the results
  let result = []
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  let onHeader = true;
  if (!schema) {
    // This block runs if no schema is provided
    for await (const line of rl) {
      if (header && header == true && onHeader) {
        onHeader = false;
        continue;
      }
      const values = line.split(",").map((v) => v.trim());
      result.push(values)
    }
    return result
  } else {
    // This block runs if a schema is provided
    for await (const line of rl) {
      if (header && header == true && onHeader) {
        onHeader = false;
        continue;
      }
      // use the schema to parse the row
      const values = schema.safeParse(line.split(",").map((v) => v.trim()));
      if (values.data) {
        result.push(values.data)
      } else {
        // console.error("Failed to parse row:", values.error);
        // console.log("Failed to parse row:" + line);

        return Promise.reject("Failed to parse row");
      }
    }
    return result
  }
  
}