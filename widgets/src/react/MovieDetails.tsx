import {
    Button,
    Content,
    Footer,
    Header,
    Heading,
    Item,
    Modal,
    ModalTrigger,
    Paragraph,
    Tabs,
    TextInput,
    ThemeProvider
} from "@workleap/orbiter-ui";
import { useEffect, useState } from "react";
import { type MovieData, useAppContext } from "./AppContextProvider.tsx";

export interface MovieDetailsProps {
    showRanking: boolean;
    onBuy?: (movie : MovieData, count: number) => void;
    mode: "modal" | "inline";
}

export function MovieDetails({ showRanking, onBuy, mode = "modal" }: MovieDetailsProps) {
    const { theme, selectedMovie, eventEmitter } = useAppContext();

    const [ ticketsCount, setTicketsCount ] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenChange = () => {
        handleClose();
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };
    console.log("MovieDetails", "123");

    useEffect(() => {
        const handleOpenModal = () => {
            setIsModalOpen(true);
        };

        eventEmitter.on("movieSelected", handleOpenModal);

        return () => {
            eventEmitter.off("movieSelected", handleOpenModal);
        };
    }, [eventEmitter]);

    const content = <Content>
        <Paragraph>
Apollo 11 is a 2019 American documentary film edited, produced
and directed by Todd Douglas Miller. It focuses on the 1969
Apollo 11 mission, the first spaceflight from which men walked
on the Moon.
        </Paragraph>
        <Paragraph>
The film consists solely of archival footage, including 70 mm
film previously unreleased to the public, and does not feature
narration, interviews or modern recreations. The Saturn V
rocket, Apollo crew consisting of Buzz Aldrin, Neil Armstrong,
and Michael Collins, and Apollo program Earth-based mission
operations engineers are prominently featured in the film.
        </Paragraph>
        <div>
            {showRanking && (
                <Tabs variant="in-card" aria-label="Planets">
                    <Item key="IMDb">
                        <Header>IMDb</Header>
                        <Content>
8.1/10 https://www.imdb.com/title/tt8760684/
                        </Content>
                    </Item>
                    <Item key="Metacritic">
                        <Header>Metacritic</Header>
                        <Content>
88%
https://www.metacritic.com/movie/apollo-11/critic-reviews/
                        </Content>
                    </Item>
                    <Item key="RottenTomatoes">
                        <Header>Rotten Tomatoes</Header>
                        <Content>
99% https://www.rottentomatoes.com/m/apollo_11_2019
                        </Content>
                    </Item>
                </Tabs>
            )}
        </div>
    </Content>;

    const modal = selectedMovie ? <ModalTrigger open={isModalOpen} onOpenChange={handleOpenChange}>
        <div />
        <Modal>
            <Heading>{selectedMovie?.title}</Heading>
            {content}
            <Footer style={{ display: "flex", flexDirection: "row", flexFlow: "nowrap", gap: "10px" }}>

                {onBuy ? <>
                    <TextInput placeholder="1" value={ticketsCount.toString()} onValueChange={(event, value) => setTicketsCount(Number(value))} />
                    <Button onClick={() => { onBuy?.(selectedMovie, ticketsCount); handleClose(); }} variant="primary">Buy tickets</Button>
                </> : null}
                <Button onClick={handleClose} variant="secondary"> Close </Button>
            </Footer>
        </Modal>
    </ModalTrigger> : null;

    return (
        selectedMovie ? <>
            <ThemeProvider colorScheme={theme}>
                {mode === "modal" ? modal : content}
            </ThemeProvider>
        </> : null
    );
}


