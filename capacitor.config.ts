import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Prodavnica',
  webDir: 'www',
  server: {
    cleartext: true
  },
  android: {
    webContentsDebuggingEnabled: true
  }
};

export default config;
