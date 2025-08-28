import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Admin/Dashboard";
import InstitutesList from "./components/Admin/InstitutesList";
import InstituteDashboard from "./components/Admin/InstituteDashboard";
import EditInstitute from "./components/Admin/EditInstitute";
import StudentsList from "./components/Admin/StudentsList";
import StudentDashboard from "./components/Admin/StudentDashboard";
import EditStudent from "./components/Admin/EditStudent";
import ReviewsList from "./components/Admin/ReviewsList";
import EditReview from "./components/Admin/EditReview";
import JobsList from "./components/Admin/JobsList";
import JobDetails from "./components/Admin/JobDetails";
import EditJob from "./components/Admin/EditJob";
import TeamList from "./components/Admin/TeamList";
import TeamMemberDetails from "./components/Admin/TeamMemberDetails";
import EditTeamMember from "./components/Admin/EditTeamMember";

const App = () => {
  return (
    <Routes>
     
      <Route path="/" element={<Dashboard />} />
     <Route path="/admin/institutes" element={<InstitutesList />} />
        <Route path="/admin/institute/dashboard/:id" element={<InstituteDashboard />} />
      <Route path="/admin/institutes/edit/:id" element={<EditInstitute />} />
      <Route path="/admin/institutes/add" element={<EditInstitute />} />
      <Route path="/admin/students" element={<StudentsList />} />
      <Route path="/admin/students/:id" element={<StudentDashboard />} />
      <Route path="/admin/students/edit/:id" element={<EditStudent />} />
      <Route path="/admin/students/add" element={<EditStudent />} />
      <Route path="/admin/reviews" element={<ReviewsList />} />
      <Route path="/admin/reviews/edit/:id" element={<EditReview />} />
      <Route path="/admin/reviews/add" element={<EditReview />} />
      <Route path="/admin/jobs" element={<JobsList />} />
      <Route path="/admin/jobs/:id" element={<JobDetails />} />
      <Route path="/admin/jobs/edit/:id" element={<EditJob />} />
      <Route path="/admin/jobs/add" element={<EditJob />} />
      <Route path="/admin/team" element={<TeamList />} />
      <Route path="/admin/team/:id" element={<TeamMemberDetails />} />
      <Route path="/admin/team/edit/:id" element={<EditTeamMember />} />
      <Route path="/admin/team/add" element={<EditTeamMember />} />
    </Routes>
  );
};

export default App;
