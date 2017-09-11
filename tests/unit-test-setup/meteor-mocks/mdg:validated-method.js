class ValidatedMethodMock {
  constructor ({ name, validate, run }) {
    this.name = name;
    this.validate = validate;
    this.run = run;
    const call = function () {
      return this.run(...arguments);
    };
    return {
      call: call.bind(this)
    };
  }
}

export {
  ValidatedMethodMock as ValidatedMethod
};
