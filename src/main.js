import Scanner from "./scanner.js";
import LoxError from "./error.js";
import Parser from "./parser.js";

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
    const code = prompt('>>>');
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
  tokens.forEach(token => console.log(token));

  const parser = new Parser(tokens);
  const expr = parser.parse();

  if (LoxError.hadError) return;

  console.log(expr);
}

main();