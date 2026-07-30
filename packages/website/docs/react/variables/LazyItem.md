# Variable: LazyItem

> `const` **LazyItem**: `FC`\<`LazyItemProps`\>

Defined in: [components/LazyItem/index.tsx:37](https://github.com/onyx-og/prismal/blob/4fbc5ce1b55f11c076a1a42e3e11304f57a96dd9/packages/react/src/components/LazyItem/index.tsx#L37)

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
