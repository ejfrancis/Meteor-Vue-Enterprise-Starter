import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { createUnverifiedUser } from './../../shared/methods/create-unverified-user';
import { passwordSchema } from './../../shared/schemas/password-schema';

const MUTATION_TYPES = {
  SET_USER: 'SET_USER',
  // login
  LOGIN_FAILED: 'LOGIN_FAILED',
  CLEAR_LOGIN_FAILURE: 'CLEAR_LOGIN_FAILURE',
  // register
  REGISTER_FAILED: 'REGISTER_FAILED',
  CLEAR_REGISTER_FAILURE: 'CLEAR_REGISTER_FAILURE',
  // password reset
  PASSWORD_RESET_EMAIL_SENT: 'PASSWORD_RESET_EMAIL_SENT',
  PASSWORD_RESET_FAILED: 'PASSWORD_RESET_FAILED',
  CLEAR_PASSWORD_RESET_FAILURE: 'CLEAR_PASSWORD_RESET_FAILURE',
  // enroll account via email
  ENROLL_ACCOUNT_EMAIL_SENT: 'ENROLL_ACCOUNT_EMAIL_SENT',
  ENROLL_ACCOUNT_FAILED: 'ENROLL_ACCOUNT_FAILED',
  CLEAR_ENROLL_ACCOUNT_FAILURE: 'CLEAR_ENROLL_ACCOUNT_FAILURE'
};

const actions = {
  // sign up and enrollment
  registerUser ({ commit, state }, { firstName, lastName, email }) {
    return new Promise((resolve, reject) => {
      try {
        createUnverifiedUser.call({ email, firstName, lastName }, (err) => {
          if (err) {
            commit(MUTATION_TYPES.REGISTER_FAILED, { error: err });
            return reject(err);
            // return;
          }
          commit(MUTATION_TYPES.CLEAR_REGISTER_FAILURE);
          commit(MUTATION_TYPES.ENROLL_ACCOUNT_EMAIL_SENT);
          return resolve(true);
        });
      } catch (e) {
        // validation error causes throw on the client, to avoid server
        // round trip just to find out its invalid
        commit(MUTATION_TYPES.REGISTER_FAILED, { error: e });
        return reject(e);
      }
    });
  },
  clearRegisterFailure: ({ commit }) => {
    commit(MUTATION_TYPES.CLEAR_REGISTER_FAILURE);
  },
  enrollVerifyAccount ({ commit, state }, { token, newPassword }) {
    return new Promise((resolve, reject) => {
      // make sure password validates before sending
      try {
        passwordSchema.validate({ password: newPassword });
      } catch (e) {
        commit(MUTATION_TYPES.ENROLL_ACCOUNT_FAILED, { error: e });
        return resolve(false);
      }
      Accounts.resetPassword(token, newPassword, (err) => {
        if (err) {
          commit(MUTATION_TYPES.ENROLL_ACCOUNT_FAILED, { error: err });
          return resolve(false);
        }
        commit(MUTATION_TYPES.CLEAR_ENROLL_ACCOUNT_FAILURE);
        return resolve(true);
      });
    });
  },
  clearEnrollAccountFailure: ({ commit }) => {
    commit(MUTATION_TYPES.CLEAR_ENROLL_ACCOUNT_FAILURE);
  },
  // login
  loginUser ({ commit, state }, { username, password }) {
    return new Promise((resolve, reject) => {
      Meteor.loginWithPassword(username, password, (err) => {
        if (err) {
          commit(MUTATION_TYPES.LOGIN_FAILED, { error: err });
          return resolve(false);
        }
        commit(MUTATION_TYPES.CLEAR_LOGIN_FAILURE);
        return resolve(true);
      });
    });
  },
  clearLoginFailure: ({ commit }) => {
    commit(MUTATION_TYPES.CLEAR_LOGIN_FAILURE);
  },
  setUser: ({ commit }, { user }) => {
    commit(MUTATION_TYPES.SET_USER, { user });
  },
  // logout
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
  // password reset
  sendPasswordResetEmail ({ commit, state }, { email }) {
    return new Promise((resolve, reject) => {
      Accounts.forgotPassword({ email }, (err) => {
        if (err) {
          commit(MUTATION_TYPES.PASSWORD_RESET_FAILED, { error: err });
          return reject(err);
        }
        commit(MUTATION_TYPES.CLEAR_PASSWORD_RESET_FAILURE);
        commit(MUTATION_TYPES.PASSWORD_RESET_EMAIL_SENT);
        return resolve(true);
      });
    });
  },
  passwordReset ({ commit, state }, { token, newPassword }) {
    return new Promise((resolve, reject) => {
      Accounts.resetPassword(token, newPassword, (err) => {
        if (err) {
          commit(MUTATION_TYPES.PASSWORD_RESET_FAILED, { error: err });
          return reject(err);
        }
        commit(MUTATION_TYPES.CLEAR_PASSWORD_RESET_FAILURE);
        return resolve(true);
      });
    });
  },
  clearPasswordResetFailure: ({ commit }) => {
    commit(MUTATION_TYPES.CLEAR_PASSWORD_RESET_FAILURE);
  }
};

const mutations = {
  [MUTATION_TYPES.SET_USER]: (state, { user }) => {
    state.user = user;
  },
  // login
  [MUTATION_TYPES.LOGIN_FAILED]: (state, { error }) => {
    state.loginError = error;
  },
  [MUTATION_TYPES.CLEAR_LOGIN_FAILURE]: (state) => {
    state.loginError = undefined;
  },
  // register
  [MUTATION_TYPES.REGISTER_FAILED]: (state, { error }) => {
    state.registerError = error;
    state.enrollAccountEmailSent = false;
  },
  [MUTATION_TYPES.CLEAR_REGISTER_FAILURE]: (state) => {
    state.registerError = undefined;
  },
  // reset password
  [MUTATION_TYPES.PASSWORD_RESET_EMAIL_SENT]: (state) => {
    state.passwordResetEmailSent = true;
  },
  [MUTATION_TYPES.PASSWORD_RESET_FAILED]: (state, { error }) => {
    state.passwordResetError = error;
  },
  [MUTATION_TYPES.CLEAR_PASSWORD_RESET_FAILURE]: (state) => {
    state.passwordResetError = undefined;
  },
  // enroll account via email
  [MUTATION_TYPES.ENROLL_ACCOUNT_EMAIL_SENT]: (state) => {
    state.enrollAccountEmailSent = true;
  },
  [MUTATION_TYPES.ENROLL_ACCOUNT_FAILED]: (state, { error }) => {
    state.enrollAccountError = error;
  },
  [MUTATION_TYPES.CLEAR_ENROLL_ACCOUNT_FAILURE]: (state) => {
    state.enrollAccountError = undefined;
  }
};

export {
  actions,
  mutations,
  MUTATION_TYPES
};
