import {
    Button,
    Content,
    Header,
    Heading,
    Item,
    Listbox,
    Modal,
    ModalTrigger,
    Paragraph,
    Tabs,
    ThemeProvider,
} from "@workleap/orbiter-ui";
import { useAppContext } from "../../context-provider/ContextProvider.js";

export interface MovieDetailsProps {
  onClose: () => void;
  showRanking: boolean;
}

export function MovieDetails({ onClose, showRanking }: MovieDetailsProps) {
  const { isMovieDetailsOpen, setIsMovieDetailsOpen, theme } = useAppContext();

  const handleOpenChange = (event: any, newValue: boolean) => {
    setIsMovieDetailsOpen(newValue);
    if (!newValue) onClose();
  };

  const handleClose = () => {
    setIsMovieDetailsOpen(false);
    onClose();
  };

  return (
    <>
      <ThemeProvider colorScheme={theme}>
        <Heading>List of Movies:</Heading>
        <Listbox onSelectionChange={() => setIsMovieDetailsOpen(true)}>
          <Item key="apollo11">Apollo 11</Item>
          <Item key="interstellar">Interstellar</Item>
          <Item key="gravity">Gravity</Item>
          <Item key="theMartian">The Martian</Item>
          <Item key="moon">Moon</Item>
        </Listbox>
        <ModalTrigger open={isMovieDetailsOpen} onOpenChange={handleOpenChange}>
          <div />
          <Modal>
            <Heading>Apollo 11 movie</Heading>
            <Content>
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
            </Content>
            <Button onClick={handleClose} variant="secondary">
              Close
            </Button>
          </Modal>
        </ModalTrigger>
      </ThemeProvider>
    </>
  );
}
