# Variable: View

> `const` **View**: `FC`\<`ViewProps`\>

Defined in: [components/View/index.tsx:83](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/components/View/index.tsx#L83)

## Component

View

## Description

A grid container whose children are restricted to ViewItem. Cells are
described either uniformly (columns/rows plus cellWidth/cellHeight) or per-cell via a
matrix; items hook to a spreadsheet address and extend toward the bottom-right.
Items may claim overlapping areas — ordering is DOM order by default, or explicit
via each item's `layer` prop — so a View works as a layered canvas, not only a tiling.

## Param

**props**

The component props.

## Returns

The rendered View component.

## Example

```ts
// A card inset from the edges, with a control pinned over its bottom-right corner.
<View columns={12} rows={8} cellWidth="1fr" cellHeight="1fr">
  <ViewItem at="B2" width={10} height={6} layer={0}>
    <Card>Base layer</Card>
  </ViewItem>
  <ViewItem at="J6" width={3} height={2} layer={1}
            justify="end" align="end" offset={{ x: 1, y: 1 }}>
    <Button>Straddles the edge</Button>
  </ViewItem>
</View>
```
