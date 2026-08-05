# Function: useElementHeight()

> **useElementHeight**(`ref`): `number`

Defined in: [hooks/useElementHeight/index.tsx:13](https://github.com/onyx-og/prismal/blob/17254afab57ba6cf30b0e7f50b84dce8aff4426c/packages/react/src/hooks/useElementHeight/index.tsx#L13)

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
