// src/amplifyConfig.js
import './amplifyConfig';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_ryUmIsJ1U',
    userPoolWebClientId: '2igfqnmomu0k7qm4u81hbf6alt',
  }
});
