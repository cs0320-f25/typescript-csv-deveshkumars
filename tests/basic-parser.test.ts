import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// Empty Cases

test("parseCSV can deal with empty columns", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/emptycols.csv"))
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age", "gpa"]);
  expect(results[1]).toEqual(["Alice", "23", "4.0"]);
  expect(results[2]).toEqual(["Bob", "thirty", ""]);
  expect(results[3]).toEqual(["Charlie", "", "4.9"]);
  expect(results[4]).toEqual(["", "22", "3.9"]);
});

test("parseCSV can deal with empty rows", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/emptyrows.csv"))
  
  // user should specify, but default behavior is t

  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23", "4.0"]);
  expect(results[2]).toEqual(["Bob", "thirty", "4.0"]);
  expect(results[3]).toEqual(["Fred", "22", "3.9"]);
});


test("parseCSV can deal with empty file", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/emptyfile.csv"))
  
  expect(results).toHaveLength(0);
});

test("parseCSV can deal with quotes", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/quotes.csv"))
  
  expect(results).toHaveLength(1);
  expect(results[0]).toEqual(["Julius", "Caesar", "veni, vidi, vici"]);
});

// different lengths
test("parseCSV can deal with different lengths", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/difflens.csv"))
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age", "gpa"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob"]);
  expect(results[3]).toEqual(["Charlie", "23", "4.9"]);
  expect(results[4]).toEqual(["LeBron", "22", "3.9"]);
});

test("parseCSV can detect extra columns", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/extra.csv"))
  
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["name", "company", "email", "net worth"]);
  expect(results[1]).toEqual(["elon musk", " tesla", "technoking@tesla.com", "400B"]);
  expect(results[2]).toEqual(["sam altman", " openai", "agi@openai.com", "1B"]);
  expect(results[3]).toEqual(["tony stark", " Stark Indutries", "ceo@stark.com", "1T", " I'm the best"]);
});

