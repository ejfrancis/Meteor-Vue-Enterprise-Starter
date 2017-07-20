import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const MUTATION_TYPES = {
  SET_USER: 'SET_USER',
  LOGIN_FAILED: 'LOGIN_FAILED',
  CLEAR_LOGIN_FAILURE: 'CLEAR_LOGIN_FAILURE',
  REGISTER_FAILED: 'REGISTER_FAILED',
  CLEAR_REGISTER_FAILURE: 'CLEAR_REGISTER_FAILURE'
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
          console.warn(`Error registering user: ${err}`);
          commit(MUTATION_TYPES.REGISTER_FAILED, { error: err });
          return reject(err);
        }
        commit(MUTATION_TYPES.CLEAR_REGISTER_FAILURE);
        return resolve();
      });
    });
  },
  loginUser ({ commit, state }, { username, password }) {
    return new Promise((resolve, reject) => {
      Meteor.loginWithPassword(username, password, (err) => {
        if (err) {
          console.warn(`Error logging in: ${err}`);
          commit(MUTATION_TYPES.LOGIN_FAILED, { error: err });
          return resolve(false);
        }
        commit(MUTATION_TYPES.CLEAR_LOGIN_FAILURE);
        return resolve(true);
      });
    });
  },
  logoutUser () {
    return new Promise((resolve, reject) => {
      Meteor.logout((err) => {
        if (err) {
          return resolve(false);
        }
        return resolve(true);
      });
    });
  },
  setUser: ({ commit }, { user }) => {
    commit(MUTATION_TYPES.SET_USER, { user });
  },
  clearLoginFailure: ({ commit }) => {
    commit(MUTATION_TYPES.CLEAR_LOGIN_FAILURE);
  },
  clearRegisterFailure: ({ commit }) => {
    commit(MUTATION_TYPES.CLEAR_REGISTER_FAILURE);
  }
};

const mutations = {
  [MUTATION_TYPES.SET_USER]: (state, { user }) => {
    if (!user) {
      state.user = user;
    }
    // state.user += {
    //   _id: user._id
    // };
  },
  [MUTATION_TYPES.LOGIN_FAILED]: (state, { error }) => {
    state.loginError = error;
  },
  [MUTATION_TYPES.CLEAR_LOGIN_FAILURE]: (state) => {
    state.loginError = undefined;
  },
  [MUTATION_TYPES.REGISTER_FAILED]: (state, { error }) => {
    state.registerError = error;
  },
  [MUTATION_TYPES.CLEAR_REGISTER_FAILURE]: (state) => {
    state.registerError = undefined;
  }
};

export {
  actions,
  mutations,
  MUTATION_TYPES
};
