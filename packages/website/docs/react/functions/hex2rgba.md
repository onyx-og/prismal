# Function: hex2rgba()

> **hex2rgba**(`hex`, `alpha?`): `string` \| `undefined`

Defined in: [utils/colors/index.ts:53](https://github.com/onyx-og/prismal/blob/243b5e735aadd3de3397d69440c7ae29882b85a1/packages/react/src/utils/colors/index.ts#L53)

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
