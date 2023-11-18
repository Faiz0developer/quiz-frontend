import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { BrowserRouter} from "react-router-dom";
import { useSelector } from "react-redux";

// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/footer";
import RegisterLogin from "./components/RegisterLogin";
import SideBAr from "./components/layout/header/SideBAr";
import CreateQuizPage from "./pages/CreateQuizPage";
import ReportPage from "./pages/ReportPage";
import NewQuizPage from "./pages/NewQuizPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ChangeNamePage from "./pages/ChangeNamePage";
import LogoutModel from "./components/LogoutModel";

function App() {
  const [isSideBarVisibe, setIsSideBarVisibe] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const token = useSelector((state) => state.token.token);

  if (isSideBarVisibe) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  return (
    <>
      {!token ? (
        <RegisterLogin />
      ) : (
        <BrowserRouter>
          <Header
            setIsSideBarVisibe={setIsSideBarVisibe}
            isSideBarVisibe={isSideBarVisibe}
          />
          <main className="font-[karla] relative px-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-quiz-home" element={<CreateQuizPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/create-new-quiz" element={<NewQuizPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
              <Route path="/change-name" element={<ChangeNamePage />} />
            </Routes>
            {isSideBarVisibe && (
              <div
                className="fixed top-0 left-0 w-full h-[100vh] z-10 bg-[#00000033]"
                onClick={() => setIsSideBarVisibe(false)}
              />
            )}
            {isSideBarVisibe && (
              <SideBAr setIsSideBarVisibe={setIsSideBarVisibe} isSideBarVisibe={isSideBarVisibe} setLoggingOut={setLoggingOut} />
            )}
            {loggingOut && <LogoutModel/>}
          </main>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
