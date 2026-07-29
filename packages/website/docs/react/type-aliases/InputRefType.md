# Type Alias: InputRefType

> **InputRefType** = `object`

Defined in: [components/Form/types.ts:64](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/components/Form/types.ts#L64)

## Description

The ref object exposed by form input components.

## Properties

### checkValidity

> **checkValidity**: () => (`string` \| `boolean`)[]

Defined in: [components/Form/types.ts:72](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/components/Form/types.ts#L72)

A function to trigger validation.

#### Returns

(`string` \| `boolean`)[]

***

### element

> **element**: `HTMLInputElement` \| `HTMLTextAreaElement` \| `HTMLSelectElement` \| `null`

Defined in: [components/Form/types.ts:70](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/components/Form/types.ts#L70)

The DOM element of the input.

***

### getValidity

> **getValidity**: () => (`string` \| `boolean`)[]

Defined in: [components/Form/types.ts:74](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/components/Form/types.ts#L74)

A function to get the current validation errors.

#### Returns

(`string` \| `boolean`)[]

***

### getValue

> **getValue**: (`args?`) => `any`

Defined in: [components/Form/types.ts:76](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/components/Form/types.ts#L76)

A function to get the current value of the input.

#### Parameters

##### args?

`any`

#### Returns

`any`

***

### isInputRefType

> **isInputRefType**: `boolean`

Defined in: [components/Form/types.ts:66](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/components/Form/types.ts#L66)

A flag to identify this as an input ref.

***

### name?

> `optional` **name?**: `string`

Defined in: [components/Form/types.ts:68](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/components/Form/types.ts#L68)

The name of the input.
