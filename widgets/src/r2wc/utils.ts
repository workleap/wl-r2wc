

type MapItem<Props> = {
    to: keyof Props;
    convert?: (value: string | null) => Props[keyof Props];
} | keyof Props;

type ConditionnalKeys<T, ExpectedValue> = {
    [K in keyof T]: T[K] extends ExpectedValue ? K : never;
}[keyof T];


// eslint-disable-next-line @typescript-eslint/ban-types
type FunctionKeys<T> = ConditionnalKeys<T, Function>;

export interface Map<Props, ObservedAttributesType extends string> {
    attributes?: Record<ObservedAttributesType, MapItem<Props>>;
    events?: Record<string, MapItem<Props>>;
}

export function getMapName<Props>(map: MapItem<Props> | FunctionKeys<Props>) {
    if (typeof map === "object") {
        return map.to;
    }

    return map;
}
export function getMapConvert<Props>(map: MapItem<Props>) {
    if (typeof map === "object") {
        return map.convert;
    }

    return undefined;
}
