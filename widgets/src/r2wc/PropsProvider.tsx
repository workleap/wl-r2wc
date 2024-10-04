import type { ComponentType, PropsWithChildren } from "react";
import { type Observable, useObservable } from "./Observable.ts";

export interface PropsProvider<Props, T extends Props | PropsWithChildren<Props>> {
    Component: ComponentType<T>;
    observable: Observable<Props>;
    children?: React.ReactNode;
}

/**
 * The PropsProvider is used to keep the web component's property in sync with the react component's props.
 */
export function PropsProvider<Props, T extends Props | PropsWithChildren<Props>>({
    Component,
    observable,
    children
}: PropsProvider<Props, T>) {
    const props = useObservable(observable)!;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    //TODO: Fix this and remove the ts-ignore

    return <Component {...props}>{children}</Component>;
}
