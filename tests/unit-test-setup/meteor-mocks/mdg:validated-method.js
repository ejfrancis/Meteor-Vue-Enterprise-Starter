class ValidatedMethodMock {
  constructor ({ name, validate, run }) {
    this.name = name;
    this.validate = validate;
    this.run = run;
    const method = function (args) {
      return this.run(...args);
    };
    return method;
  }
}

export {
  ValidatedMethodMock as ValidatedMethod
};
