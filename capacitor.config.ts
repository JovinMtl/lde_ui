import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.muteule.app',
  // appName: 'secondlde',
  appName: 'Lit Dinar',
  // webDir: 'public',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
