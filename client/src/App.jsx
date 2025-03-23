import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from './utils/AuthContext';
import NotFound from "./page/NotFound";
import LegalQuiz from "./page/DailyQuizPage";
import QuizPage from "./page/Quiz";
const Home = lazy(() => import("./page/Home.jsx"));
const RegistrationPage = lazy(() => import("./page/RegistrationPage.jsx"));
const LoginPage = lazy(()=>import("./page/LoginPage.jsx"))
const CaseDocumentsPage = lazy(() => import("./page/caseDocumentsPage.jsx"));
const MarkDown = lazy(() => import("./page/MarkDown.jsx"));
const Chatbot = lazy(() => import("./page/Chatbot.jsx"));
function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case" element={<CaseDocumentsPage />} />
            <Route path="/case/:id" element={<MarkDown />} />
            <Route path="/chat" element={<Chatbot/>} />
            <Route path="/quiz" element={<QuizPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/daily-quiz" element={<LegalQuiz />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
