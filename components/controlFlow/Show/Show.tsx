import { isFunction, isNil } from "lodash";
import React, { ReactNode } from "react";

type Props<T> = {
  children: ReactNode | ((item: T) => JSX.Element);
  fallback?: ReactNode;
  when: T | undefined | null | false;
};

/**
 * The Show control flow is used to conditional render part of the view: it renders children if `when` is truthy,
 * and fallback otherwise. It is similar to the ternary operator (when ? children : fallback) but is ideal for templating JSX.
 * Inspired by SolidJS:
 * @see https://www.solidjs.com/docs/latest/api#show
 *
 * @example
 * <Show when={showManager} fallback={<p>No manager</p>}>
 *   <Entity avatar={manager.avatar} name={manager.fullName} />
 * </Show>
 *
 * @example
 * <Show when={maybeManager} fallback={<p>No manager</p>}>
 *   {(manager) => (
 *     <Entity avatar={manager.avatar} name={manager.fullName} />
 *   )}
 * </Show>
 */
export function Show<T>({ children, fallback, when }: Props<T>): ReactNode {
  if (isNil(when) || when === false) return fallback ?? null;

  return <>{isFunction(children) ? children(when) : children}</>;
}
