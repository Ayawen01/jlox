import TokenType from "./tokenType.js";

class Interpreter {
  interpret (ast) {
    return this.evaluate(ast);
  }

  /**
   * 
   * @param {Expression.Binary} expr 
   * @returns {Object}
   */
  visitBinaryExpr (expr) {
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right);

    switch (expr.operator.type) {
      case TokenType.BANG_EQUAL: return left !== right;
      case TokenType.EQUAL_EQUAL: return left === right;
      case TokenType.GREATER: return left > right;
      case TokenType.GREATER_EQUAL: return left >= right;
      case TokenType.LESS: return left < right;
      case TokenType.LESS_EQUAL: return left <= right;
      case TokenType.MINUS: return left - right;
      case TokenType.PLUS: return left + right;
      case TokenType.SLASH: return left / right;
      case TokenType.STAR: return left * right;
    }
  }

  /**
   * 
   * @param {Expression.Literal} expr 
   * @returns {Object}
   */
  visitLiteralExpr (expr) {
    return expr.value;
  }

  /**
   * 
   * @param {Expression.Grouping} expr 
   * @returns {Object}
   */
  visitGroupingExpr (expr) {
    return this.evaluate(expr.expression);
  }

  /**
   * 
   * @param {Expression.Unary} expr 
   * @returns {Object}
   */
  visitUnaryExpr (expr) {
    const right = this.evaluate(expr.right);
    switch (expr.operator.type) {
      case TokenType.BANG: return this.isTruthy(right);
      case TokenType.MINUS: return -right;
    }
  }

  /**
   * 
   * @param {Object} obj 
   * @returns {Boolean}
   */
  isTruthy (obj) {
    return !obj;
  }

  /**
   * 
   * @param {Expression} expr 
   * @returns {Object}
   */
  evaluate (expr) {
    return expr.accept(this);
  }
}

export default Interpreter;
