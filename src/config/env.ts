const env = process.env.NEXT_PUBLIC_ENV || 'development';

export const config = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    appUrl: 'http://localhost:3000',
  },
  preview: {
    apiUrl: 'https://test.teai.io/api',
    appUrl: 'https://test.teai.io',
  },
  production: {
    apiUrl: 'https://teai.io/api',
    appUrl: 'https://teai.io',
  },
}[env];

export const isProduction = env === 'production';
export const isPreview = env === 'preview';
export const isDevelopment = env === 'development';