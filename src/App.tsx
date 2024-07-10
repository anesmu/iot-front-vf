import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Devices from './pages/Devices/Devices';
import Header from './components/layout/Header/Header';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Router>
        <Header />
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/devices" element={<Devices />} />
          </Routes>
        </ContentContainer>
      </Router>
    </AppContainer>
  );
};

export default App;
