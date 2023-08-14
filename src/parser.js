import Token from "./token.js";
import TokenType from "./tokenType.js";
import { expr as Expr } from "./ast.js";

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
  expression () {
    return this.equality();
  }

  /**
   * 
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
}

export default Parser;