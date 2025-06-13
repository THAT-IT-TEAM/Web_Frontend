import { Routes, Route, useLocation } from "react-router-dom";
import PreLoader from "./components/ui/PreLoader";
import MainPage from "./components/ui/MainPage";
import { AnimatePresence, motion } from "motion/react";
import Login from "./components/ui/Login";
import User from "./components/ui/User/User";
import Admin from "./components/ui/Admin/Admin";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <PreLoader />
            </PageWrapper>
          }
        />
        <Route
          path="/main"
          element={
            <PageWrapper>
              <MainPage />
            </PageWrapper>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

const PageWrapper = ({ children }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
