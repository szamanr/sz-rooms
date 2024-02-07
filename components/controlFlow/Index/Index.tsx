import React, { Fragment, ReactNode } from "react";

type Props<T, U> = {
  children: ReactNode | ((item: T, index: number) => U);
  each: readonly T[] | undefined;
  fallback?: JSX.Element;
};

/**
 * Non-keyed list iteration (rendered nodes are keyed to an array index). This is useful when there is no conceptual key,
 * like if the data consists of primitives, and it is the index that is fixed rather than the value.
 *
 * ❗ note: if you want to iterate a list of object with a conceptual key (like an id), use {@link common/controlFlow/For} instead.
 *
 * Inspired by SolidJS:
 * @see https://www.solidjs.com/docs/latest/api#index
 *
 * @example
 * <Index each={["healthy", "unhealthy]} fallback={<div>Loading...</div>}>
 *   {(status) => <div>{status}</div>}
 * </Index>
 */
export const Index = <T, U extends JSX.Element>({
  children,
  each,
  fallback,
}: Props<T, U>): JSX.Element | null => {
  if (!each || each.length === 0) return fallback ?? null;

  if (typeof children !== "function") {
    return (
      <>
        {each.map((item, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <Fragment key={index}>{children}</Fragment>;
        })}
      </>
    );
  }

  return (
    <>
      {each.map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Fragment key={index}>{children(item, index)}</Fragment>;
      })}
    </>
  );
};
