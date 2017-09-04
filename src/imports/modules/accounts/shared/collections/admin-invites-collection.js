import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const adminInvitesCollectionName = 'admin-invites';
const adminInvitesCollection = new Meteor.Collection(adminInvitesCollectionName);

adminInvitesCollection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

adminInvitesCollection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

const adminInvitesCollectionSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email to send invitation to.'
  },
  token: {
    type: String,
    label: 'Invitation token.'
  },
  role: {
    type: String,
    label: 'Role to apply to the user.'
  },
  date: {
    type: String,
    label: 'Invitation Date'
  }
});

adminInvitesCollection.attachSchema(adminInvitesCollectionSchema);

export {
  adminInvitesCollection,
  adminInvitesCollectionName
};
