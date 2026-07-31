# Function: useElScrollPosition()

> **useElScrollPosition**(`elementRef`, `refTrigger`, `scrollEl?`): `number` \| `undefined`

Defined in: [hooks/useScrollPosition/index.ts:99](https://github.com/onyx-og/prismal/blob/22083a37c54803b3bac61332c2b8b20207a5d1cf/packages/react/src/hooks/useScrollPosition/index.ts#L99)

useElScrollPosition

## Parameters

### elementRef

`RefObject`\<`HTMLElement` \| `null`\>

Ref to the element to track.

### refTrigger

`string` \| `number` \| `boolean`

A trigger to re-run the effect when the ref is set.

### scrollEl?

`HTMLElement` \| `Document`

The element to attach the scroll listener to.

## Returns

`number` \| `undefined`

The vertical scroll position of the element.

## Description

Tracks the vertical scroll position of an element relative to the viewport.

## Example

```ts
const myRef = useRef(null);
const [refSet, setRefSet] = useState(false);
const position = useElScrollPosition(myRef, refSet);
```
