import Token from "./token.js";

class Statement { }

class Expression { }

class Assign extends Expression {
  /**
   * 
   * @param {Token} name 
   * @param {Expression} value 
   */
  constructor(name, value) {
    super();
    this.name = name;
    this.value = value;
  }

  accept (visitor) {
    return visitor.visitAssignExpr(this);
  }
}

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

class Call extends Expression {
  /**
   * 
   * @param {Expression} callee 
   * @param {Token} paren 
   * @param {Array<Expression>} args 
   */
  constructor(callee, paren, args) {
    super();
    this.callee = callee;
    this.paren = paren;
    this.args = args;
  }

  accept (visitor) {
    return visitor.visitCallExpr(this);
  }
}

class Get extends Expression {
  /**
   * 
   * @param {Expression} object 
   * @param {Token} name 
   */
  constructor(object, name) {
    super();
    this.object = object;
    this.name = name;
  }

  accept (visitor) {
    return visitor.visitGetExpr(this);
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
  Assign, Binary, Call, Get, Grouping, Literal, Unary
};

export {
  Stmt, Expr
};