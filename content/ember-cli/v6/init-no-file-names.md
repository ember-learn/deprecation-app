---
title: '`init` with file names or globs'
since: 6.8.0
until: 7.0.0
---

Using `ember init package.json` or `ember init app/**` was once added to generate specific files or file structures from the app blueprint. Globbing doesn't work at all anymore and you need to know the specific filename within the classic app blueprint to use this.

This feature was never documented in the `--help` output, but if you find yourself in a situation where you want to re-`init` a specific file for your app, do this instead:

1. Verify that you start with a clean git working tree; otherwise stash or commit any pending changes
2. Run the `ember init` command as usual
3. Use git to remove the files you didn't want to regenerate
