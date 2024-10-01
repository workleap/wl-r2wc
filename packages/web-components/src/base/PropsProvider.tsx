import { ComponentType } from "react";
import { Observable, useObservable } from "./Observable.ts";

export interface PropsProvider<Props> {
  Component: ComponentType<Props>;
  observable: Observable<Props>;
}

export function PropsProvider<Props>({
  Component,
  observable,
}: PropsProvider<Props>) {
  const props = useObservable(observable)!;

  return <Component {...props} />;
}
