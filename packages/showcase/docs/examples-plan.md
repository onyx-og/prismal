# Plan: "Examples" showcase — full application UIs built from @prismal/react

Status: **planning only, no implementation yet**. Written so a future session can execute
directly without re-deriving conventions or component APIs. Decisions below were confirmed
with the user on 2026-07-28; don't re-litigate them without a reason.

## Confirmed decisions

1. **Where it lives**: new Storybook sidebar group `Examples/*`, sibling to the existing
   `Commons/*` group (see "Commons/Card" etc. in every current `stories.tsx`).
2. **Interactivity**: fully interactive — real `useState`/handlers, not static mockups.
   Todo items actually toggle/add/delete, shop filters actually filter, cart actually
   accumulates, etc.
3. **Scope**: build all five apps in one pass:
   - Todo app
   - Recipe library
   - Ecommerce shop archive
   - Landing page
   - Admin dashboard
4. Session was approaching its limit when this plan was written — **this doc exists so
   implementation can start cold in a new session.** Read it fully before writing code.

## Why file placement matters

Storybook's story glob (`packages/showcase/.storybook/main.ts`) is:
```
"../src/components/**/stories.mdx",
"../src/components/**/stories.@(js|jsx|ts|tsx)",
"../src/components/**/*.stories.@(js|jsx|ts|tsx)"
```
It only scans under `src/components/**`. To avoid touching Storybook config, **place the
example apps under `src/components/Examples/<AppName>/`**, not a sibling `src/examples/`
folder. Each app's `stories.tsx` sets `meta.title = 'Examples/<App Name>'`, which is what
actually produces the sidebar grouping — the folder name matching "Examples" is not required
for that, but keeping it consistent (`Examples/TodoApp/`) makes the two agree.

## Directory layout (per app)

Mirror the one non-trivial existing pattern (`Card` has `stories.tsx` + `stories.scss`;
`Text` has `stories.jsx` + a narrative `stories.mdx` that imports the stories and wraps them
in `<Canvas of={...}/>`). For an example app, that's not enough — each app needs local
subcomponents and mock data that aren't part of the story file itself. Proposed layout:

```
src/components/Examples/TodoApp/
  stories.tsx        # meta (title: 'Examples/Todo App') + the Default story (mounts <TodoApp/>)
  stories.scss       # layout-only CSS (grid areas, spacing) — component visuals come from @prismal/react
  TodoApp.tsx         # the actual composed app component, default-exported, imported by stories.tsx
  mock.ts             # typed sample data (seed todos, etc.)
  components/         # local, app-only subcomponents built FROM @prismal/react primitives
    TodoItem.tsx       #   e.g. one row = Card + Toggle + Text + Button
```

Rationale for splitting `TodoApp.tsx` out of `stories.tsx`: Storybook's `args`-based Story
objects (`export const Default: Story = { args: {...} }`) don't compose well with internal
`useState` — the existing stories are all presentational components that take props directly.
An "app" is a stateful root component with no meaningful props, so the story is just:

```tsx
import { Meta, StoryObj } from '@storybook/react';
import TodoApp from './TodoApp';
import './stories.scss';

const meta = { title: 'Examples/Todo App', component: TodoApp } as Meta<typeof TodoApp>;
type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {};
```

Every app follows this same shape. Do this once for `TodoApp`, confirm it renders correctly
in Storybook, *then* replicate the pattern for the other four — don't parallelize until the
pattern is validated, since a mistake here repeats five times.

Optional (nice-to-have, skip if time-constrained): a `stories.mdx` per app with a couple of
paragraphs of prose above the `<Canvas of={ExamplesTodoApp.Default}/>`, same pattern as
`Text/stories.mdx`. Not required for the group to work — `.tsx` alone renders fine.

## Shared conventions across all five apps

- **No new dependencies.** Everything is built from the existing `@prismal/react` export
  surface (list below) plus local layout SCSS. Do not reach for a router, state library, or
  date library — plain `useState`/`useMemo` and native `Date`/`Array` methods are enough for
  showcase purposes.
- **Images**: there's no image CDN or asset pipeline set up for this. Use CSS gradients /
  solid `background-color` blocks with an `Icon` centered on top as photo placeholders
  (existing components already do this kind of thing — check `Masonry`/`List` stories for
  precedent) rather than pulling remote URLs.
- **Icons**: `Icon` renders `<i class="prismal-icon icon-{name}">` — check
  `packages/react/src/styles` or the `Icon/stories.tsx` showcase for the actual list of valid
  `name` values before inventing new ones.
- **Accent color per app**: each app can set its own `accent`/`accentLight`/`accentDark` on
  its root `Container`/`Card` to visually distinguish it from the others in the sidebar (e.g.
  ecommerce = warm orange, admin = neutral slate, landing = brand primary). Purely cosmetic,
  low priority.
- **Mock data size**: keep seed data small (5–12 items) — this is a showcase, not a stress
  test. `Table`/`List`/`Masonry` pagination should still be exercised (set `pageSize` low
  enough, e.g. 4–5, that pagination controls actually appear with the seed data).

## @prismal/react component reference

(Condensed from a full source pass on 2026-07-28 — verify against actual source if a prop
doesn't behave as expected, this is a reference not a contract.)

All components accept a base `ComponentProps`: `className?`, `style?`, `elevation?: 0|1|2|3|4`,
`borderRadius?: "none"|"xs"|"sm"|"md"|"lg"|"xl"|"full"`, `"data-id"?`, plus `AccentConfig`:
`accent?`, `accentLight?`, `accentDark?` (hex/CSS, drive `--color-primary*` vars). Noted below
only where a component adds/overrides something.

**Public exports** (`packages/react/src/index.ts`): `Container, Text, View, ViewItem, Tabs,
Accordion, Pie, Graph, GraphType, SelectOption, ActionBar, ActionBarItemConfig, CardProps,
ButtonGroup, Button, Slider, Header, Marquee, Table, List, Masonry, Icon, Card, Modal, Alert,
SearchBar, Sidebar, Form, Select, TextInput, Toggle, NumberInput, FileInput, InputRefType,
Dropdown, Tooltip, Menu, MenuItem, MenuItemData, LazyItem, ParallaxItem, setAccentStyle,
hex2rgba`, plus hooks: `useModal, useSidebar, useCursorPosition, useElementWidth,
useElementHeight, useIntersectionObserver, useElScrollThreshold, useElScrollPosition,
useScrollThreshold`. Note: `Menu`/`MenuItem` do **not** use `ComponentProps` (no
accent/elevation/borderRadius) — only `className`/`style`.

### Layout primitives

- **Container** — `children?`, `ratio?: Ratio | {xs,sm,md,lg,xl}` (`Ratio =
  "5-2"|"9-2"|"5-4"|"16-9"|"16-3"|"18-9"|"20-6"|"20-8"|"8-5"|"4-3"|"4-5"`), `span?: number |
  {xs..xl}` (grid column span), `hide?: boolean | {xs..xl}`, `cursor?: "circle"`.
- **Stack** — `data: {name:string,...}[]`, `render?: (elData, index, isActive) => ReactNode`,
  `direction?: "vertical"|"horizontal"`, `gap?`, `itemContainerClass?`. Click-to-expand stacked
  cards, last item active by default.
- **View** — grid container restricted to `ViewItem` children (non-`ViewItem` children are
  dropped with a dev warning). `columns?: number | {xs..xl}`, `autoScale?`, `baseColumns?`,
  `reflow?: "none"|"clamp"|"wrap"|"transpose"|"stack" = "clamp"`, `rows?`,
  `cellWidth?/cellHeight?: ViewSize | responsive`, `matrix?` (per-cell sizes), `unit?: string =
  "1rem"`, `gap?`, `dense?: boolean`. `ViewItem`: `children?`, `at?: ViewAddress` (e.g. `"A2"`),
  `width?/height?: number | "auto"`, `layer?: number`, `justify?/align?: "start"|"center"|"end"|"stretch"`,
  `offset?: {x,y}`, `reflow?` (per-item override), `pointerEvents?`, `clip?`.
  Example: `<View columns={4} rows={2} cellWidth="1fr" cellHeight={10} gap={1}><ViewItem at="A1" width={2} height={2}><Card .../></ViewItem></View>`.

### Content containers

- **Card** — `header?/footer?`, `headerClass?/footerClass?/bodyClass?`, `children?`,
  `orientation?: "vertical"|"horizontal"` (default vertical), `padding?: "none"|"xs"|"s"|"m"|"l"`
  (default `"s"`), `borderRadius` default `"xs"`, `elevation` default `1`.
- **Accordion** — `children` (content), `header` (always-visible trigger), `defaultOpen?`,
  `contentStyle?/contentClass?`. Checkbox-driven, **no controlled-open prop** — for the FAQ
  section in the landing page and ingredient/steps sections in the recipe library, this is
  fine (uncontrolled is the intended usage).
- **Modal** — `areaId?` (portal target DOM id), `header?/footer?` (header defaults to an
  `ActionBar` with title + close button), `title?: string`, `children?`, `visible?: boolean`,
  `closeModal?: () => void`, `showClose? = true`, `onClose?`. Built on `Card` + `createPortal`.
- **Sidebar** — thin wrapper over `Modal`: `areaId?`, `closeSidebar?`, `header?/footer?`,
  `children?`, `visible?`. Pair with `useSidebar` hook. No existing showcase story for it —
  the ecommerce filter panel and admin nav are the first real usage examples in this repo, so
  double check behavior manually once built.
- **Alert** — discriminated union: either `{children, message?: never, action?: never}` or
  `{message: string, action?: JSX.Element[], children?: never}`. Plus `onClose?`, `cover?`,
  `visible? = true`, `closeAlert?`, `showClose? = true`, `cornerRadius?: false|"s"|"m"|"l"`,
  `transition?`. Use for the newsletter-signup success state on the landing page.

### Navigation / structural

- **Header** (forwardRef, ref `{lowNode, highNode}`) — `navClass?`, `placeHolderClass?`,
  `children?`, `sticky? = true`, `stickyClass?` (applied once scrolled past).
- **ActionBar** (forwardRef, ref `{lowNode, highNode}`) — `items: (ActionBarItemConfig|null)[]`,
  `children?: ReactElement[]` (auto-assigned to `defaultPosition`), `defaultPosition?:
  "left"|"center"|"right" = "right"`, `type?: "default"|"primary"|"secondary"`,
  `modalAreaId?` (portal target for overflow items), `sectionAlt?: {left?,center?,right?:
  {iconName, type}}`. `ActionBarItemConfig`: `{item, position, title?, key, scale?, alt?}`.
- **Tabs** (forwardRef, ref `{name}`) — `data: {name, iconName?, label, disabled?, default?,
  className?}[]`, `tabRenderer?`, `onChange?: (name) => void`, `children?:
  ReactElement<{"data-tab"}>[]`, `content?: {[tabName]: ReactNode}`, `contentRenderer?`,
  `tabsClass?/tabContentClass?/tabClass?`, `selected?` (omit for uncontrolled), `variant?:
  "tabs"|"nav" = "tabs"` (`"nav"` = scrollspy-style button row). Use `content`/`children` +
  `data-tab` pattern for section switching in the admin dashboard and pricing toggle in the
  landing page.
- **Menu** — `spacing?: "xs"|"sm"|"md"|"lg"|"xl" = "md"`, `children?`, `data?:
  MenuItemData[]`. `MenuItemData = {label, onClick?, items? (nested submenu), icon?,
  className?}`. Use for the admin sidebar nav and the landing page top nav.
- **Dropdown** — `children` (panel content), `toggleElement?`, `type?: "primary"|"default" =
  "primary"`, `isOpen?` (manual override). Use for the admin topbar notifications/user menu.
- **Tooltip** — wraps `Dropdown`: `children?` (trigger), `text: string`, `borderRadius?`.

### Buttons & inputs

- **Button** — `name?, iconName?, title?, onClick?, disabled?, type?:
  "default"|"primary"|"text" = "default", children?, shape?: "default-shape"|"circle",
  htmlType?: "submit"|"button" = "button", readOnly?`, plus `elevation? = 0`.
- **ButtonGroup** — `children: ReactElement<ButtonProps>[] | single`, `orientation?:
  "row"|"column" = "row"`, `type?` (cascades to children).
- **Form** — `children: ReactElement|ReactElement[]`, `name?`, `submit?: JSX.Element`,
  `onSubmit?: (formData: {[key]: any}) => void`, `gridTemplate?: {cols?,rows?} | string`,
  `gridGap? = "0.5rem"`. Collects child input refs via `InputRefType`, validates on submit.
  Shared `InputProps` base: `id?, name?, label?, labelClass?, labelSeparator?, labelPosition?:
  "after"|"before", placeholder?, title?, inline?, disabled?, required?, readOnly?, value?,
  onChange?, validator?: (v) => boolean|string, gridPlacement?`.
  - **TextInput** — `htmlType?: "text"|"email"|"password"|"file" = "text"`, `accept?`,
    `onPressEnter?`, `onChange?: (value) => void`, `size?: "s"|"m"|"l" = "m"`,
    `after?/before?: ReactNode`, `type?: "default"|"primary"`, `multiple?`.
  - **Select** — `multiple?`, `options: SelectOption[]` (`{value, element, selected?}`),
    `placeholder? = "Select.."`, `onChange?: (value: string|string[]) => void`, `isFiltered?`,
    `fetchOptions?`, `orderOptions?`.
  - **Toggle** — `type?: "checkbox"|"switch" = "checkbox"`, `checked?`, `onChange?: (value:
    boolean) => any`. `borderRadius` default `"sm"`.
  - **NumberInput** — `onChange?: (value?: number) => void`, `step? = 1`, `value?`. Use for
    cart quantity steppers.
  - **FileInput** — wraps `TextInput` (`htmlType="file"`), `multiple?`. Not needed for these
    five apps unless the admin dashboard gets an avatar-upload form field (optional).
- **SearchBar** — `disabled?, placeholder? = "Search", value?, onSearch?: (query) => void,
  btnPosition?: "outer-after"|"outer-before"|"inner-after"|"inner-before" = "outer-after",
  type?`. **Debounces 1.5s before firing `onSearch`** — don't expect keystroke-level filtering,
  design the todo/recipe/shop search UX around that debounce.

### Data display

- **Table** — `data: {[rowKey]: {[colKey]: CellData}} | Array<{[key]: any}>`, `caption?`,
  `cellRenderer?: ({data, coords?, mode?}) => JSX.Element` (use for status-badge cells in the
  admin "recent orders" table). Click column header to sort.
- **List** — discriminated by `type: "raw"|"process"` and `view?: "list"|"grid"`. Common:
  `pageSize? = 24, page? = 1, infiniteScroll?, header?/footer?, showPageCtrl? = true,
  showExtremesCtrl? = false, padding?`. `"process"` needs `data: any[]` + `listProcessor:
  (elements) => {elements}`; `"raw"` needs `children`. `"grid"` adds `cols?,
  xsCols?/smCols?/mdCols?/lgCols?/xlCols?`. Good fit for the recipe grid and product grid.
- **Masonry** — `type: "process"|"raw"`. `"process"` needs `data: {}[]` + `itemRenderer?`
  (defaults to `Card`), `"raw"` needs `children`. `rowHeight? = 8`. Alternative to `List
  view="grid"` for the recipe library if variable-height cards are wanted.
- **Graph** (`Graph`, `GraphType`) — `type: GraphType`, `data: any[]`, `keys: {x, y?,
  open?/high?/low?/close?}`, `onDataProcessed?`, `title?, showMarkers?, isCurved?, colors?:
  string[], layout?: "vertical"|"horizontal"`. `GraphType`: `LINE, LINE_MARKERS,
  LINE_CURVED, LINE_CURVED_MARKERS, AREA_STACKED, BAR_VERTICAL, BAR_HORIZONTAL, BAR_STACKED,
  BAR_GROUPED, CANDLESTICK`. Use `BAR_VERTICAL` or `LINE_CURVED` for the admin revenue chart.
  Note: does **not** extend `ComponentProps` (no accent/elevation).
- **Pie** — `name?, size? = 220, data: {name?, percentage, color?, label?}[]`. Throws if a
  percentage is outside 0–100 — validate mock data sums sanely. Use for an admin KPI card
  (e.g. "orders by category").
- **Text** — `{type:"heading", level: 1|2|3|4|5|6} | {type:"body"}`, `children?, size?:
  "xs"|"sm"|"md"|"lg"|"xl"|"xxl" | responsive`.
- **Icon** — `name: string, className?`.

### Motion / media

- **Marquee** (forwardRef, ref `{pause(), play()}`) — `children, pauseOnHover? = true, speed? =
  8, onClick?`. Only animates if content overflows. Use for the landing page logo strip.
- **LazyItem** — `children, exitEffect? = true, animation?: "fade"|"slide-up"|"slide-left"|
  "pop-in"|"none" = "fade", loadedClass?, offset? = 250`. Wrap landing-page sections for
  scroll-in fade.
- **ParallaxItem** — `children?, factor? = 0.1` (−1 to 1, throws outside range). Use sparingly
  in the landing page hero.
- **Slider** — `type: "process"|"raw"`. Common: `id?, spacing? = 5, size?: "xl"|"l"|"m"|"s" =
  "l", navElBackward?/navElForward?, labelClass?, labelEl?, showNavBar? = true, autoPlay?:
  false|number`. `"process"` needs `slides: any[]` + `slideWrapper`. Use for landing-page
  testimonials.

### Compound patterns already used elsewhere in the showcase (precedent to follow)

- `Modal`/`Sidebar` header defaults to an `ActionBar`.
- `SearchBar` wraps `TextInput` + `Button`.
- `Tooltip`/`MenuItem` wrap `Dropdown`.
- `List`'s pagination footer is an `ActionBar`.
- `Masonry`'s default item renderer is a `Card`.

## Per-app plans

### 1. Todo app — `Examples/TodoApp/`

Smallest scope, build this first to validate the file-split pattern above.

- **State**: `todos: {id, title, done, priority: "low"|"medium"|"high"}[]`, `filter:
  "all"|"active"|"completed"`, `search: string`.
- **Layout**: `Header` (title + `ActionBar` with a `TextInput`/`SearchBar` on the left and an
  "Add task" `Button` opening a `Modal` on the right) → `Tabs` (`variant="tabs"`, data =
  All/Active/Completed, controls `filter`) → `List type="process" view="list"` rendering one
  `Card` per todo (via `TodoItem` subcomponent: `Toggle` for done state, `Text` title with
  strikethrough style when done, priority indicator, delete `Button`) → footer `ActionBar`
  showing remaining count + "Clear completed" `Button`.
- **Add-task Modal**: `Form` with `TextInput` (title, required), `Select` (priority), custom
  `submit` button; `onSubmit` appends to `todos` and closes the modal via `useModal`.
- **Empty state**: when filtered list is empty, show an `Alert` ("No tasks — add one above").

### 2. Recipe library — `Examples/RecipeLibrary/`

- **State**: `recipes` (mock, ~8-10 items: title, category, minutes, difficulty, ingredients[],
  steps[]), `categoryFilter`, `search`, `selectedRecipeId` (drives detail `Modal`).
- **Layout**: `Header` with `SearchBar` (`onSearch` sets `search`) → `Tabs` for category
  filter (`All/Breakfast/Lunch/Dinner/Dessert`, `onChange` sets `categoryFilter`) →
  `List type="process" view="grid"` of recipe `Card`s (color-block placeholder "photo",
  title, `Text` meta line for time/difficulty, click opens detail).
- **Detail Modal**: recipe title as `title`, `Accordion` for "Ingredients" and "Steps"
  sections (`defaultOpen` on Ingredients), close via `closeModal`.
- Use `useElementWidth`/nothing fancy needed beyond that — keep it a straightforward
  filter+detail pattern.

### 3. Ecommerce shop archive — `Examples/ShopArchive/`

- **State**: `products` (mock, ~10-12 items: name, category, price, brand), `filters:
  {category?, brand?, maxPrice}`, `cart: {productId, qty}[]`, `cartOpen` (via `useSidebar`).
- **Layout**: `Header` with `ActionBar` — left: `SearchBar`; right: cart `Button`
  (`iconName`, shows `cart.length` badge via a small `Text`) toggling `cartOpen`.
  Below header: two-column — a filter `Sidebar`-style panel is overkill for a static column,
  so use a `Container` with `span` sized narrower holding `Select` (brand), `Toggle`s per
  category, and a `NumberInput` or a simple max-price `Select` — **do not invent a range
  slider**, `Slider` in this library is a carousel, not an `<input type=range>`; a `Select`
  with preset price bands is the correct component-accurate approach. Main column:
  `List type="process" view="grid"` of product `Card`s, each with `Text` price and an "Add to
  cart" `Button`.
- **Cart**: `Sidebar` (`visible={cartOpen}`, `closeSidebar` from `useSidebar`) listing cart
  lines (`Card` per line: product name, `NumberInput` qty, remove `Button`), footer showing
  total + "Checkout" `Button` that clears the cart and shows an `Alert` ("Order placed").

### 4. Landing page — `Examples/LandingPage/`

- **State**: mostly static; interactive bits: pricing period toggle (`Tabs`
  Monthly/Yearly, controlled `selected`), newsletter `Form` (email `TextInput`, `onSubmit`
  shows an `Alert` success message, no real network call), FAQ `Accordion`s (uncontrolled).
- **Layout** (top to bottom): sticky `Header` with `Menu` nav links + a primary `Button` CTA
  on the right → hero `Container` (`ratio="16-9"` or similar) with `Text` heading/body +
  `Button` CTA, optionally one `ParallaxItem` decorative shape → features `View` grid of
  `ViewItem`s each a `Card` with `Icon` + `Text` → testimonials `Slider type="process"` of
  quote `Card`s → pricing section: `Tabs` period toggle driving which price shows on 2-3 plan
  `Card`s (each with `ButtonGroup`/`Button` "Choose plan") → FAQ `Accordion` list → footer
  with a `Marquee` of partner-logo placeholders and a `Menu` of footer links.
- Wrap each major section in `LazyItem` (`animation="fade"` or `"slide-up"`) for scroll-in.

### 5. Admin dashboard — `Examples/AdminDashboard/`

Most complex, exercises the widest prop surface — do this last once the pattern is proven.

- **State**: `activeSection: "overview"|"users"|"orders"|"settings"` (via `Tabs`
  `content`/`selected`), `sidebarCollapsed` (or just static open sidebar — `useSidebar` is for
  overlay sidebars, a **persistent** dashboard nav is more simply a plain `Container` column
  with a `Menu`, not the `Sidebar` overlay component — don't force `Sidebar` where a static
  column fits better), `users`/`orders` mock tables, `addUserModalOpen`.
- **Layout**: left column — `Menu` (`data`: Overview/Users/Orders/Settings, `icon` per item)
  acting as nav, `onClick` per item sets `activeSection`. Top bar — `ActionBar` with
  `SearchBar` left, `Dropdown` (notifications) + `Menu`/avatar `Dropdown` (user menu) right.
  Main area driven by `activeSection`:
  - **Overview**: `View` grid of KPI `Card`s (`Text` heading numbers, one with an inline
    `Pie`), one `Graph` (`BAR_VERTICAL` or `LINE_CURVED`) for revenue trend, a `Table` of
    recent orders (`cellRenderer` for a status-badge column).
  - **Users**: `Table` of users + "Add user" `Button` opening a `Modal` with a `Form`
    (name/email/role `Select`).
  - **Orders**: `Table` of all orders, reuse the status `cellRenderer`.
  - **Settings**: a `Form` of account fields (`TextInput`, `Toggle` switches for
    notification prefs).
- Use `Tabs` with `variant="nav"` + `content`/`contentRenderer` for the section switch so the
  nav semantics match "current section", or just conditionally render based on
  `activeSection` state set from the `Menu` `onClick` — either is fine, pick whichever reads
  cleaner once `TodoApp` establishes the file-split pattern.

## Suggested build order

1. `TodoApp` — validates the `stories.tsx` + `<App>.tsx` + `mock.ts` + `components/` split.
   Confirm it actually renders in `npm run storybook` before moving on.
2. `RecipeLibrary` — same shape, adds `Accordion`-in-`Modal` and grid `List`.
3. `ShopArchive` — adds `Sidebar`/`useSidebar`, `NumberInput`, cart state.
4. `AdminDashboard` — adds `Table` `cellRenderer`, `Graph`, `Pie`, multi-section switching.
5. `LandingPage` — mostly presentational, do last as a "victory lap" since it's the least
   state-heavy despite touching the most components (`Slider`, `Marquee`, `ParallaxItem`,
   `LazyItem`).

## Open questions for whoever picks this up

- Real `Icon` name list hasn't been enumerated here — check `Icon/stories.tsx` in the
  showcase or the icon font source in `packages/react/src/styles` before picking names for
  nav/cart/status icons.
- `Sidebar` has no existing showcase story anywhere in the repo — its overlay/portal behavior
  (`areaId`, `closeSidebar`) should be smoke-tested in isolation before relying on it for the
  ecommerce cart, in case its `Modal`-wrapper behavior has rough edges nobody's hit yet.
- Confirm whether `packages/react` needs to be built/linked (`npm install --legacy-peer-deps`
  from repo root, per `packages/showcase/README.md`) before `npm run storybook` picks up any
  recent `@prismal/react` source changes — the webpack config aliases straight to
  `../../react/` source, so this is likely fine, but verify on a clean checkout.
