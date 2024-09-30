import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env.testing' });

export default defineConfig({
  defaultCommandTimeout: 20000,
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl = 'http://localhost:8100';

      return config;
    },
  },
  env: {
    auth_password: process.env.VITE_ACCOUNT_PASSWORD_TEST,
    auth_username: process.env.VITE_ACCOUNT_USER_NAME_TEST,
  },
  projectId: 'ksvtx3',
});
