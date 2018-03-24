[![npm package](https://img.shields.io/npm/v/react-responsive-render.svg?style=flat-square)](https://www.npmjs.org/package/react-responsive-render)
# react-responsive-render

React on window or element resize.

```
npm i react-responsive-render
```

* TypeScript support

## Usage

<a href="https://codepen.io/morglod/project/editor/XovwVo" target="_blank">Live demo</a>

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

Handle overflow:
```js
<ResponsiveItems
    items={buttons}
    minItemWidth={80}
>
    {({ children, restItems }) => (
        <ButtonGroup>
            {children}
            {restItems.length ?
                <DropDownButton
                    label="..."
                    children={restItems}
                /> : null}
        </ButtonGroup>
    )}
</ResponsiveItems>
```

## `Responsive` props

* `toElement` - Observe element's size (`false` by default).
* `resizeTimeout` - Timeout before update (`63` by default).
* `children` - Node or render function.
* `onChange({ width, height })` - Callback for any changes.

## `ResponsiveItems` props

* `resizeTimeout` - Timeout before update (`63` by default).
* `items` - Array of items.
* `children` - Render function `children({ children, restItems })`.
* `minItemWidth` - Min required width per item (in pixels).

Handle vertical overflow:

* `rows=true` - Flag.
* `minItemHeight` - Min required height per item (in pixels).