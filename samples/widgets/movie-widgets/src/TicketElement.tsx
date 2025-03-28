import { WebComponentHTMLElement, type AttributeEventMap } from "@workleap/r2wc";
import { Ticket, type TicketProps } from "./Ticket.js";

type ObservedAttributesType = (typeof TicketElement.observedAttributes)[number];

export class TicketElement extends WebComponentHTMLElement<TicketProps, ObservedAttributesType> {
    static tagName = "wl-ticket";
    static observedAttributes = ["key", "title", "count"] as const;

    get reactComponent() {
        return Ticket;
    }

    get map(): AttributeEventMap<TicketProps, ObservedAttributesType> {
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

