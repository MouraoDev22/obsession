# Minimal TypeScript and React convention examples

These independent examples illustrate this repository's TypeScript and React
syntax; they are not application features. Existing rules and installed
configuration remain authoritative. The project does not currently configure
Vitest or Zod, so no examples below assume either dependency.

Use the existing `src/interfaces/`, `src/types/`, and `src/components/` folders.
Do not copy generic `src/shared/`, `src/features/`, or `@/` alias patterns into
this repository; those paths and aliases are not configured here.

## Declaration and domain function (two files)

`src/interfaces/CounterState.ts`:

```ts
export interface CounterState {
  value: number;
}
```

`src/utils/incrementCounter.ts`:

```ts
import type { CounterState } from "../interfaces/CounterState";

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

`src/interfaces/CounterProps.ts`:

```ts
export interface CounterProps {
  label: string;
}
```

`src/components/Counter/index.tsx`:

```tsx
import type { CounterProps } from "../../interfaces/CounterProps";
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

The caller supplies the label. This syntax illustration does not add a
production component or a localization policy.

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

## Tests

There is no test framework or `npm test` script configured in this repository.
Do not copy a standalone Vitest, Playwright, or schema-validation example and
assume it can run here. If a test framework is introduced, add and document its
dependency, configuration, and scripts as a separate project change.