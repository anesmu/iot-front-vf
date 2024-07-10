import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';
import { GET_DEVICES } from '../../graphql/queries/getDevice';
import { act } from 'react';

const devicesMock = [
  {
    request: {
      query: GET_DEVICES,
      variables: {},
    },
    result: {
      data: {
        devices: [
          {
            id: '1',
            name: 'Device 1',
            mobileNumber: '123456789',
            lastConnection: '2024-01-01',
            latitude: '10.0000',
            longitude: '20.0000',
          },
        ],
      },
    },
  },
];

describe('Home', () => {
  test('renders loading state initially', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <Home />
        </MockedProvider>
      );
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders devices map when data is loaded', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={devicesMock} addTypename={false}>
          <Home />
        </MockedProvider>
      );
    });

    await waitFor(() =>
      expect(screen.getByText('Devices Map')).toBeInTheDocument()
    );
  });

  test('renders error state', async () => {
    const errorMock = [
      {
        request: {
          query: GET_DEVICES,
          variables: {},
        },
        error: new Error('An error occurred'),
      },
    ];

    await act(async () => {
      render(
        <MockedProvider mocks={errorMock} addTypename={false}>
          <Home />
        </MockedProvider>
      );
    });

    await waitFor(() =>
      expect(screen.getByText('Error :(')).toBeInTheDocument()
    );
  });
});
