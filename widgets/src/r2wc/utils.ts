

interface MapItemObject<Props> {
    to: keyof Props;
    convert?: (value: string | null) => Props[keyof Props];
}

type MapItem<Props> = MapItemObject<Props> | keyof Props;

type FunctionKeys<T> = {
    [K in keyof T]: T[K] extends (((...args: never[]) => unknown) | undefined) ? K : never;
}[keyof T];

export interface Map<Props, ObservedAttributesType extends string> {
    attributes?: {
        [K in ObservedAttributesType]: MapItem<Props>;
    };
    events?:{
        [key: string]: FunctionKeys<Props>;
    };
}

export function getMapName<Props>(map: MapItem<Props> | FunctionKeys<Props>): keyof Props {
    if (typeof map === "object") {
        return map.to;
    }

    return map;
}
export function getMapConvert<Props>(map: MapItem<Props>): MapItemObject<Props>["convert"] {
    if (typeof map === "object") {
        return map.convert;
    }

    return undefined;
}
