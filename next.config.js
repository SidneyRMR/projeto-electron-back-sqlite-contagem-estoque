require('dotenv').config();

module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.output.hotUpdateMainFilename = 'static/webpack/[fullhash].hot-update.json';
      config.output.hotUpdateChunkFilename = 'static/webpack/[id].[fullhash].hot-update.js';
    }
    return config;
  },
  env: {
    REACT_APP_NGROK_URL: process.env.REACT_APP_NGROK_URL,
  },
};
