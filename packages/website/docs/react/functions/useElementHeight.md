# Function: useElementHeight()

> **useElementHeight**(`ref`): `number`

Defined in: [hooks/useElementHeight/index.tsx:13](https://github.com/onyx-og/prismal/blob/9a285ef7c2a5fc4511a360c2837da1f9e4206acf/packages/react/src/hooks/useElementHeight/index.tsx#L13)

useElementHeight

## Parameters

### ref

`RefObject`\<`HTMLElement`\>

A ref to the element to measure.

## Returns

`number`

The current height of the element.

## Description

A custom hook that tracks the height of a DOM element, updating on resize and content changes.

## Example

```ts
const myRef = useRef(null);
const height = useElementHeight(myRef);
<div ref={myRef}>Height is {height}px</div>
```
