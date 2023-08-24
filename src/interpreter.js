class Interpreter {
  interpret(ast) {
    return this.evaluate(ast);
  }

  /**
   * 
   * @param {Expression.Literal} expr 
   * @returns {Object}
   */
  visitLiteralExpr(expr) {
    return expr.value;
  }

  /**
   * 
   * @param {Expression.Grouping} expr 
   * @returns {Object}
   */
  visitGroupingExpr(expr) {
    return this.evaluate(expr.expression);
  }

  /**
   * 
   * @param {Expression} expr 
   * @returns {Object}
   */
  evaluate(expr) {
    return expr.accept(this);
  }
}

export default Interpreter;
