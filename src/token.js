class Token {
  /**
   * 
   * @param {TokenType} type 
   * @param {String} lexeme 
   * @param {Object} literal 
   * @param {Number} line 
   */
  constructor(type, lexeme, literal, line) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }
}

export default Token;