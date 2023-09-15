import Token from "./token.js";
import TokenType from "./tokenType.js";
import LoxError from "./error.js";

// 关键字
const keywords = new Map([
  ['and',     TokenType.AND],
  ['class',   TokenType.CLASS],
  ['else',    TokenType.ELSE],
  ['false',   TokenType.FALSE],
  ['for',     TokenType.FOR],
  ['fun',     TokenType.FUN],
  ['if',      TokenType.IF],
  ['nil',     TokenType.NIL],
  ['or',      TokenType.OR],
  ['print',   TokenType.PRINT],
  ['return',  TokenType.RETURN],
  ['super',   TokenType.SUPER],
  ['this',    TokenType.THIS],
  ['true',    TokenType.TRUE],
  ['var',     TokenType.VAR],
  ['while',   TokenType.WHILE],
]);

class Scanner {
  /**
   * 
   * @param {String} source 
   */
  constructor(source) {
    this.source = source;
    this.tokens = [];

    this.start = 0;
    this.current = 0;
    this.line = 1;
  }

  /**
   * @returns {Array<Token>}
   */
  scanTokens () {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, '', null, this.line));
    return this.tokens;
  }

  /**
   * @returns {Token}
   */
  scanToken () {
    const c = this.advance();
    switch (c) {
      case '(': this.addToken(TokenType.LEFT_PAREN); break;
      case ')': this.addToken(TokenType.RIGHT_PAREN); break;
      case '{': this.addToken(TokenType.LEFT_BRACE); break;
      case '}': this.addToken(TokenType.RIGHT_BRACE); break;
      case ',': this.addToken(TokenType.COMMA); break;
      case '.': this.addToken(TokenType.DOT); break;
      case '-': this.addToken(TokenType.MINUS); break;
      case '+': this.addToken(TokenType.PLUS); break;
      case ';': this.addToken(TokenType.SEMICOLON); break;
      case '*': this.addToken(TokenType.STAR); break;
      case '!': this.addToken(
        this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG
      ); break;
      case '=': this.addToken(
        this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL
      ); break;
      case '>': this.addToken(
        this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER
      ); break;
      case '<': this.addToken(
        this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS
      ); break;
      case '/':
        if (this.match('/')) {
          while (this.peek() !== '\n' && !this.isAtEnd()) this.advance();
        } else {
          this.addToken(TokenType.SLASH);
        }
        break;
      case ' ':
      case '\r':
      case '\t':
        break;
      case '\n':
        this.line++;
        break;
      case '"': this.string(); break;
      default:
        if (this.isDigit(c)) {
          this.number();
        } else if (this.isAlpha(c)) {
          this.identifier();
        } else {
          LoxError.scanError(this.line, 'Unexpected character.');
        }
    }
  }

  identifier () {
    while (this.isAlphaNumeric(this.peek())) this.advance();

    const text = this.source.slice(this.start, this.current);
    const type = keywords.get(text) ?? TokenType.IDENTIFIER;

    this.addToken(type);
  }

  number () {
    while (this.isDigit(this.peek()) && !this.isAtEnd()) this.advance();

    if (this.peek() === '.' && this.isDigit(this.peekNext())) {
      this.advance();
      while (this.isDigit(this.peek())) this.advance();
    }

    const number = Number(this.source.slice(this.start, this.current));

    this.addToken(TokenType.NUMBER, number);
  }

  string () {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === '\n') this.line++;
      this.advance();
    }

    if (this.isAtEnd()) {
      LoxError.scanError(this.line, 'Unterminated string.');
      return;
    }

    this.advance();

    const value = this.source.slice(this.start + 1, this.current - 1);
    this.addToken(TokenType.STRING, value);
  }

  /**
   * @param {String} expected 
   * @returns {Boolean}
   */
  match (expected) {
    if (this.isAtEnd()) return false;
    if (this.source[this.current] !== expected) return false;
    this.current++;
    return true;
  }

  /**
   * @returns {String}
   */
  peek () {
    if (this.isAtEnd()) return '\0';
    return this.source[this.current];
  }

  /**
   * @returns {String}
   */
  peekNext () {
    const current = this.current + 1;
    if (current >= this.source.length) return '\0';
    return this.source[current];
  }

  /**
   * @param {String} c 
   * @returns {Boolean}
   */
  isAlpha (c) {
    return (c >= 'a' && c <= 'z') ||
      (c >= 'A' && c <= 'Z') ||
      c == '_';
  }

  /**
   * @param {String} c
   * @returns {Boolean}
   */
  isAlphaNumeric (c) {
    return this.isAlpha(c) || this.isDigit(c);
  }

  /**
   * @param {String} c 
   * @returns {Boolean}
   */
  isDigit (c) {
    return c >= '0' && c <= '9';
  }

  /**
   * @returns {Boolean}
   */
  isAtEnd () {
    return this.current >= this.source.length;
  }

  /**
   * @returns {String}
   */
  advance () {
    return this.source[this.current++];
  }

  /**
   * @param {TokenType} type 
   * @param {Object} literal 
   */
  addToken (type, literal = null) {
    const text = this.source.slice(this.start, this.current);
    this.tokens.push(new Token(
      type,
      text,
      literal,
      this.line
    ));
  }
}

export default Scanner;