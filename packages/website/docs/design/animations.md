# Animations

Prismal ships motion as plain CSS transitions — no animation runtime, no
extra dependency. Every transition is driven by a small set of shared
tokens, so timing and easing stay consistent across components and can be
re-themed globally, the same way colors can.

## Motion tokens

Defined in [`styles/animations.scss`](https://github.com/onyx-og/prismal/blob/main/packages/react/src/styles/animations.scss)
and exposed as CSS custom properties on `:root`:

| Token | Value | Use for |
| --- | --- | --- |
| `--motion-duration-fast` | `150ms` | micro-interactions (hover, toggle) |
| `--motion-duration-base` | `250ms` | default enter/exit transitions |
| `--motion-duration-slow` | `400ms` | larger surfaces (modals, sidebars) |
| `--motion-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | default easing for most transitions |
| `--motion-ease-bounce` | `cubic-bezier(.47, 1.64, .41, .8)` | playful/bouncy emphasis |
| `--motion-ease-entrance` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | pop/scale entrances |

Override any of them at `:root` (or on a scoped container) to re-theme
motion across the whole library without touching component code:

```css
:root {
  --motion-duration-base: 400ms;
  --motion-ease-standard: ease-in-out;
}
```

## Animation presets

Components that animate content in and out expose an `animation` prop
built on a shared preset vocabulary:

- `fade`
- `slide-up`
- `slide-left`
- `pop-in`
- `none`

Today [`LazyItem`](../react/variables/LazyItem.md) is the component that
implements this pattern — it plays the chosen preset once its children
scroll into view:

```tsx
<LazyItem animation="slide-up">
  <img src="image.jpg" alt="Lazy loaded" />
</LazyItem>
```

Rolling the same `animation` prop and preset classes out to the other
show/hide components (`Modal`, `Dropdown`, `Menu`, `Tooltip`, `Sidebar`,
`Accordion`) is planned — those currently animate with their own
one-off CSS. The motion tokens above are the shared foundation that work
builds on.

## Reduced motion

Respecting `prefers-reduced-motion` is on the roadmap but not yet wired
in globally. Until then, if motion sensitivity matters for your
application, set `animation="none"` on components that support it, or
override the duration tokens to `0ms` in your own stylesheet.
