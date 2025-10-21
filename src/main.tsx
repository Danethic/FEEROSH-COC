import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/authcontext';
import { GameProvider } from './contexts/gamecontext';
import { NotificationsProvider } from './contexts/notificationscontext';
import { ChatProvider } from './contexts/chatcontext';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GameProvider>
        <NotificationsProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </NotificationsProvider>
      </GameProvider>
    </AuthProvider>
  </React.StrictMode>
);