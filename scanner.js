import Token from "./token.js";
import TokenType from "./tokenType.js";
import { error, report } from "./error.js";

class Scanner {
  /**
   * 
   * @param {String} source 
   * @param {Array<Token>} tokens
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

    this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
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
      default: error(this.line, 'Unexpected character.'); break;
    }
  }

  /**
   * 匹配当前字符跟expected是否相等
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
   * 辅助函数，用来告诉我们是否已消费完所有字符。
   * @returns {Boolean}
   */
  isAtEnd () {
    return this.current >= this.source.length;
  }

  /**
   * 推进
   * @returns {String}
   */
  advance () {
    return this.source[this.current++];
  }

  /**
   * 添加token
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