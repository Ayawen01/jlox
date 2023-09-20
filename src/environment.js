import { RuntimeError } from "./error.js";

class Environment {
  constructor(enclosing = null) {
    this.enclosing = enclosing;
    this.values = new Map();
  }

  /**
   * 
   * @param {Token} name 
   * @returns {Object}
   */
  get (name) {
    if (this.values.has(name.lexeme)) {
      return this.values.get(name.lexeme);
    }

    if (this.enclosing !== null) {
      return this.enclosing.get(name);
    }

    throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
  }

  /**
   * 
   * @param {Token} name 
   * @param {Object} value 
   */
  assign (name, value) {
    if (this.values.has(name.lexeme)) {
      this.values.set(name.lexeme, value);
      return;
    }

    if (this.enclosing !== null) {
      this.enclosing.assign(name, value);
      return;
    }

    throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
  }

  /**
   * 
   * @param {String} name 
   * @param {Object} value 
   */
  define (name, value) {
    this.values.set(name, value);
  }
}

export default Environment;