import Scanner from "./scanner.js";
import { LoxError } from "./error.js";
import Parser from "./parser.js";
import Interpreter from "./interpreter.js";

let astMode = false;

function main () {
  const args = Deno.args;
  if (args.length === 0) {
    runPrompt();
  } else if (args.length === 1) {
    if (args[0] === '--ast') {
      astMode = true;
      runPrompt();
    } else {
      runFile(args[0]);
    }
  } else if (args.length === 2) {
    astMode = true;
    runFile(args[1]);
  } else {
    console.error('Usage: jlox [--ast] [script]');
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

  const parser = new Parser(tokens);
  const statements = parser.parse();

  if (astMode) {
    console.log('--tokens:');
    tokens.forEach(token => console.log(token));

    console.log('--ast tree:');
    console.log(statements);
  }

  if (LoxError.hadError) Deno.exit(65);
  if (LoxError.hadRuntimeError) Deno.exit(70);
  
  const interpreter = new Interpreter();
  interpreter.interpret(statements);
}

main();