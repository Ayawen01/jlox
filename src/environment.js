class Environment {
  constructor() {
    this.values = new Map();
  }

  /**
   * 
   * @param {Token} name 
   * @returns 
   */
  get(name) {
    if (this.values.has(name.lexeme)) {
      return this.values.get(name.lexeme);
    }

    throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
  }

  /**
   * 
   * @param {Token} name 
   * @param {Object} value 
   * @returns 
   */
  assign(name, value) {
    if (this.values.has(name.lexeme)) {
      this.values.set(name.lexeme, value);
      return;
    }

    throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
  }

  /**
   * 
   * @param {String} name 
   * @param {Object} value 
   */
  define(name, value) {
    this.values.set(name, value);
  }
}

export default Environment;