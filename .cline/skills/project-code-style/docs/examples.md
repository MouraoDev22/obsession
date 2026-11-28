# Complete minimal convention examples

These independent examples illustrate project syntax; they are not application
features. Existing rules and installed configuration remain authoritative. No
Zod installation or invented application API is required.

<feature> stands for a real feature folder; src/shared is only for interfaces, types and enums.

## Declaration and domain function (two files)

`src/shared/interfaces/counter-state.interface.ts`:

```ts
export interface CounterState {
  value: number;
}
```

`src/features/<feature>/domain/increment-counter.ts`:

```ts
import type { CounterState } from "@/shared/interfaces/counter-state.interface";

export function incrementCounter(state: CounterState): CounterState {
  return { value: state.value + 1 };
}
```

## Narrowing and callbacks

```ts
export function firstDoubled(values: number[]): number | undefined {
  const doubled: number[] = values.map((value: number): number => {
    return value * 2;
  });
  const first: number | undefined = doubled[0];
  if (first === undefined) {
    return undefined;
  }
  return first;
}
```

## Named React handler without hard-coded UI labels

`src/shared/interfaces/counter-props.interface.ts`:

```ts
export interface CounterProps {
  label: string;
}
```

`src/features/<feature>/components/counter.tsx`:

```tsx
"use client";

import type { CounterProps } from "@/shared/interfaces/counter-props.interface";
import type { Dispatch, SetStateAction } from "react";

import { useState } from "react";

export function Counter({ label }: CounterProps): React.JSX.Element {
  const [count, setCount]: [number, Dispatch<SetStateAction<number>>] =
    useState<number>(0);

  function handleClick(): void {
    setCount((previous: number): number => {
      return previous + 1;
    });
    return;
  }

  return (
    <button aria-label={label} onClick={handleClick}>
      {count}
    </button>
  );
}
```

The caller supplies a translated catalog label. This syntax illustration does
not implement a production design-system component or locale formatting policy.

## Unknown errors without swallowing them

```ts
export function parseUnknownJson(text: string): unknown {
  const parsed: unknown = JSON.parse(text);
  return parsed;
}
```

This deliberately allows parsing failure to reach the caller. A real boundary
maps it to the existing safe error contract; do not catch/log/continue merely to
hide it. No fictional Result or logger API is assumed here.

## Standalone Vitest example

```ts
import { expect, it } from "vitest";

function double(value: number): number {
  return value * 2;
}

it("doubles a number", (): void => {
  expect(double(3)).toBe(6);
  return;
});
```

For Playwright reuse the repository's PageFixture interface pattern. For Zod
read the installed version when that dependency is introduced; use z.ZodType
with an extracted model, not an inline inferred declaration outside types/.