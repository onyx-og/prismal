# Function: hex2rgba()

> **hex2rgba**(`hex`, `alpha?`): `undefined` \| `string`

Defined in: [utils/colors/index.ts:53](https://github.com/onyx-og/prismal/blob/7e948b825c73ffc9bb10fe5a1890783eb7215c77/packages/react/src/utils/colors/index.ts#L53)

hex2rgba

## Parameters

### hex

`string`

The hex color code (e.g., '#fff' or '#ffffff').

### alpha?

`number`

An optional alpha value (0-1).

## Returns

`undefined` \| `string`

The rgba or rgb string, or undefined if the hex is invalid.

## Description

Converts a 3 or 6-digit hex color code to an rgba or rgb string.

## Example

```ts
hex2rgba('#fff', 0.5) // 'rgba(255, 255, 255, 0.5)'
```
