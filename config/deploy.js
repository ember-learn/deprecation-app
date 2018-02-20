/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {}
  };

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    let fastlyDomain = process.env.FASTLY_DOMAIN;
    process.env.API_HOST_URL = `https://${fastlyDomain}`;
    process.env.CDN_URL = `https://${fastlyDomain}/`
  }

  return ENV;
};
