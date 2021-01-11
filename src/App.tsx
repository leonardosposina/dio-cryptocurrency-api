import React from 'react';

import Dashboard from './pages/Dashboard';
import AppProvider from './hooks';

import './styles/global.css';

const App: React.FC = () => (
  <AppProvider>
    <Dashboard />
  </AppProvider>
);

export default App;
