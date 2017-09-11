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
  Error: Error  // set as generic error class
};
