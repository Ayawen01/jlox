class Error {
  static hadError = false;

  /**
   * 
   * @param {Number} line 
   * @param {String} message 
   */
  static error (line, message) {
    Error.report(line, '', message);
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

export default Error;