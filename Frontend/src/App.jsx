import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";

import StudentDashboard from "./Pages/Student_Pages/StudentDashboard";
import QuizPage from "./Pages/Student_Pages/QuizPage";
import ResultsPage from "./Pages/Student_Pages/ResultsPage";
import PYQsPage from "./Pages/Student_Pages/PYQsPage";
import SyllabusPage from "./Pages/Student_Pages/SyllabusPage";
import MaterialsPage from "./Pages/Student_Pages/MaterialsPage";
import RanksPage from "./Pages/Student_Pages/RanksPage";
import MyTeachersPage from "./Pages/Student_Pages/MyTeachersPage";
import CompletedQuizPage from "./Pages/Student_Pages/CompletedQuizPage"
import UpcomingQuizPage from "./Pages/Student_Pages/UpcomingQuizPage"
import PendingQuizPage from "./Pages/Student_Pages/PendingQuizPage"

import TeacherDashboard from "./Pages/Teacher_Pages/TeacherDashboard";
import CompletedQuizzes from "./Pages/Teacher_Pages/CompletedQuizzes";
import AssignQuizzes from "./Pages/Teacher_Pages/AssignQuizzes";
import PYQs from "./Pages/Teacher_Pages/PYQs";
import Syllabus from "./Pages/Teacher_Pages/Syllabus";
import Materials from "./Pages/Teacher_Pages/Materials";
import ViewRanks from "./Pages/Teacher_Pages/ViewRanks";
import MyStudents from "./Pages/Teacher_Pages/MyStudents";

import AdminDashboard from "./Pages/Admin_Pages/AdminDashboard"
import Year1StudentsPage from "./Pages/Admin_Pages/Year1StudentsPage"
import Year2StudentsPage from "./Pages/Admin_Pages/Year2StudentsPage"
import Year3StudentsPage from "./Pages/Admin_Pages/Year3StudentsPage"
import Year4StudentsPage from "./Pages/Admin_Pages/Year4StudentsPage"
import AdminTeachersPage from "./Pages/Admin_Pages/AdminTeachersPage"
import AdminLabfacPage from "./Pages/Admin_Pages/AdminLabfacPage"
import AdminAdminPage from "./Pages/Admin_Pages/AdminAdminPage"
import QuizzesUploaded from "./Pages/Admin_Pages/QuizzesUploaded";
import QuizzesCorrectionPage from "./Pages/Admin_Pages/QuizzesCorrectionPage.jsx";
import AdminPYQsPage from "./Pages/Admin_Pages/AdminPYQsPage.jsx";
import AdminSyllabusPage from "./Pages/Admin_Pages/AdminSyllabusPage"
import AdminMaterialsPage from "./Pages/Admin_Pages/AdminMaterialsPage.jsx";
import AdminRanksPage from "./Pages/Admin_Pages/AdminRanksPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>

                <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
                <Route path="/CompletedQuizPage" element={<CompletedQuizPage/>}/>
                <Route path="/UpcomingQuizPage" element={<UpcomingQuizPage/>}/>
                <Route path="/PendingQuizPage" element={<PendingQuizPage/>}/>
                <Route path="/QuizPage" element={<QuizPage/>}/>
                <Route path="/ResultsPage" element={<ResultsPage/>}/>
                <Route path="/PYQsPage" element={<PYQsPage/>}/>
                <Route path="/SyllabusPage" element={<SyllabusPage/>}/>
                <Route path="/MaterialsPage" element={<MaterialsPage/>}/>
                <Route path="/RanksPage" element={<RanksPage/>}/>
                <Route path="/MyTeachersPage" element={<MyTeachersPage/>}/>

                <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
                <Route path="/CompletedQuizzes" element={<CompletedQuizzes />} />
                <Route path="/AssignQuizzes" element={<AssignQuizzes />} />
                <Route path="/PYQs" element={<PYQs />} />
                <Route path="/Syllabus" element={<Syllabus />} />
                <Route path="/Materials" element={<Materials />} />
                <Route path="/ViewRanks" element={<ViewRanks />} />
                <Route path="/MyStudents" element={<MyStudents />} />

                <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
                <Route path="/Year1StudentsPage" element={<Year1StudentsPage/>}/>
                <Route path="/Year2StudentsPage" element={<Year2StudentsPage/>}/>
                <Route path="/Year3StudentsPage" element={<Year3StudentsPage/>}/>
                <Route path="/Year4StudentsPage" element={<Year4StudentsPage/>}/>
                <Route path="/AdminTeachersPage" element={<AdminTeachersPage/>}/>
                <Route path="/AdminLabfacPage" element={<AdminLabfacPage/>}/>
                <Route path="/AdminAdminPage" element={<AdminAdminPage/>}/>
                <Route path="/QuizzesUploaded" element={<QuizzesUploaded/>}/>
                <Route path="/QuizzesCorrectionPage" element={<QuizzesCorrectionPage/>}/>
                <Route path="/AdminPYQsPage" element={<AdminPYQsPage/>}/>
                <Route path="/AdminSyllabusPage" element={<AdminSyllabusPage/>}/>
                <Route path="/AdminMaterialsPage" element={<AdminMaterialsPage/>}/>
                <Route path="/AdminRanksPage" element={<AdminRanksPage/>}/>

                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Router>
    );
}

export default App;