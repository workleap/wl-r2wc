export declare interface MovieDetailsProps {
    showRanking: boolean;
    onBuy?: (movie : MovieData, count: number) => void;
    mode: "modal" | "inline";
}

export declare interface MovieData {
    key: string;
    title: string;
}

export declare interface TicketProps {
    key: string;
    title: string;
    count: number;
    onRemove: ()=> void;
}

export declare interface MoviePopupProps {
    text: string;
}
