# View / ViewItem — design notes

## What I matched from the existing library

Read `Container/index.tsx` and `LazyItem/index.tsx` at `7e948b8`. The conventions
carried over:

- `extends ComponentProps` from `../Component`; destructure `"data-id"`, `className`,
  `style`, `accent`/`accentLight`/`accentDark`
- `setAccentStyle(style_, {accent, accentLight, accentDark})` then spread `style` last
- responsive props typed as `T | { xs?, sm?, md?, lg?, xl? }`, same as `span`/`ratio`/`hide`
- `prismal-` class prefix, className assembled in a `useMemo`
- colocated `./index.scss`, JSDoc blocks with `@component` / `@description` / `@example`
  so typedoc picks them up for the docs site

Two deliberate departures:

1. **Container builds class names; View builds custom properties.** `prismal-span-md-6`
   works because spans are a small fixed set. Cell sizes are arbitrary, so a class per
   value isn't possible. View writes `--prismal-view-cols-md` etc. and `index.scss`
   assembles the fallback chain. Same responsive semantics, no JS breakpoint detection,
   and SSR output already carries every breakpoint.
2. **View doesn't render `<Cursor>`.** Container does; that seemed specific to Container's
   role rather than something every container should inherit. Easy to add if you disagree.

## The four requirements

| Ask | Prop |
| --- | --- |
| cell width/height in responsive units | `cellWidth` / `cellHeight`, each `Responsive<number \| string>` |
| matrix for per-cell size | `matrix: Responsive<ViewCellSize[][]>`, `matrix[row][col]` |
| per-item width/height override | `ViewItem.width` / `ViewItem.height`, span in cells |
| hook position `"A2"` extending bottom-right | `ViewItem.at`, default `width`/`height` of `"auto"` |
| overlapping items / layered canvas | `ViewItem.layer`, `align`, `justify`, `offset`, `pointerEvents` |

Numbers multiply the `unit` prop (default `1rem`), so `cellWidth={8}` is 8rem and the
whole grid rescales from one place. Strings pass through raw, so `"1fr"`,
`"minmax(0, 1fr)"`, and `"12vw"` all work.

## Auto grid configuration

`columns` now does double duty, and which one you get depends on its shape:

```jsx
<View columns={12} autoScale />                 // base 12 -> xs 4, sm 6, md 8, lg 12, xl 12
<View columns={12} autoScale={{ xs: 0.25 }} />  // same ladder, xs overridden to 3
<View columns={{ xs: 2, md: 4, lg: 6 }} />      // fully explicit; autoScale ignored
```

A flat number is a *base* count — the width you designed against — and `autoScale` derives
the rest as fractions of it (`1/3, 1/2, 2/3, 1, 1`). Those defaults land a 12-column base on
4 / 6 / 8 / 12 / 12, which is the degradation an author of a 12-column layout already has in
their head. A per-breakpoint object means you've done the work yourself and nothing is
derived. A `matrix` outranks both, since it states the column count outright.

Whichever route, the counts are resolved once in View and shared through context. Items
must reflow against the same numbers the tracks were built from, so there's exactly one
source of truth rather than each item recomputing.

## Reflow

An item at `"F1"` in a grid that's 4 wide has no column 6. Left alone, grid invents an
implicit one and the View overflows. `reflow` on View (overridable per item) decides
what happens instead:

| Mode | Behaviour | Use when |
| --- | --- | --- |
| `"none"` | Leave it; implicit tracks, overflow | Item is pinned deliberately — corner overlays |
| `"clamp"` *(default)* | Slide left until it fits, keep the row | Preserving vertical rhythm matters |
| `"wrap"` | Renumber cells linearly, re-derive the address | Reading order matters more than composition |
| `"transpose"` | Swap column and row, then clamp | Reads wide on desktop, tall on mobile |
| `"stack"` | Abandon the address, auto-place full width | Below a certain width the design is a list |

Three rules keep this from firing when it shouldn't:

**It only triggers where the grid is narrower than `baseColumns`.** At the design width and
above, nothing moves — including placements that were already out of bounds. If you write a
span-6 item at column 12 of a 12-column grid, that's your layout, and silently correcting it
at the width you authored it for would be worse than letting it overflow.

**An address authored *for* a breakpoint is never second-guessed.** `at={{ xs: "A3", lg: "F1" }}`
means both, and reflow leaves each alone. Only inherited addresses get rescued.

**A flat address counts as inherited everywhere.** This one is subtle and I got it wrong
first: `toBreakpointMap` files a flat value under `xs`, because that's how the min-width
cascade propagates it upward. But `at="F1"` doesn't mean "F1 on mobile" — it means "F1 in
the layout I designed", at the base width. Reading it as authored-for-xs exempted it from
reflow at exactly the breakpoints that need it, which is to say reflow silently did nothing
in the most common usage. `isFlatResponsive` is what distinguishes the two.

`wrap` has one property the others don't: it's a *global* renumbering, so it must remap
every item, including ones that individually still fit. Skipping those would leave them on
their original rows while their neighbours moved down, and they'd collide. Tested against a
full 12x3 layout for collision-freedom and order preservation.

### Interaction with layering

Reflow and overlap pull against each other, and this is the part to be deliberate about.
`wrap` renumbers items into a linear sequence, which is precisely what destroys a layered
composition — the badge that sat over the card's corner becomes the cell after it. So:

- give the base element a reflow policy (`"clamp"` usually)
- give pinned overlays `reflow="none"` and let `align`/`justify` keep them on their edge,
  since edge-relative placement doesn't care how many columns there are
- or drop the overlay below the base at small widths with a responsive `layer`

The corner-overlay example above uses `reflow="none"` for exactly this reason.

`grid-auto-rows` is now wired to the cell height per breakpoint, so items that `wrap` past
the declared row count land in implicit rows of the same height rather than collapsed ones.


## Layering

Grid already lets two items claim the same area — nothing had to be unlocked. What was
missing was the vocabulary to make the result deliberate. Four props:

- **`layer`** — `Responsive<number>`, becomes `z-index`. Defaults to `auto`, so items with
  no layer paint in DOM order and the common case needs no props at all. Being responsive
  matters more than it first looks: a badge that overlays a card at `lg` can drop to a
  layer below it and reflow into its own row at `xs`, from one declaration.
- **`align` / `justify`** — where the item sits inside the area it claimed. This is what
  puts something *on* an edge. An overlay spanning the full View with
  `justify="end" align="start"` pins to the top-right corner without any address
  arithmetic, and stays pinned when the track count changes at another breakpoint.
- **`offset`** — a post-placement nudge, applied as `translate`. Because it's a transform
  it doesn't disturb track sizing or anyone else's placement, which is exactly what you
  want for an element deliberately straddling an edge rather than respecting it.

Your scenario reads directly:

```jsx
<View columns={12} rows={8} cellWidth="1fr" cellHeight="1fr">
  <ViewItem at="B2" width={10} height={6} layer={0}>
    <Card>Base — inset a full cell from every edge</Card>
  </ViewItem>

  <ViewItem at="A1" width={12} height={8} layer={1}
            justify="start" align="start" pointerEvents="content">
    <Tag>Top-left, over the card</Tag>
  </ViewItem>

  <ViewItem at="J6" width={3} height={2} layer={2}
            justify="end" align="end" offset={{ x: 1, y: 1 }}>
    <Button>Straddles the bottom-right corner</Button>
  </ViewItem>
</View>
```

Two things this needed beyond z-index, both of which bite immediately otherwise:

**`isolation: isolate` on the View root.** Without it, item z-indexes compete with the rest
of the page. A View sitting low in the document could punch an overlay through a sticky
header or a Modal. Isolating makes the layer numbers mean "within this View" — which is the
only thing an author writing `layer={2}` could reasonably intend.

**`pointerEvents="content"`.** The second item above spans the entire View to place one tag
in a corner. Its box therefore covers the card completely and eats every click. `"content"`
makes the wrapper transparent to the pointer and its children opaque again, so empty space
passes through and the tag stays interactive. This is the failure mode people will hit
first, and it's silent — worth putting in the docs example rather than the troubleshooting
section.

One interaction to know: `dense` only backfills *unhooked* items, and hooked items still
occupy cells for auto-placement purposes. If you want an overlay to auto-place *over*
existing content rather than after it, give it an explicit `at`.

## Two caveats worth knowing before you merge

**A matrix cannot be honoured cell-by-cell.** CSS Grid sizes *tracks*, not cells — a
column is one width for its whole height. `resolveTracks` collapses each column to the
widest cell in it and each row to the tallest, using arithmetic max for numbers and CSS
`max()` for mixed units. `fr` values can't go inside `max()`, so if a column mixes `fr`
with fixed sizes the largest `fr` wins outright. That's in `largestTrack()` and it's the
one place the API promises slightly more than CSS delivers. Worth saying so in the docs
rather than letting people discover it.

**"Extends toward the bottom-right for the content size" needs measurement.** Grid has no
"grow until the content fits" keyword. `width="auto"` renders the content at `max-content`,
measures it with a `ResizeObserver`, and solves `n·cell + (n−1)·gap ≥ natural` for the
smallest whole `n`. `max-content` doesn't depend on the container, so widening the span
can't feed back into the measurement — no oscillation. The cost is one layout pass before
the span settles; pass explicit `width`/`height` on anything above the fold.

`View` reads its own used track sizes back out of `getComputedStyle` and publishes them
through context, so items never have to know which breakpoint is active.

## Child restriction

`isViewItem` checks a static marker (`ViewItem.__prismalViewItem`), not
`child.type === ViewItem`. Identity checks break when two copies of `@prismal/react` end
up in one bundle — which is exactly what happens when a WordPress theme enqueues the
library and a plugin bundles its own. Non-ViewItem children are dropped with a dev warning.

## Gutenberg wiring

`blocks/view/block.json`:

```json
{
  "apiVersion": 3,
  "name": "prismal/view",
  "title": "View",
  "category": "design",
  "supports": { "html": false, "align": ["wide", "full"] },
  "attributes": {
    "columns": { "type": "number", "default": 12 },
    "autoScale": { "type": "boolean", "default": true },
    "baseColumns": { "type": "number" },
    "reflow": { "type": "string", "default": "clamp" },
    "rows":    { "type": "object" },
    "cellWidth":  { "type": "object", "default": { "xs": "1fr" } },
    "cellHeight": { "type": "object", "default": { "xs": 8 } },
    "matrix": { "type": "array" },
    "unit": { "type": "string", "default": "1rem" },
    "gap": { "type": "object", "default": { "xs": 0.5 } }
  }
}
```

`blocks/view-item/block.json` — `"parent": ["prismal/view"]` is what stops the item from
being insertable anywhere else, and mirrors the React-side restriction:

```json
{
  "apiVersion": 3,
  "name": "prismal/view-item",
  "title": "View Item",
  "parent": ["prismal/view"],
  "supports": { "html": false, "reusable": false },
  "attributes": {
    "at": { "type": "object" },
    "width": { "type": "object", "default": { "xs": "auto" } },
    "height": { "type": "object", "default": { "xs": "auto" } },
    "layer": { "type": "object" },
    "justify": { "type": "object" },
    "align": { "type": "object" },
    "offset": { "type": "object" },
    "reflow": { "type": "string" },
    "pointerEvents": { "type": "string", "default": "auto" },
    "clip": { "type": "boolean", "default": false }
  }
}
```

Editor `edit.js` for View, in outline:

```js
const blockProps = useBlockProps( { className: 'prismal-view', style } );
const innerProps = useInnerBlocksProps( blockProps, {
    allowedBlocks: [ 'prismal/view-item' ],
    orientation: 'horizontal',
    renderAppender: InnerBlocks.ButtonBlockAppender,
} );
```

`allowedBlocks` plus `parent` gives you the same contract on both sides, so the editor
can't produce a tree the React renderer would silently drop.

### Editor UX

The address model earns its keep here. Three things worth building, in order of payoff:

1. **Grid overlay.** Render the same track definition as an absolutely-positioned
   `::before` layer of empty cells, each labelled `A1`, `B1`, … Set it on
   `.is-selected`/`.has-child-selected` only, so it appears while editing and vanishes in
   preview. This makes the whole model legible without any documentation.
2. **Click-to-place.** Selecting an empty overlay cell sets `at` on the newly inserted
   item. Much better than typing `"C3"` into a text control, and `formatAddress(col, row)`
   in `utils.ts` gives you the string from the coordinates you already have.
3. **Layer inspector, not a collision warning.** My earlier suggestion of outlining
   overlapping items was wrong now that overlap is a feature — it would fire constantly on
   correct layouts. What's actually useful is a small stack list in the sidebar showing
   items at the selected address ordered by effective layer, with drag-to-reorder writing
   back to `layer`. Selecting an entry selects the block. That turns "which thing is on
   top" from something you discover by clicking into something you can see.

   The one case still worth flagging: two items sharing an area where *neither* declares a
   `layer`. That's ambiguous ordering resolved by DOM order, which a block editor can
   reshuffle. Prompt for an explicit layer there and nowhere else.

Because the layout is driven by custom properties on the wrapper and nothing else, the
editor canvas and the front end render from identical CSS — the usual source of
editor/front-end drift doesn't apply here.

### PHP render callback

For the dynamic path, `render.php` only needs to emit the same custom properties. Keep the
address→line-number arithmetic in one place: a small PHP port of `parseAddress` (bijective
base-26 for the letters, integer for the digits) that you unit-test against the TS version.
