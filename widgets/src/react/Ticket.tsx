import { Button, Card, Checkbox, Content, Field, Flex, Form, Heading, Label, TextInput, ThemeProvider } from "@workleap/orbiter-ui";
import { useState } from "react";
import { useAppContext } from "./AppContextProvider.tsx";

export interface TicketProps {
    key: string;
    title: string;
    count: number;
    onRemove: ()=> void;
}

export function Ticket({ title, count, onRemove }: TicketProps) {
    const { theme } = useAppContext();
    const [ popcorn, setPopcorn ] = useState(false);
    const [ drink, setDrink ] = useState(false);
    const [ ticketsCount, setTicketsCount ] = useState(count);

    return (
        <ThemeProvider colorScheme={theme}>
            <Card>
                <Heading>
                    <Flex>
                        {title}

                    </Flex>
                </Heading>
                <Content>
                    <Form >
                        <Field>
                            <Label>Tickets</Label>
                            <TextInput placeholder="1" value={ticketsCount.toString()} onValueChange={(event, value) => setTicketsCount(Number(value))} />
                        </Field>
                        <Field>
                            <Checkbox checked={popcorn} onChange={() => setPopcorn(!popcorn)}>Popcorn</Checkbox>
                        </Field>
                        <Field>
                            <Checkbox checked={drink} onChange={() => setDrink(!drink)}>Drink</Checkbox>
                        </Field>
                    </Form>
                </Content>
                <Button aria-label="remove" onClick={onRemove} variant="secondary" >
                ❌ Remove
                </Button>
            </Card>
        </ThemeProvider>
    );
}
