import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider, useAuth } from './contexts/authcontext';
import { GameProvider } from './contexts/gamecontext';
import { NotificationsProvider } from './contexts/notificationscontext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
    <GameProvider>
      <NotificationsProvider>
        <App />
     </NotificationsProvider>
    </GameProvider>
     </AuthProvider>
  </React.StrictMode>
);