import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'v0.0.1',
  appName: 'checklist',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
