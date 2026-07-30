# Function: hex2rgba()

> **hex2rgba**(`hex`, `alpha?`): `string` \| `undefined`

Defined in: [utils/colors/index.ts:53](https://github.com/onyx-og/prismal/blob/4fbc5ce1b55f11c076a1a42e3e11304f57a96dd9/packages/react/src/utils/colors/index.ts#L53)

hex2rgba

## Parameters

### hex

`string`

The hex color code (e.g., '#fff' or '#ffffff').

### alpha?

`number`

An optional alpha value (0-1).

## Returns

`string` \| `undefined`

The rgba or rgb string, or undefined if the hex is invalid.

## Description

Converts a 3 or 6-digit hex color code to an rgba or rgb string.

## Example

```ts
hex2rgba('#fff', 0.5) // 'rgba(255, 255, 255, 0.5)'
```
