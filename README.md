# react-responsive-render

React on window or element resize.

```
npm i react-responsive-render
```

* TypeScript support

## Example

[Live demo](https://codepen.io/morglod/project/editor/XovwVo)

```js
import { Responsive } from './react-responsive-render';

<Responsive>
    {({ width, height }) => (
        <div>
            Window: {width} x {height}
        </div>
    )}
</Responsive>

<Responsive toElement resizeTimeout={500}>
    {({ width, height }) => (
        <textarea value={`Textarea: ${width} x ${height}`} readOnly />
    )}
</Responsive>

<Responsive toElement onChange={callback}>
    <Smth />
</Responsive>
```

## props

* `toElement` - Observe element's size (`false` by default).
* `resizeTimeout` - Timeout before update (`63` by default).
* `children` - Node or render function.
* `onChange({ width, height })` - Callback for any changes.