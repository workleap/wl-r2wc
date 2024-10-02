import type { ComponentType } from "react";
import { type Observable, useObservable } from "./Observable.ts";

export interface PropsProvider<Props> {
    Component: ComponentType<Props>;
    observable: Observable<Props>;
}

/**
 * The PropsProvider is used to keep the web component's property in sync with the react component's props.
 */
export function PropsProvider<Props>({
    Component,
    observable
}: PropsProvider<Props>) {
    const props = useObservable(observable)!;

    return <Component {...props} />;
}
