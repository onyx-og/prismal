# Function: useElementWidth()

> **useElementWidth**(`ref`): `number`

Defined in: [hooks/useElementWidth/index.tsx:13](https://github.com/onyx-og/prismal/blob/7e948b825c73ffc9bb10fe5a1890783eb7215c77/packages/react/src/hooks/useElementWidth/index.tsx#L13)

useElementWidth

## Parameters

### ref

`RefObject`\<`undefined` \| `null` \| `HTMLElement`\>

A ref to the element to measure.

## Returns

`number`

The current width of the element.

## Description

A custom hook that tracks the width of a DOM element, updating on resize and content changes.

## Example

```ts
const myRef = useRef(null);
const width = useElementWidth(myRef);
<div ref={myRef}>Width is {width}px</div>
```
