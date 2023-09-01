import Token from "./token.js";
import TokenType from "./tokenType.js";

class LoxError extends Error {
  static hadError = false;
  static hadRuntimeError = false;

  /**
   * 
   * @param {Number} line 
   * @param {String} message 
   */
  static scanError (line, message) {
    LoxError.report(line, '', message);
  }

  /**
   * 
   * @param {Token} token 
   * @param {String} message 
   */
  static parseError(token, message) {
    if (token.type === TokenType.EOF) {
      LoxError.report(token.line, ' at end', message);
    } else {
      LoxError.report(token.line, ` at '${token.lexeme}'`, message);
    }
  }
  
  /**
   * 
   * @param {RuntimeError} err 
   */
  static runtimeError(err) {
    console.log(`${err.message}\n[line ${error.token.line}]`);
    this.hadRuntimeError = true;
  }

  /**
   * 
   * @param {Number} line 
   * @param {String} where 
   * @param {String} message 
   */
  static report (line, where, message) {
    if (where === '') {
      console.error(`[line ${line}] Error: ${message}`);
    } else {
      console.error(`[line ${line}] Error ${where}: ${message}`);
    }
  }
}

export default LoxError;