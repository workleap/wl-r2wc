import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { Ticket, type TicketProps } from "../react/Ticket.tsx";


export class TicketElement extends WebComponentHTMLElement<TicketProps> {
    get reactComponent() {
        return Ticket;
    }

    static get tagName() {
        return "wl-ticket";
    }
}
