import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'v1.0.0',
  appName: 'checklist',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
