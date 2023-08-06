class AstPrinter {
  /**
   * 
   * @param {Expression} expr 
   */
  print (expr) {
    return expr.accept(this);
  }

  /**
   * 
   * @param {Expression.Binary} expr 
   * @returns {String}
   */
  visitBinaryExpr (expr) {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }

  /**
   * 
   * @param {Expression.Grouping} expr 
   * @returns {String}
   */
  visitGroupingExpr (expr) {
    return this.parenthesize('group', expr.expression);
  }

  /**
   * 
   * @param {Expression.Literal} expr 
   * @returns {Object}
   */
  visitLiteralExpr (expr) {
    if (expr.value === null) return 'nil';
    return expr.value;
  }

  /**
   * 
   * @param {Expression.Unary} expr 
   * @returns {String}
   */
  visitUnaryExpr (expr) {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  /**
   * 
   * @param {String} name 
   * @param  {...Expression} exprs 
   * @returns 
   */
  parenthesize (name, ...exprs) {
    let builder = '(' + name;
    for (const expr of exprs) {
      builder += ' ';
      builder += expr.accept(this);
    }
    builder += ')';
    return builder;
  }
}

export default AstPrinter;
