import Scanner from "./scanner.js";
import { LoxError } from "./error.js";
import Parser from "./parser.js";
import Interpreter from "./interpreter.js";

function main () {
  const args = Deno.args;
  if (args.length === 0) {
    runPrompt();
  } else if (args.length === 1) {
    runFile(args[0]);
  } else {
    console.error('Usage: jlox [script]');
    Deno.exit(64);
  }
}

/**
 * 逐行运行模式
 */
function runPrompt () {
  while (true) {
    const code = prompt('>>>') ?? '';
    run(code);
  }
}

/**
 * 执行文件模式
 * @param {String} path 
 */
function runFile (path) {
  try {
    const source = Deno.readTextFileSync(path);
    run(source);
  } catch (err) {
    console.error(err.message);
  }
  if (LoxError.hadError) Deno.exit(65);
}

/**
 * 
 * @param {String} source 
 */
function run (source) {
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();
  console.log('--tokens:');
  tokens.forEach(token => console.log(token));

  const parser = new Parser(tokens);
  const statements = parser.parse();
  console.log('--ast tree:');
  console.log(statements);

  if (LoxError.hadError) Deno.exit(65);
  if (LoxError.hadRuntimeError) Deno.exit(70);

  console.log('--evaluate:');
  const interpreter = new Interpreter();
  interpreter.interpret(statements);
}

main();