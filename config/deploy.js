/* jshint node: true */

let credentials;

try {
  credentials = require('./credentials.json');
} catch (e) {
  credentials = {};
}

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      environment: "production"
    },
    pipeline: {
      // This setting runs the ember-cli-deploy activation hooks on every deploy
      // which is necessary in order to run ember-cli-deploy-cloudfront.
      // To disable CloudFront invalidation, remove this setting or change it to `false`.
      // To disable ember-cli-deploy-cloudfront for only a particular environment, add
      // `ENV.pipeline.activateOnDeploy = false` to an environment conditional below.
      activateOnDeploy: true
    },
    "revision-data": {
      "type": "version-commit"
    },
    s3: {
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,json,html}',
    },
    's3-index': {
      allowOverwrite: true
    },
  };

  if (deployTarget === 'production') {

    const bucket = 'emberdeprecationsapp.stonecircle.io';
    const region = 'eu-west-1'

    ENV.s3.accessKeyId = credentials.key || process.env.AWS_KEY;
    ENV.s3.secretAccessKey = credentials.secret || process.env.AWS_SECRET;
    ENV.s3.bucket = bucket;
    ENV.s3.region = region;
    ENV["s3-index"].accessKeyId = credentials.key || process.env.AWS_KEY;
    ENV["s3-index"].secretAccessKey = credentials.secret || process.env.AWS_SECRET;
    ENV["s3-index"].bucket = bucket;
    ENV["s3-index"].region = region;
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
