import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import GradientBG from './GradientBG';

const App: React.FC = () => {
  return (
    <Router>
      <GradientBG>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </GradientBG>
    </Router>
  );
};

export default App;
