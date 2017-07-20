export const Meteor = {
  call: () => null,
  startup: (next) => next(),
  settings: {
    public: {
      title: 'Test Title'
    }
  },
  user: () => {
    return {
      username: 'testuser',
      email: 'testuser@test.com',
      profile: {}
    }
  }
};
