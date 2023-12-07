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
import MyQuizPage from "./pages/MyQuizPage";
import SingleQuizPage from "./pages/SingleQuizPage";
import AllPublishedQuizzesPage from "./pages/AllPublishedQuizzesPage";
import StartExamPage from "./pages/StartExamPage";
import FavoriteQuestionPage from "./pages/FavoriteQuestionPage";

function App() {
  const [isSideBarVisibe, setIsSideBarVisibe] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [publishing, setPublishing] = useState(false);
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
          <div className="bg-[#FEF9C3]">
            <Header
              isMobileView={isMobileView}
              setIsMobileView={setIsMobileView}
              setIsSideBarVisibe={setIsSideBarVisibe}
              isSideBarVisibe={isSideBarVisibe}
            />
            <main
              className="font-[karla] relative"
              onClick={() => setIsMobileView(false)}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-quiz-home" element={<CreateQuizPage />} />
                <Route path="/create-new-quiz" element={<NewQuizPage />} />
                <Route path="/my-quizzes" element={<MyQuizPage />} />
                <Route
                  path="/my-quizzes/:quizId"
                  element={
                    <SingleQuizPage
                      setPublishing={setPublishing}
                      publishing={publishing}
                    />
                  }
                />
                <Route
                  path="/all-published-quiz"
                  element={<AllPublishedQuizzesPage />}
                />
                <Route path="/start-exam" element={<StartExamPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/change-name" element={<ChangeNamePage />} />
                <Route
                  path="/change-password"
                  element={<ChangePasswordPage />}
                />
                <Route path="/favorite-questions" element={<FavoriteQuestionPage />} />
              </Routes>
              {isSideBarVisibe && (
                <div
                  className="fixed top-0 left-0 w-full h-[100vh] z-10 bg-[#00000033]"
                  onClick={() => setIsSideBarVisibe(false)}
                />
              )}
              {isSideBarVisibe && (
                <SideBAr
                  setIsSideBarVisibe={setIsSideBarVisibe}
                  isSideBarVisibe={isSideBarVisibe}
                  setLoggingOut={setLoggingOut}
                />
              )}
              {loggingOut && <LogoutModel text="Logging out" />}
              {publishing && <LogoutModel text="" />}
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
