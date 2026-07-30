# Function: useElScrollThreshold()

> **useElScrollThreshold**(`elementRef`, `refTrigger`, `offset?`, `threshold?`, `scrollEl?`): `boolean`

Defined in: [hooks/useScrollPosition/index.ts:50](https://github.com/onyx-og/prismal/blob/4fbc5ce1b55f11c076a1a42e3e11304f57a96dd9/packages/react/src/hooks/useScrollPosition/index.ts#L50)

useElScrollThreshold

## Parameters

### elementRef

`RefObject`\<`HTMLElement` \| `null`\>

Ref to the element to track.

### refTrigger

`string` \| `number` \| `boolean`

A trigger to re-run the effect when the ref is set.

### offset?

`number` = `0`

An offset to apply to the element's position.

### threshold?

`number` = `0`

The scroll threshold from the top of the viewport.

### scrollEl?

`HTMLElement` \| `Document`

The element to attach the scroll listener to.

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
