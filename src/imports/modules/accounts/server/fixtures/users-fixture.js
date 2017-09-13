import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { globalUserRoles } from './../../shared/constants/global-user-roles';

const getRandomFirstName = () => {
  const firstNames = ['Alex', 'Amanda', 'Austin', 'Brad', 'Chad', 'Chloe', 'Chris', 'Doug', 'Daniel', 'Danielle', 'Diego', 'Evan', 'Eric', 'Elizabeth', 'Frank', 'Gavin', 'Harry', 'Joe', 'Jesse', 'Jessica', 'Karen', 'Lizzy', 'Manuel', 'Monica', 'Nancy', 'Peter', 'Richard', 'Samantha', 'Sam', 'Walter'];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};
const getRandomLastName = () => {
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'White', 'Jones', 'Miller', 'Davis', 'Garcia', 'Lopez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Martin', 'Jackson', 'Thompson', 'Lee', 'Clarks'];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const fakeUsers = [
  {
    email: 'test1@mail.com',
    password: 'TESTtest1?',
    profile: {
      firstName: 'Test 1',
      lastName: 'User'
    }
  },
  {
    email: 'test2@mail.com',
    password: 'TESTtest2?',
    profile: {
      firstName: 'Test 2',
      lastName: 'User'
    }
  },
  {
    email: 'test3@mail.com',
    password: 'TESTtest3?',
    profile: {
      firstName: 'Test 3',
      lastName: 'User'
    }
  },
  {
    email: 'test4@mail.com',
    password: 'TESTtest4?',
    profile: {
      firstName: 'Test 4',
      lastName: 'User'
    }
  }
];
for (let i = 0; i < 60; i++) {
  fakeUsers.push({
    email: 'test' + (i + 5) + '@mail.com',
    password: 'TESTtest1?',
    profile: {
      firstName: getRandomFirstName(),
      lastName: getRandomLastName()
    }
  });
}

if (Meteor.isDevelopment) {
  if (Meteor.users.find().count() === 0) {
    fakeUsers.forEach((fakeUser, i) => {
      const newUserId = Accounts.createUser(fakeUser);
      Meteor.users.update(newUserId,
        {
          $set: {
            emails: [
              {
                address: fakeUser.email,
                verified: true
              }
            ]
          }
        }
      );
      // make first test account super admin role
      if (i === 0) {
        Roles.addUsersToRoles(newUserId, globalUserRoles.SUPER_ADMIN, Roles.GLOBAL_GROUP);
      }
      // make second test account admin role
      if (i === 1) {
        Roles.addUsersToRoles(newUserId, globalUserRoles.ADMIN, Roles.GLOBAL_GROUP);
      }
      // make third test account employee role
      if (i === 2) {
        Roles.addUsersToRoles(newUserId, globalUserRoles.EMPLOYEE, Roles.GLOBAL_GROUP);
      }
      // make fourth test account user role
      if (i >= 3) {
        Roles.addUsersToRoles(newUserId, globalUserRoles.USER, Roles.GLOBAL_GROUP);
      }
    });
    console.log('Created ' + fakeUsers.length + ' fake users.');
  } else {
    console.log(Meteor.users.find().count() + ' users found in db.');
  }
}
