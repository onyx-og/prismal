# Variable: LazyItem

> `const` **LazyItem**: `FC`\<`LazyItemProps`\>

Defined in: [components/LazyItem/index.tsx:37](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/components/LazyItem/index.tsx#L37)

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
