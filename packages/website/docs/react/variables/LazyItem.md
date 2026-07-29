# Variable: LazyItem

> `const` **LazyItem**: `FC`\<`LazyItemProps`\>

Defined in: [components/LazyItem/index.tsx:37](https://github.com/onyx-og/prismal/blob/9a285ef7c2a5fc4511a360c2837da1f9e4206acf/packages/react/src/components/LazyItem/index.tsx#L37)

## Component

LazyItem

## Description

A component that lazy-loads its children when it scrolls into the viewport, with an optional animation.

## Param

**props**

The component props.

## Returns

The rendered LazyItem component.

## Example

```ts
<LazyItem animation="slide-up">
  <img src="image.jpg" alt="Lazy loaded" />
</LazyItem>
```
