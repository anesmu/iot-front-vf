import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_DEVICES } from '../../graphql/queries/getDevice';
import Map from '../../components/Map';
import { Device } from '../../types/device';
import {
  ContentContainer,
  PageContainer,
  Title,
  MapContainer,
} from './Home.styles';

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<{ devices: Device[] }>(GET_DEVICES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <PageContainer>
      <ContentContainer>
        <Title>Devices Map</Title>
        <MapContainer>
          <Map devices={data?.devices ?? []} />
        </MapContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default Home;
