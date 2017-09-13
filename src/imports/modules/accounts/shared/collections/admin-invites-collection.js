import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const invitesCollectionName = 'user-invites';
const invitesCollection = new Meteor.Collection(invitesCollectionName);

invitesCollection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

invitesCollection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

const invitesCollectionSchema = new SimpleSchema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    label: 'Email to send invitation to.',
    required: true
  },
  accepted: {
    type: Boolean,
    label: 'If user accepted the invitation.',
    required: true
  },
  requestedAt: {
    type: Date,
    required: true
  },
  inviteNumber: {
    type: Number,
    label: 'Invitation Date',
    required: true
  }
});

invitesCollection.attachSchema(invitesCollectionSchema);

export {
  invitesCollection,
  invitesCollectionName
};
