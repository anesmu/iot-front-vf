import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import DeviceModal from './DeviceModal';
import { ADD_DEVICE } from '../../../graphql/mutations/addDevice';
import { act } from 'react';

describe('DeviceModal', () => {
  const handleClose = jest.fn();

  const mocks = [
    {
      request: {
        query: ADD_DEVICE,
        variables: {
          createDeviceInput: {
            name: 'Test Device',
            mobileNumber: '',
            lastConnection: '',
            latitude: '',
            longitude: '',
          },
        },
      },
      result: {
        data: {
          addDevice: {
            id: '1',
            name: 'Test Device',
            mobileNumber: '',
            lastConnection: '',
            latitude: '',
            longitude: '',
          },
        },
      },
    },
  ];

  test('save button is disabled when all fields are empty', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <DeviceModal isOpen={true} onClose={handleClose} device={null} />
        </MockedProvider>
      );
    });

    const saveButton = screen.getByRole('button', { name: /add device/i });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });

  test('save button is enabled when at least one field is filled', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <DeviceModal isOpen={true} onClose={handleClose} device={null} />
        </MockedProvider>
      );
    });

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Test Device' } });

    const saveButton = screen.getByRole('button', { name: /add device/i });
    expect(saveButton).not.toBeDisabled();
  });
});
