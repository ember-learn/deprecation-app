const mocha = require('mocha');
const inherits = require('util').inherits;
const Base = mocha.reporters.Base;

// The built-in "min" reporter assumes you are in watch mode and annoyingly
// clears the screen when starting. This is just the "min" reporter without the
// screen clearing.
function QuietPlease(runner) {
  Base.call(this, runner);
  runner.once('end', this.epilogue.bind(this));
}

inherits(QuietPlease, Base);
exports = module.exports = QuietPlease;
