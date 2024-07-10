import { gql } from '@apollo/client';

export const GET_DEVICES = gql`
  query GetDevices {
    devices {
      id
      name
      mobileNumber
      lastConnection
      latitude
      longitude
    }
  }
`;
