class LoxError extends Error {
  static hadError = false;
  static hadRuntimeError = false;

  /**
   * 
   * @param {ScanError} err 
   */
  static scanError (err) {
    this.hadError = true;
    console.error(err);
  }

  /**
   * 
   * @param {ParserError} err 
   */
  static parseError (err) {
    console.error(err);
  }

  /**
   * 
   * @param {RuntimeError} err 
   */
  static runtimeError (err) {
    this.hadRuntimeError = true;
    console.error(err);
  }
}

class ScanError extends Error {
  /**
   * 
   * @param {Number} line 
   * @param {String} message 
   */
  constructor(line, message) {
    super(message);
    this.name = 'ScanError';
    this.line = line;
  }
}

class ParserError extends Error {
  /**
   * 
   * @param {Token} token 
   * @param {String} message 
   */
  constructor(token, message) {
    super(message);
    this.token = token;
    this.name = 'ParserError';
  }
}

class RuntimeError extends Error {
  /**
   * 
   * @param {Token} token 
   * @param {String} message 
   */
  constructor(token, message) {
    super(message);
    this.token = token;
    this.name = 'RuntimeError';
  }
}

export { LoxError, ScanError, ParserError, RuntimeError };