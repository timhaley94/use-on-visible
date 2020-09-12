# use-on-visible

> A React hook that fires a callback when an element becomes visible

[![NPM](https://img.shields.io/npm/v/use-on-visible.svg)](https://www.npmjs.com/package/use-on-visible)

## Install

```bash
npm install --save use-on-visible
```

## Summary

`useOnVisible` accepts a [ref](https://reactjs.org/docs/hooks-reference.html#useref)
which points to an element, a callback which fires once each time the element becomes
visible, and an array of dependecies, similar to what you would pass to
[useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect). This dependecy
list required to keep the hook performant and avoid infinite loops.

## Usage

A simple example:

```jsx
import React, { useRef } from 'react';
import useOnVisible from 'use-on-visible';

function Foo() {
  const ref = useRef(null);
  useOnVisible(ref, () => console.log('visible!'), []);

  return <p ref={ ref }>Hello, world!</p>;
}
```

A callback with dependencies:

```jsx
import React, { useRef, useState } from 'react';
import useOnVisible from 'use-on-visible';

function Foo() {
  const ref = useRef();
  const [count, setState] = useState(0);

  useOnVisible(
    ref,
    () => setState(count + 1),
    [count, setState],
  );

  return (
    <div>
      <p ref={ ref }>Hello, world!</p>
      <p>Count: { count }</p>
    </div>
  );
}
```

## License

MIT © [timhaley94](https://github.com/timhaley94)
