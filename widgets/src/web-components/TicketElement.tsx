import { type MapType, WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { Ticket, type TicketProps } from "../react/Ticket.tsx";


export class TicketElement extends WebComponentHTMLElement<TicketProps> {
    get reactComponent() {
        return Ticket;
    }

    static get tagName() {
        return "wl-ticket";
    }

    static observedAttributes =
        ["key", "title", "count"];


    get attributesMap() {
        const map: MapType<TicketProps> = {
            "count": { to: "count", convert: (v:string | null) => Number(v) },
            "onRemove": { to: "onRemove" }
        };

        return map;
    }
}
