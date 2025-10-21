import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'FeeroshCOC',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: "none", // opciones: 'body', 'native', 'ionic', 'none'
    },
  },
};

export default config;
