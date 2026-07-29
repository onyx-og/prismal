# Function: useCursorPosition()

> **useCursorPosition**(`containerRef`): `RefObject`\<\{ `x`: `number`; `y`: `number`; \}\>

Defined in: [hooks/useCursor/index.ts:13](https://github.com/onyx-og/prismal/blob/243b5e735aadd3de3397d69440c7ae29882b85a1/packages/react/src/hooks/useCursor/index.ts#L13)

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
