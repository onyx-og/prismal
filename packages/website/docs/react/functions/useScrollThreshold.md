# Function: useScrollThreshold()

> **useScrollThreshold**(`threshold`): `boolean`

Defined in: [hooks/useScrollPosition/index.ts:11](https://github.com/onyx-og/prismal/blob/9a285ef7c2a5fc4511a360c2837da1f9e4206acf/packages/react/src/hooks/useScrollPosition/index.ts#L11)

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
