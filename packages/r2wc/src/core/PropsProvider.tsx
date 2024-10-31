import type { ComponentType } from "react";
import React from "react";
import { type Observable, useObservable } from "./Observable.ts";

export interface PropsProvider <Props> {
    Component: ComponentType<Props | (Props & { children?: React.ReactNode })> ;
    observable: Observable<Props>;
    children?: React.ReactNode;
}

/**
 * The PropsProvider is used to keep the web component's property in sync with the react component's props.
 */
export function PropsProvider<Props>({
    Component,
    observable,
    children
}: PropsProvider<Props>) {
    const props = useObservable(observable) ?? {} as Props;

    return <Component {...props}>{children}</Component>;
}
