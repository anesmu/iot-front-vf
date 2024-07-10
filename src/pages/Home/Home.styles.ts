import styled from 'styled-components';

export const PageContainer = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

export const ContentContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  word-wrap: break-word;
  margin: 0 0 20px 0;
  flex-shrink: 0;
`;

export const MapContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
`;
