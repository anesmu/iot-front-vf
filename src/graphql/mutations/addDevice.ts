import { gql } from '@apollo/client';

export const ADD_DEVICE = gql`
  mutation AddDevice($createDeviceInput: CreateDeviceInput!) {
    createDevice(createDeviceInput: $createDeviceInput) {
      id
      name
      mobileNumber
      lastConnection
      latitude
      longitude
    }
  }
`;
