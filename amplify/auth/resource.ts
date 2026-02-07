import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true, // This allows email/password login
    // We will add social providers (Google/Apple) here in a later step
  },
  userAttributes: {
    address: {
      required: false,
      mutable: true,
    },
    // This stores if they are a Provider or Client
    "custom:role": {
      dataType: "String",
      mutable: true,
    }
  }
});