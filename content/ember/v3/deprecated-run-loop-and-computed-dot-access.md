---
id: deprecated-run-loop-and-computed-dot-access
title: Run loop and computed dot access
until: '4.0.0'
since: '3.27.0'
---

Using `.` to access computed or run loop functions has been deprecated, such
as `computed.filter`.
Instead, import the value directly from the module:

```js
import { filter } from '@ember/object/computed';
```

---

Here is the complete list of deprecated functions from `computed`:

`computed.alias`,
`computed.and`,
`computed.bool`,
`computed.collect`,
`computed.deprecatingAlias`,
`computed.empty`,
`computed.equal`,
`computed.filterBy`,
`computed.filter`,
`computed.gte`,
`computed.gt`,
`computed.intersect`,
`computed.lte`,
`computed.lt`,
`computed.mapBy`,
`computed.map`,
`computed.match`,
`computed.max`,
`computed.min`,
`computed.none`,
`computed.notEmpty`,
`computed.not`,
`computed.oneWay`,
`computed.oneWay`,
`computed.or`,
`computed.readOnly`,
`computed.setDiff`,
`computed.sort`,
`computed.sum`,
`computed.union`,
`computed.uniqBy`,
`computed.uniq`.

And here is the complete list of deprecated funcitons from `run`:

`run.backburner`,
`run.begin`,
`run.bind`,
`run.cancel`,
`run.debounce`,
`run.end`,
`run.hasScheduledTimers`,
`run.join`,
`run.later`,
`run.next`,
`run.once`,
`run.schedule`,
`run.scheduleOnce`,
`run.throttle`,
`run.cancelTimers`.
