import showdown from 'showdown';

export function initialize() {
  showdown.subParser('ellipsis', function (text, options, globals) {
    text = globals.converter._dispatch(
      'ellipsis.before',
      text,
      options,
      globals
    );
    text = globals.converter._dispatch(
      'ellipsis.after',
      text,
      options,
      globals
    );
    return text;
  });

  // Based on: https://github.com/showdownjs/showdown/issues/573
  showdown.extension('no-wrapper', function () {
    return [
      {
        type: 'output',
        filter: function (text) {
          // remove wrapping paragraph
          return text.replace(/<\/?p[^>]*>/g, '');
        },
      },
    ];
  });
}

export default {
  name: 'register-showdown-extensions',
  initialize,
};
