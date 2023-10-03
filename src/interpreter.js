import Environment from "./environment.js";
import { LoxError, RuntimeError } from "./error.js";
import TokenType from "./tokenType.js";

class Interpreter {
  constructor() {
    this.environment = new Environment();
  }

  interpret (statements) {
    try {
      statements.forEach(stmt => {
        this.execute(stmt);
      });
    } catch (err) {
      if (err instanceof RuntimeError) {
        LoxError.runtimeError(err);
      }
    }
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
   * @param {Expression.Logical} expr 
   */
  visitLogicalExpr (expr) {
    const left = this.evaluate(expr.left);

    if (expr.operator.type === TokenType.OR) {
      if (left) return left;
    } else {
      if (!left) return left;
    }

    return this.evaluate(expr.right);
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
      case TokenType.BANG: return !right;
      case TokenType.MINUS: return -right;
    }
  }

  /**
   * 
   * @param {Expression.Variable} expr 
   * @returns 
   */
  visitVariableExpr (expr) {
    return this.environment.get(expr.name);
  }

  stringify (obj) {
    if (obj === null) return "nil";
    return obj;
  }

  /**
   * 
   * @param {Expression} expr 
   * @returns {Object}
   */
  evaluate (expr) {
    return expr.accept(this);
  }

  /**
   * 
   * @param {Statement} stmt 
   */
  execute (stmt) {
    stmt.accept(this);
  }

  /**
   * 
   * @param {Array<Statement>} statements 
   * @param {Environment} environment 
   */
  executeBlock (statements, environment) {
    const previous = this.environment;
    try {
      this.environment = environment;

      for (const statement of statements) {
        this.execute(statement);
      }
    } finally {
      this.environment = previous;
    }
  }

  /**
   * 
   * @param {Statement.Block} stmt 
   */
  visitBlockStmt (stmt) {
    this.executeBlock(stmt.statements, new Environment(this.environment));
  }

  /**
   * 
   * @param {Statement.Expr} stmt 
   */
  visitExpressionStmt (stmt) {
    this.evaluate(stmt.expression);
  }

  /**
   * 
   * @param {Statement.If} stmt 
   */
  visitIfStmt (stmt) {
    if (this.evaluate(stmt.condition)) {
      this.execute(stmt.thenBranch);
    } else if (stmt.elseBranch !== null) {
      this.execute(stmt.elseBranch);
    }
  }

  /**
   * 
   * @param {Statement.Print} stmt 
   */
  visitPrintStmt (stmt) {
    const value = this.evaluate(stmt.expression);
    console.log(this.stringify(value));
  }

  /**
   * 
   * @param {Statement.Var} stmt 
   */
  visitVarStmt (stmt) {
    let value = null;
    if (stmt.initializer !== null) {
      value = this.evaluate(stmt.initializer);
    }
    this.environment.define(stmt.name.lexeme, value);
  }

  /**
   * 
   * @param {Statement.Assign} expr 
   * @returns {Object}
   */
  visitAssignExpr (expr) {
    const value = this.evaluate(expr.value);
    this.environment.assign(expr.name, value);
    return value;
  }
}

export default Interpreter;
