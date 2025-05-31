import { Routes, Route } from "react-router-dom";
import PreLoader from "./components/ui/PreLoader";
import MainPage from "./components/ui/MainPage";
import { AnimatePresence } from "motion/react";

function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<PreLoader />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
