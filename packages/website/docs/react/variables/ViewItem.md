# Variable: ViewItem

> `const` **ViewItem**: `FC`\<`ViewItemProps`\>

Defined in: [components/View/ViewItem.tsx:103](https://github.com/onyx-og/prismal/blob/243b5e735aadd3de3397d69440c7ae29882b85a1/packages/react/src/components/View/ViewItem.tsx#L103)

## Component

ViewItem

## Description

A single placed cell inside a View. Anchors at its hook address and
extends toward the bottom-right, either to its content or to an explicit span.
When a breakpoint's grid is narrower than the one the address was authored against,
the item reflows itself according to the View's policy — unless the address was
authored for that breakpoint specifically, in which case it is left alone.

## Param

**props**

The component props.

## Returns

The rendered ViewItem component.

## Example

```ts
<ViewItem at="A2" width={2}>
  <Card>Spans A2:B2</Card>
</ViewItem>

// An overlay hugging the top-right corner of the whole View, sitting above
// the card beneath it and letting clicks through everywhere except the badge.
// reflow="none" keeps it pinned to the corner at every width.
<ViewItem at="A1" width={12} height={8} layer={1} reflow="none"
          justify="end" align="start" pointerEvents="content">
  <Badge>New</Badge>
</ViewItem>
```
