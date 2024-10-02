import type { ComponentType } from "react";
import { type Observable, useObservable } from "./Observable.ts";

export interface PropsProvider<Props, Attributes> {
    Component: ComponentType<Props>;
    observable: Observable<Attributes>;
    mapAttributesToProps: (attributes: Attributes) => Props;
}

/**
 * The PropsProvider is used to keep the web component's property in sync with the react component's props.
 */
export function PropsProvider<Props, Attributes>({
    Component,
    observable,
    mapAttributesToProps
}: PropsProvider<Props, Attributes>) {
    const attributes = useObservable(observable)!;
    const props = mapAttributesToProps(attributes);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Component {...props} />;
}
