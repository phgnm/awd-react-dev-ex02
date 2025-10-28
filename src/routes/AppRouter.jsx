import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhotoList from "../features/photos/pages/PhotosList";
import PhotoDetail from "../features/photos/pages/PhotoDetail";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/photos" replace />} />
                <Route path="/photos" element={<PhotoList />} />
                <Route path="/photos/:photoId" element={<PhotoDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;