import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.leetcodehot100.app',
  appName: 'LeetCode Hot 100',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
