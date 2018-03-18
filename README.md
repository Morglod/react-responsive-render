# react-responsive-render

React on window or element resize.

```
npm i react-responsive-render
```

* TypeScript support

## Usage

[Live demo](https://codepen.io/morglod/project/editor/XovwVo)

```js
import { Responsive } from 'react-responsive-render';
```

Handle window resize:
```js
<Responsive>
    {({ width, height }) => (
        <div>
            Window: {width} x {height}
        </div>
    )}
</Responsive>
```

Handle element resize:
```js
<Responsive toElement resizeTimeout={500}>
    {({ width, height }) => (
        <textarea value={`Textarea: ${width} x ${height}`} readOnly />
    )}
</Responsive>
```

Use callback instead of render function:
```js
<Responsive toElement onChange={callback}>
    <Smth />
</Responsive>
```

## props

* `toElement` - Observe element's size (`false` by default).
* `resizeTimeout` - Timeout before update (`63` by default).
* `children` - Node or render function.
* `onChange({ width, height })` - Callback for any changes.
