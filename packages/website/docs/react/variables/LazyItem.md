# Variable: LazyItem

> `const` **LazyItem**: `FC`\<`LazyItemProps`\>

Defined in: [components/LazyItem/index.tsx:37](https://github.com/onyx-og/prismal/blob/17254afab57ba6cf30b0e7f50b84dce8aff4426c/packages/react/src/components/LazyItem/index.tsx#L37)

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
