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

function App() {
  const [isSideBarVisibe,setIsSideBarVisibe] = useState(false)
  const user = useSelector((state) => state.token);
  return (
    <>
      {!user.token ? (
        <RegisterLogin />
      ) : (
        <BrowserRouter>
          <Header setIsSideBarVisibe={setIsSideBarVisibe} isSideBarVisibe={isSideBarVisibe} />
          <main className="font-[karla] relative px-6 ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-quiz-home" element={<CreateQuizPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/create-new-quiz" element={<NewQuizPage />} />
            </Routes>
            {isSideBarVisibe?<SideBAr userName={user.name} setIsSideBarVisibe={setIsSideBarVisibe} />:""}
          </main>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
