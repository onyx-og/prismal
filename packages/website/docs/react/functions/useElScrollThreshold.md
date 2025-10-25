# Function: useElScrollThreshold()

> **useElScrollThreshold**(`elementRef`, `refTrigger`, `offset?`, `threshold?`, `scrollEl?`): `boolean`

Defined in: [hooks/useScrollPosition/index.ts:50](https://github.com/onyx-og/prismal/blob/7e948b825c73ffc9bb10fe5a1890783eb7215c77/packages/react/src/hooks/useScrollPosition/index.ts#L50)

useElScrollThreshold

## Parameters

### elementRef

`RefObject`\<`null` \| `HTMLElement`\>

Ref to the element to track.

### refTrigger

A trigger to re-run the effect when the ref is set.

`string` | `number` | `boolean`

### offset?

`number` = `0`

An offset to apply to the element's position.

### threshold?

`number` = `0`

The scroll threshold from the top of the viewport.

### scrollEl?

The element to attach the scroll listener to.

`HTMLElement` | `Document`

## Returns

`boolean`

True if the element has scrolled past the threshold.

## Description

Tracks if an element has scrolled past a certain threshold in the viewport.

## Example

```ts
const myRef = useRef(null);
const [refSet, setRefSet] = useState(false);
const isPast = useElScrollThreshold(myRef, refSet, 50);
```
