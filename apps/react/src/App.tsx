import { Route, Routes } from "react-router-dom";
import { MainPage } from "./MainPage.tsx";
import { StorePage } from "./StorePage.tsx";


export function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/store" element={<StorePage />} />
        </Routes>
    );
}
