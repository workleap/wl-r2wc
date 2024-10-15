import type { Map } from "../r2wc/utils.ts";
import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { Ticket, type TicketProps } from "../react/Ticket.tsx";

type ObservedAttributesType = (typeof TicketElement.observedAttributes)[number];

export class TicketElement extends WebComponentHTMLElement<TicketProps, ObservedAttributesType> {
    static tagName = "wl-ticket";
    static observedAttributes = ["key", "title", "count"] as const;

    get reactComponent() {
        return Ticket;
    }

    get map(): Map<TicketProps, ObservedAttributesType> {
        return {
            attributes:{
                "key": "key",
                "title": "title",
                "count": { to: "count", convert: (v:string | null) => Number(v) }
            },
            events:{
                "onRemove": "onRemove"
            }
        };
    }
}

