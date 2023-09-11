import TokenType from "./tokenType.js";
import { expr as Expr, stmt as Stmt } from "./ast.js";
import LoxError from "./error.js";

class Parser {
  /**
   * 
   * @param {Array<Token>} tokens 
   */
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
  }

  /**
   * 
   * @returns {Expression}
   */
  parse () {
    const statements = [];
    while (!this.isAtEnd()) {
      statements.push(this.statement());
    }
    return statements;
  }

  /**
   * 
   * @returns {Expression}
   */
  expression () {
    return this.equality();
  }

  /**
   * 
   * @returns {Statement}
   */
  statement () {
    if (this.match(TokenType.PRINT)) return this.printStatement();

    return this.expressionStatement();
  }

  /**
   * 
   * @returns {Statement}
   */
  printStatement () {
    const value = this.expression();
    this.consume(TokenType.SEMICOLON, 'Expect \';\' after value.');
    return new Stmt.Print(value);
  }

  /**
   * 
   * @returns {Statement}
   */
  expressionStatement () {
    const expr = this.expression();
    this.consume(TokenType.SEMICOLON, 'Expect \';\' after expression.');
    return new Stmt.Expr(expr);
  }

  /**
   * `!= ==`
   * @returns {Expression}
   */
  equality () {
    let expr = this.comparison();

    while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
      const operator = this.previous();
      const right = this.comparison();
      expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
  }

  /**
   * `> >= < <=`
   * @returns {Expression}
   */
  comparison () {
    let expr = this.term();

    while (this.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
      const operator = this.previous();
      const right = this.term();
      expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
  }

  /**
   * `+ -`
   * @returns {Expression}
   */
  term () {
    let expr = this.factor();

    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.factor();
      expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
  }

  /**
   * `* /`
   * @returns {Expression}
   */
  factor () {
    let expr = this.unary();

    while (this.match(TokenType.STAR, TokenType.SLASH)) {
      const operator = this.previous();
      const right = this.unary();
      expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
  }

  /**
   * `!expr -expr`
   * @returns {Expression}
   */
  unary () {
    if (this.match(TokenType.BANG, TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.unary();
      return new Expr.Unary(operator, right);
    }

    return this.primary();
  }

  /**
   * 
   * @returns {Expression}
   */
  primary () {
    if (this.match(TokenType.FALSE)) return new Expr.Literal(false);
    if (this.match(TokenType.TRUE)) return new Expr.Literal(true);
    if (this.match(TokenType.NIL)) return new Expr.Literal(null);

    if (this.match(TokenType.NUMBER, TokenType.STRING)) {
      return new Expr.Literal(this.previous().literal);
    }

    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, 'Expect \')\' after expression.');
      return new Expr.Grouping(expr);
    }

    throw this.error(this.peek(), 'Expect expression.');
  }

  /**
   * 
   * @param  {...TokenType} types 
   * @returns {Boolean}
   */
  match (...types) {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  /**
   * 
   * @param {Token} type 
   * @param {String} message 
   * @returns {Token}
   */
  consume (type, message) {
    if (this.check(type)) return this.advance();

    throw this.error(this.peek(), message);
  }

  /**
   * 
   * @param {TokenType} type 
   * @returns {Boolean}
   */
  check (type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  /**
   * 
   * @returns {Token}
   */
  advance () {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  /**
   * 
   * @returns {Boolean}
   */
  isAtEnd () {
    return this.peek().type === TokenType.EOF;
  }

  /**
   * 
   * @returns {Token}
   */
  peek () {
    return this.tokens[this.current];
  }

  /**
   * 
   * @returns {Token}
   */
  previous () {
    return this.tokens[this.current - 1];
  }

  /**
   * 
   * @param {Token} token 
   * @param {String} message 
   * @returns {ParserError}
   */
  error (token, message) {
    LoxError.parseError(token, message);
    return new ParserError();
  }

  synchronize () {
    this.advance();

    while (!this.isAtEnd()) {
      if (this.previous().type === TokenType.SEMICOLON) return;

      switch (this.peek().type) {
        case TokenType.CLASS:
        case TokenType.FUN:
        case TokenType.VAR:
        case TokenType.FOR:
        case TokenType.IF:
        case TokenType.WHILE:
        case TokenType.PRINT:
        case TokenType.RETURN:
          return;
      }

      this.advance();
    }
  }
}

class ParserError extends Error {

}

export default Parser;