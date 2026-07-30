# Function: useCursorPosition()

> **useCursorPosition**(`containerRef`): `RefObject`\<\{ `x`: `number`; `y`: `number`; \}\>

Defined in: [hooks/useCursor/index.ts:13](https://github.com/onyx-og/prismal/blob/4fbc5ce1b55f11c076a1a42e3e11304f57a96dd9/packages/react/src/hooks/useCursor/index.ts#L13)

useCursorPosition

## Parameters

### containerRef

`RefObject`\<`HTMLElement` \| `null`\>

A ref to the container element.

## Returns

`RefObject`\<\{ `x`: `number`; `y`: `number`; \}\>

A ref object containing the cursor's x and y coordinates.

## Description

A custom hook that tracks the mouse cursor's position relative to a container element.

## Example

```ts
const containerRef = useRef(null);
const cursorPosition = useCursorPosition(containerRef);
// Use cursorPosition.current.x and cursorPosition.current.y
```
