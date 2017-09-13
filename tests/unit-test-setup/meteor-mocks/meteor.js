class MeteorError {
  constructor (arg1, arg2) {
    if (typeof arg2 === 'undefined') {
      this.message = arg1;
    } else {
      this.code = arg1;
      this.message = arg2;
    }
  }
}

export const Meteor = {
  call: () => null,
  startup: (next) => next(),
  settings: {
    public: {
      title: 'Test Title'
    }
  },
  userId: () => 'userid',
  user: () => {
    return {
      username: 'testuser',
      emails: ['testuser@test.com'],
      profile: {}
    };
  },
  users: {
    deny: () => {}
  },
  loggingIn: () => false,
  Error: MeteorError  // set as generic error class
};
