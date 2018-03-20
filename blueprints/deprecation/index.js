/* eslint-env node */
module.exports = {
  description: 'Generate a new deprecation file',

  locals(options) {
    // Return custom template variables here.
    return {
      name: extractDeprecationId(options.entity.name)
    };
  }
};

function extractDeprecationId(path) {
  var pathParts = path.split('/')
  var name = pathParts[pathParts.length - 1].split('.')[0]

  return name;
}
