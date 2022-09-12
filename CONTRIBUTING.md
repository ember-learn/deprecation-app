# Contributing

## Writing a new deprecation

If you are interested in writing a new deprecation please create a new markdown file in the appropriate folder in the `content` directory.

The structure of the content directory is `content/<project>/<majorVersion>`. Where `majorVersion` is the version where the deprecation was _introduced_.

TODO: Figure out exactly what to tell people about file names, id's and links.

For guidance on the structure of a deprecation file, please see `deprecation-template.md`.

## Making Your First Pull Request

First-time contributors are encouraged to choose issues that are labeled
"help wanted" or "good for new contributors." If you have questions, want a
suggestion of what to work on, or would like a buddy to pair with, you can
join the #-team-learning channel in the
[Ember Community Discord](https://discordapp.com/invite/zT3asNS).

Fork this repository (click "fork" on the repository's home page in GitHub)

Clone the forked repository with `git clone <your fork's url>` and create a
branch with `git checkout -b some-branch-name`.

As you make commits, reference the issue number in your commit message, such as
`git commit -m "add glasses to nearsighted hamster (#6217)"`

Once you're at the point that you'd like feedback, submit a Pull Request (new
Pull Request button). Choose `master` for the base and your branch name for `compare`,
then submit it!

Your PR will be reviewed by another contributor, and then either merged or have
changes requested.

## Keeping your fork updated

As you tackle new Issues, you'll want to be sure that you always start by working
on the most recent code. To sync up your fork's  `master` with a parent repository's
master, set an upstream and pull from it. For this to work, you should make sure
you're always committing to a branch, not master.

```
git remote add upstream https://github.com/ember-learn/guides-source.git
git checkout master
git pull upstream master
```
