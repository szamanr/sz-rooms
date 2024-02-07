import React, { Fragment, Key, ReactNode } from "react";

type Item = Record<string, unknown> & { id: Key };

type Props<T, U> = {
  children: ReactNode | ((item: T, index: number) => U);
  each: readonly T[] | undefined;
  fallback?: JSX.Element;
};

/**
 * List iteration keyed by an `id` attribute. The callback takes the current item as the first argument.
 * Inspired by SolidJS:
 * @see https://www.solidjs.com/docs/latest/api#for
 * @example
 * <For each={kpis} fallback={<div>Loading...</div>}>
 *   {(kpi) => <div>{kpi.name}</div>}
 * </For>
 */
export const For = <T extends Item, U extends ReactNode>({
  children,
  each,
  fallback,
}: Props<T, U>): JSX.Element | null => {
  if (!each || each.length === 0) return fallback ?? null;

  if (typeof children !== "function") {
    return (
      <>
        {each.map(({ id }) => {
          return <Fragment key={id}>{children}</Fragment>;
        })}
      </>
    );
  }

  return (
    <>
      {each.map((item, index) => {
        const { id } = item;

        return <Fragment key={id}>{children(item, index)}</Fragment>;
      })}
    </>
  );
};
