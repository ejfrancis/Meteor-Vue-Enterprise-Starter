import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { createUnverifiedUser } from './../../shared/methods/create-unverified-user';
import { passwordSchema } from './../../shared/schemas/password-schema';
import { getUsersWithRoles } from './../../shared/methods/get-users-with-roles';

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
  CLEAR_ENROLL_ACCOUNT_FAILURE: 'CLEAR_ENROLL_ACCOUNT_FAILURE',
  // get users with roles for admin
  GET_USERS_WITH_ROLES_FAILURE: 'GET_USERS_WITH_ROLES_FAILURE',
  CLEAR_GET_USERS_WITH_ROLES_FAILURE: 'CLEAR_GET_USERS_WITH_ROLES_FAILURE',
  GET_USERS_WITH_ROLES_LOADING: 'GET_USERS_WITH_ROLES_LOADING',
  GET_USERS_WITH_ROLES_LOADING_COMPLETE: 'GET_USERS_WITH_ROLES_LOADING_COMPLETE'
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
        return reject(new Error(passwordSchema.summary));
      }
      Accounts.resetPassword(token, newPassword, (err) => {
        if (err) {
          commit(MUTATION_TYPES.ENROLL_ACCOUNT_FAILED, { error: err });
          return reject(err);
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
          return reject(err);
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
          return reject(err);
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
  },
  // get list of users with roles
  async getUsersWithRoles ({ commit, state }, { token, newPassword }) {
    try {
      commit(MUTATION_TYPES.GET_USERS_WITH_ROLES_LOADING);
      const usersWithRoles = await getUsersWithRoles.callPromise({ startIndex: 0 });
      commit(MUTATION_TYPES.GET_USERS_WITH_ROLES_LOADING_COMPLETE);
      return usersWithRoles;
    } catch (e) {
      commit(MUTATION_TYPES.GET_USERS_WITH_ROLES_FAILURE, { error: e });
      commit(MUTATION_TYPES.GET_USERS_WITH_ROLES_LOADING_COMPLETE);
      throw new Error('Failed getUsersWithRoles ' + e);
    }
  },
  clearGetUsersWithRolesFailure: ({ commit }) => {
    commit(MUTATION_TYPES.CLEAR_GET_USERS_WITH_ROLES_FAILURE);
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
  },
  // get users with roles
  [MUTATION_TYPES.GET_USERS_WITH_ROLES_FAILURE]: (state, { error }) => {
    state.getUsersWithRolesError = error;
  },
  [MUTATION_TYPES.CLEAR_GET_USERS_WITH_ROLES_FAILURE]: (state) => {
    state.getUsersWithRolesError = undefined;
  },
  [MUTATION_TYPES.GET_USERS_WITH_ROLES_LOADING]: (state) => {
    state.getUsersWithRolesLoading = true;
  },
  [MUTATION_TYPES.GET_USERS_WITH_ROLES_LOADING_COMPLETE]: (state) => {
    state.getUsersWithRolesLoading = false;
  }
};

export {
  actions,
  mutations,
  MUTATION_TYPES
};
