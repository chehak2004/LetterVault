import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ViewLettersPage from "./pages/ViewLettersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/view-letters" element={<ViewLettersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
