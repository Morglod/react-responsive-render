[![npm package](https://img.shields.io/npm/v/react-responsive-render.svg?style=flat-square)](https://www.npmjs.org/package/react-responsive-render)
# react-responsive-render

React on window or element resize.

```
npm i react-responsive-render
```

* TypeScript support

Components:

* Responsive
* ResponsiveItems [video](https://youtu.be/GqFE9N1pJFc)
* SpaceAround [video](https://www.youtube.com/watch?v=vchfJJxB-9o)

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

Handle element size & position:
```js
<Responsive toElement resizeTimeout={500} trackPosition>
    {({ width, height, left, top }) => (
        <textarea value={`Textarea: ${width} x ${height} Screen: [ ${left}, ${top} ]`} readOnly />
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

Handle space around (eg for dropdown or tooltip):
```js
<SpaceAround
    calcStyle
    item={(status, style) => (
        <span className="tooltip" style={style}>
            This is tooltip for MyButton! {status}
        </span>
    )}
>
    <button children="MyButton" />
</SpaceAround>
```

## `Responsive` props

* `toElement` - Observe element's size (`false` by default).
* `resizeTimeout` - Timeout before update (`63` by default).
* `children` - Node or render function.
* `onChange({ width, height, left?, top? })` - Callback for any changes. `left`, `top` is position from `props.trackPosition` option.
* `trackPosition` - Track position (scroll for window mode / screen position for toElement mode).
* `fast` - `true` by default. If `false`, use `getComputedStyle` to get element's size.
* `immediate` - `false` by default. Update sizes and invoke `onChange` immediate after didMount.

## `ResponsiveItems` props

* `resizeTimeout` - Timeout before update (`63` by default).
* `items` - Array of items.
* `children` - Render function `children({ children, restItems })`.
* `minItemWidth` - Min required width per item (in pixels).
* `immediate` - `false` by default. Update sizes and invoke `onChange` immediate after didMount.

Handle vertical overflow:

* `rows=true` - Flag.
* `minItemHeight` - Min required height per item (in pixels).

## `SpaceAround` props

* `container` - Wrapper (`span` by default).
* `children` - Any children. Will be used as base element.
* `timeout` - Timeout in ms before update (`500` by default).
* `calcStyle` - Calculate styles for `props.item`.
* `item(status: SpaceAroundStatus, style?)` - Movable element renderer.
* `immediate` - `false` by default. Update sizes and invoke `onChange` immediate after didMount.

`SpaceAroundStatus` is one of:
* Top
* Bottom
* LeftTop
* LeftBottom

## TODO

* Storybook [Waiting for bugfix in release](https://github.com/storybooks/storybook/issues/3083)
* Documentation
