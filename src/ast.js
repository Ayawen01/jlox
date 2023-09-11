class Statement { }

class Block extends Statement {
  /**
   * 
   * @param {Array<Statement>} statements 
   */
  constructor(statements) {
    super();
    this.statements = statements;
  }

  accept (visitor) {
    return visitor.visitBlockStmt(this);
  }
}

class Class extends Statement {
  /**
   * 
   * @param {Token} name 
   * @param {Expression.Variable} superclass 
   * @param {Array<Statement.Function>} methods 
   */
  constructor(name, superclass, methods) {
    super();
    this.name = name;
    this.superclass = superclass;
    this.methods = methods;
  }

  accept (visitor) {
    return visitor.visitClassStmt(this);
  }
}

class Expr extends Statement {
  /**
   * 
   * @param {Expression} expression 
   */
  constructor(expression) {
    super();
    this.expression = expression;
  }

  accept (visitor) {
    return visitor.visitExpressionStmt(this);
  }
}

class Fn extends Statement {
  /**
   * 
   * @param {Token} name 
   * @param {Array<Token>} params 
   * @param {Array<Statement>} body 
   */
  constructor(name, params, body) {
    super();
    this.name = name;
    this.params = params;
    this.body = body;
  }

  accept (visitor) {
    return visitor.visitFnStmt(this);
  }
}

class If extends Statement {
  /**
   * 
   * @param {Expression} condition 
   * @param {Statement} thenBranch 
   * @param {Statement} elseBranch 
   */
  constructor(condition, thenBranch, elseBranch) {
    super();
    this.condition = condition;
    this.thenBranch = thenBranch;
    this.elseBranch = elseBranch;
  }

  accept (visitor) {
    return visitor.visitIfStmt(this);
  }
}

class Print extends Statement {
  /**
   * 
   * @param {Expression} expression 
   */
  constructor(expression) {
    super();
    this.expression = expression;
  }

  accept (visitor) {
    return visitor.visitPrintStmt(this);
  }
}

class Return extends Statement {
  /**
   * 
   * @param {Token} keyword 
   * @param {Expression} value 
   */
  constructor(keyword, value) {
    super();
    this.keyword = keyword;
    this.value = value;
  }

  accept (visitor) {
    return visitor.visitReturnStmt(this);
  }
}

class Var extends Statement {
  /**
   * 
   * @param {Token} name 
   * @param {Expression} initializer 
   */
  constructor(name, initializer) {
    super();
    this.name = name;
    this.initializer = initializer;
  }

  accept (visitor) {
    return visitor.visitVarStmt(this);
  }
}

class While extends Statement {
  /**
   * 
   * @param {Expression} condition 
   * @param {Statement} body 
   */
  constructor(condition, body) {
    super();
    this.condition = condition;
    this.body = body;
  }

  accept (visitor) {
    return visitor.visitWhileStmt(this);
  }
}

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

class Logical extends Expression {
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
    return visitor.visitLogicalExpr(this);
  }
}

class Set extends Expression {
  /**
   * 
   * @param {Expression} object 
   * @param {Token} name 
   * @param {Expression} value 
   */
  constructor(object, name, value) {
    super();
    this.object = object;
    this.name = name;
    this.value = value;
  }

  accept (visitor) {
    return visitor.visitSetExpr(this);
  }
}

class Super extends Expression {
  /**
   * 
   * @param {Token} keyword 
   * @param {Token} method 
   */
  constructor(keyword, method) {
    super();
    this.keyword = keyword;
    this.method = method;
  }

  accept (visitor) {
    return visitor.visitSuperExpr(this);
  }
}

class This extends Expression {
  /**
   * 
   * @param {Token} keyword 
   */
  constructor(keyword) {
    super();
    this.keyword = keyword;
  }

  accept (visitor) {
    return visitor.visitThisExpr(this);
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

class Variable extends Expression {
  /**
   * 
   * @param {Token} name 
   */
  constructor(name) {
    super();
    this.name = name;
  }

  accept (visitor) {
    return visitor.visitVariableExpr(this);
  }
}

const stmt = {
  Block, Class, Expr, Fn,
  If, Print, Return, Var,
  While
};

const expr = {
  Assign, Binary, Call, Get,
  Grouping, Literal, Logical, Set,
  Super, This, Unary,
  Variable,
};

export {
  stmt, expr
};