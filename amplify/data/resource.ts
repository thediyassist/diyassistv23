import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  // The Profile stores info for both Clients and Providers
  
  UserProfile: a.model({
    email: a.string().required(),
    name: a.string(),
    address: a.string(),
    city: a.string(),
    state: a.string(),
    isProvider: a.boolean().default(false),
    // This links the user to their chosen specialties
    specialties: a.hasMany('ProviderSpecialty', 'profileId'),
  }).authorization((allow) => [allow.owner()]),
  ServiceRequest: a.model({
    title: a.string().required(),
    description: a.string().required(),
    category: a.string().required(),
    requestedDate: a.date().required(),
    requestedTime: a.time().required(),
    status: a.enum(['PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELLED']),
    clientId: a.id(),
  }).authorization((allow) => [allow.owner()]),

  // This model represents the specific skills a provider selects
  ProviderSpecialty: a.model({
    profileId: a.id(),
    specialtyName: a.string().required(), // e.g., "Electrical", "HVAC"
    profile: a.belongsTo('UserProfile', 'profileId'),
  }).authorization((allow) => [allow.owner(), allow.guest().to(['read'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});