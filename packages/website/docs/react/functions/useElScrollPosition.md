# Function: useElScrollPosition()

> **useElScrollPosition**(`elementRef`, `refTrigger`, `scrollEl?`): `undefined` \| `number`

Defined in: [hooks/useScrollPosition/index.ts:99](https://github.com/onyx-og/prismal/blob/7e948b825c73ffc9bb10fe5a1890783eb7215c77/packages/react/src/hooks/useScrollPosition/index.ts#L99)

useElScrollPosition

## Parameters

### elementRef

`RefObject`\<`null` \| `HTMLElement`\>

Ref to the element to track.

### refTrigger

A trigger to re-run the effect when the ref is set.

`string` | `number` | `boolean`

### scrollEl?

The element to attach the scroll listener to.

`HTMLElement` | `Document`

## Returns

`undefined` \| `number`

The vertical scroll position of the element.

## Description

Tracks the vertical scroll position of an element relative to the viewport.

## Example

```ts
const myRef = useRef(null);
const [refSet, setRefSet] = useState(false);
const position = useElScrollPosition(myRef, refSet);
```
