import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const MUTATION_TYPES = {
  SET_USER: 'SET_USER',
  TOGGLE_AUTH: 'TOGGLE_AUTH'
};

const actions = {
  registerUser ({ commit, state }, { username, email, password, name }) {
    return new Promise((resolve, reject) => {
      Accounts.createUser({
        username,
        password,
        email,
        name
      }, (err) => {
        if (err) {
          console.error(`Error registering user: ${err}`);
          return reject(err);
        }
        return resolve();
      });
    });
  },
  loginUser ({ commit, state }, { username, password }) {
    return new Promise((resolve, reject) => {
      Meteor.loginWithPassword(username, password, (err) => {
        if (err) {
          console.error(`Error logging in: ${err}`);
          return resolve(false);
        }
        return resolve(true);
      });
    });
  },
  logoutUser () {
    return new Promise((resolve, reject) => {
      Meteor.logout(() => {
        return resolve();
      });
    });
  },
  setUser: ({ commit }, { user }) => {
    commit(MUTATION_TYPES.SET_USER, { user });
  },
  toggleAuth: ({ commit }) => {
    commit(MUTATION_TYPES.TOGGLE_AUTH);
  }
};

const mutations = {
  [MUTATION_TYPES.SET_USER]: (state, { user }) => {
    if (!user) {
      state.user = user;
      return;
    }
    state.user += {
      _id: user._id
    };
  },
  [MUTATION_TYPES.TOGGLE_AUTH]: (state) => {
    state.isAuthVisible = !state.isAuthVisible;
  }
};

export {
  actions,
  mutations,
  MUTATION_TYPES
};
