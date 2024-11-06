import { Button, Div, Flex } from "@workleap/orbiter-ui";
import { Link, Outlet } from "react-router-dom";

import { MovieFinder, SelectedMovie } from "../../widgets/movie-widgets/dist/react/index.js";

import { AppContextProvider, useAppContext } from "./AppContext.tsx";

export function Layout() {
    const { setTheme } = useAppContext();

    return (
        <AppContextProvider>
            <Div>
                <header style={{ borderBottom: "1px solid black", padding: "5px", display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <h1>React App</h1>
                        <Link to="/">Buy Tickets</Link> &nbsp;
                        <Link to="/store">Online Shop</Link>
                    </div>
                    <Flex
                        direction="column"
                        style={{
                            justifyContent: "center",
                            padding: "5px"
                        }}
                    >

                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                                const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
                                document.documentElement.setAttribute("data-theme", newTheme);
                                setTheme(newTheme);
                                window.MovieWidgets?.update({ theme: newTheme });
                            }}
                        >Change Theme</Button>
                        <SelectedMovie />
                    </Flex>
                </header>
                <main>
                    <Outlet />
                </main>
            </Div>
            <MovieFinder />
        </AppContextProvider>
    );
}
