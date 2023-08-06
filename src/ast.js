import Token from "./token.js";

class Statement { }

class Expression { }

class Binary extends Expression {
  /**
   * 
   * @param {Expression} left 
   * @param {Token} operator 
   * @param {Expression} right 
   */
  constructor(left, operator, right) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  accept (visitor) {
    return visitor.visitBinaryExpr(this);
  }
}

class Grouping extends Expression {
  /**
   * 
   * @param {Expression} expression 
   */
  constructor(expression) {
    super();
    this.expression = expression;
  }

  accept (visitor) {
    return visitor.visitGroupingExpr(this);
  }
}

class Literal extends Expression {
  /**
   * 
   * @param {Object} value 
   */
  constructor(value) {
    super();
    this.value = value;
  }

  accept (visitor) {
    return visitor.visitLiteralExpr(this);
  }
}

class Unary extends Expression {
  /**
   * 
   * @param {Token} operator 
   * @param {Expression} right 
   */
  constructor(operator, right) {
    super();
    this.operator = operator;
    this.right = right;
  }

  accept (visitor) {
    return visitor.visitUnaryExpr(this);
  }
}

const Stmt = {

};

const Expr = {
  Binary, Grouping, Literal, Unary
};

export {
  Stmt, Expr
};