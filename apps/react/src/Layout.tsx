// apps/react/src/Layout.tsx
import { Button, Div, Flex } from "@workleap/orbiter-ui";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MovieFinder, SelectedMovie } from "../widgets/Widgets.tsx";
import { AppContextProvider, useAppContext } from "./AppContext.tsx";


export function Layout() {
    const { setTheme } = useAppContext();

    return (
        <AppContextProvider>
            <Div>
                <header style={{ borderBottom: "1px solid black", padding: "5px" }}>
                    <h1>React App</h1>

                    <Link to="/">Buy Tickets</Link> &nbsp;
                    <Link to="/store">Online Shop</Link>
                    <Flex
                        direction="column"
                        style={{
                            float: "right",
                            display: "fixed",
                            top: "10px",
                            position: "absolute",
                            right: "10px",
                            width: "200px"
                        }}
                    >

                        <Button
                            size="sm"
                            variant="secondary"
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
