import type { ComponentType } from "react";
import { type Observable, useObservable } from "./Observable.ts";

export interface PropsProvider<ComponentProps, ElementProps> {
    Component: ComponentType<ComponentProps>;
    observable: Observable<ElementProps>;
    mapProps?: (props: ElementProps) => NonNullable<ComponentProps>;
}

/**
 * The PropsProvider is used to keep the web component's property in sync with the react component's props.
 */
export function PropsProvider<ComponentProps, ElementProps>({
    Component,
    observable,
    mapProps
}: PropsProvider<ComponentProps, ElementProps>) {
    const props = useObservable(observable)!;
    const mappedProps = mapProps ? mapProps(props) : props as unknown as NonNullable<ComponentProps>;

    return <Component {...mappedProps} />;
}
