# Function: useIntersectionObserver()

> **useIntersectionObserver**(`elementRef`, `refTrigger`, `observerOptions?`): `boolean`

Defined in: [hooks/useIntersectionObserver/index.ts:16](https://github.com/onyx-og/prismal/blob/243b5e735aadd3de3397d69440c7ae29882b85a1/packages/react/src/hooks/useIntersectionObserver/index.ts#L16)

useIntersectionObserver

## Parameters

### elementRef

`RefObject`\<`HTMLElement` \| `null`\>

A ref to the element to observe.

### refTrigger

`string` \| `number` \| `boolean`

A trigger to re-run the effect when the ref is set.

### observerOptions?

`IntersectionObserverInit` = `...`

Options for the Intersection Observer.

## Returns

`boolean`

True if the element is intersecting, false otherwise.

## Description

A custom hook that uses the Intersection Observer API to detect when an element is in the viewport.

## Example

```ts
const myRef = useRef(null);
const [refSet, setRefSet] = useState(false);
const isVisible = useIntersectionObserver(myRef, refSet);
<div ref={(node) => { myRef.current = node; setRefSet(true); }}>...</div>
```
