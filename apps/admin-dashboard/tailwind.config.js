import { tailwindConfig } from '@engine/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  ...tailwindConfig,
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/core/src/**/*.tsx',
    '../../packages/ui/src/**/*.tsx',
  ],
};
