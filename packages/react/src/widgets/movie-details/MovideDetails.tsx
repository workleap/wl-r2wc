import {
  Button,
  Content,
  Header,
  Heading,
  Item,
  Modal,
  ModalTrigger,
  Paragraph,
  Tabs,
} from "@workleap/orbiter-ui";
import { useAppContext } from "../../context-provider/ContextProvider.tsx";

export interface MovideDetailsProps {
  onClose: () => void;
  showRanking: boolean;
}

export function MovideDetails({ onClose, showRanking }: MovideDetailsProps) {
  const { isMovieDetailsOpen, setIsMovieDetailsOpen } = useAppContext();

  const handleOpenChange = (event: any, newValue: boolean) => {
    setIsMovieDetailsOpen(newValue);
    if (!newValue) onClose();
  };

  const handleClose = () => {
    setIsMovieDetailsOpen(false);
    onClose();
  };

  return (
    <ModalTrigger open={isMovieDetailsOpen} onOpenChange={handleOpenChange}>
      <div />
      <Modal>
        <Heading>Apollo 11 movie</Heading>
        <Content>
          <Paragraph>
            Apollo 11 is a 2019 American documentary film edited, produced and
            directed by Todd Douglas Miller. It focuses on the 1969 Apollo 11
            mission, the first spaceflight from which men walked on the Moon.
          </Paragraph>
          <Paragraph>
            The film consists solely of archival footage, including 70 mm film
            previously unreleased to the public, and does not feature narration,
            interviews or modern recreations. The Saturn V rocket, Apollo crew
            consisting of Buzz Aldrin, Neil Armstrong, and Michael Collins, and
            Apollo program Earth-based mission operations engineers are
            prominently featured in the film.
          </Paragraph>
          {showRanking && (
            <Tabs variant="in-card" aria-label="Planets">
              <Item key="IMDb">
                <Header>IMDb</Header>
                <Content>8.1/10 https://www.imdb.com/title/tt8760684/</Content>
              </Item>
              <Item key="Metacritic">
                <Header>Metacritic</Header>
                <Content>
                  88% https://www.metacritic.com/movie/apollo-11/critic-reviews/
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
        </Content>
        <Button onClick={handleClose} variant="secondary">
          Close
        </Button>
      </Modal>
    </ModalTrigger>
  );
}
