import { gql } from '@apollo/client';

export const UPDATE_DEVICE = gql`
  mutation UpdateDevice($id: ID!, $updateDeviceInput: UpdateDeviceInput!) {
    updateDevice(id: $id, updateDeviceInput: $updateDeviceInput) {
      id
      name
      mobileNumber
      lastConnection
      latitude
      longitude
    }
  }
`;
