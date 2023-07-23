import Scanner from "./scanner.js";

let hadError = false;

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
    const code = prompt('> ');
    run(code);
    hadError = false;
  }
}

/**
 * 执行文件模式
 * @param {String} path 
 */
function runFile (path) {
  const source = Deno.readTextFileSync(path);
  run(source);
  if (hadError) Deno.exit(65);
}

/**
 * 
 * @param {String} source 
 */
function run (source) {
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();

  tokens.foreach(token => console.log(token));
}

/**
 * 
 * @param {Number} line 
 * @param {String} message 
 */
function error (line, message) {
  report(line, '', message);
}

/**
 * 
 * @param {Number} line 
 * @param {String} where 
 * @param {String} message 
 */
function report (line, where, message) {
  console.error(`[line ${line}] Error ${where}: ${message}`);
}

main();