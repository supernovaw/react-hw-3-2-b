import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ServiceDetails from "./ServiceDetails";
import ServicesPage from "./ServicesPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" end element={<ServicesPage />} />
          <Route path="/:id/details" end element={<ServiceDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
