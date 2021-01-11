import React from 'react';

import { AlertProvider } from './alert';

const AppProvider: React.FC = ({ children }) => (
  <AlertProvider>{children}</AlertProvider>
);

export default AppProvider;
