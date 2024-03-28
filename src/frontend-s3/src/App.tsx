import { BrowserRouter, Route, Routes } from "react-router-dom";
import Survey from "./pages/survey";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:companyIdentifier" element={<Survey />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
