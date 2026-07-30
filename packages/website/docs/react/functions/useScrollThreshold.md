# Function: useScrollThreshold()

> **useScrollThreshold**(`threshold`): `boolean`

Defined in: [hooks/useScrollPosition/index.ts:11](https://github.com/onyx-og/prismal/blob/4fbc5ce1b55f11c076a1a42e3e11304f57a96dd9/packages/react/src/hooks/useScrollPosition/index.ts#L11)

useScrollThreshold

## Parameters

### threshold

`number`

The vertical scroll position in pixels to trigger the state update.

## Returns

`boolean`

True if the scroll position is at or past the threshold, false otherwise.

## Description

Custom hook to check if the user has scrolled past a specific position.

## Example

```ts
const isScrolled = useScrollThreshold(100);
```
