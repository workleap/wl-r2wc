import { createElement, type HTMLAttributes, useEffect, useRef } from "react";
import type { WebComponentHTMLElement } from "../../WebComponentHTMLElement.tsx";

export function createWebComponent<Props = unknown, CustomAttributes = unknown>(tagName: keyof JSX.IntrinsicElements) {
    return function WebComponent(props: { data?: Props } & HTMLAttributes<HTMLElement> & CustomAttributes) {
        const { data, ...rest } = props;
        const ref = useRef<WebComponentHTMLElement<Props>>();

        useEffect(() => {
            if (data !== undefined && ref.current) {
                ref.current.data = data;
            }
        }, [data]);

        return createElement(tagName, { ref, ...rest });
    };
}
