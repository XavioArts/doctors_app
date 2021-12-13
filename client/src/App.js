import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import PatientShow from './pages/PatientShow';
import PatientEdit from './pages/PatientEdit';
import Appointments from './pages/Appointments';
import DoctorShow from './pages/DoctorShow';
import EditDoctor from './pages/EditDoctor';
import DocAppointmentShow from './pages/DocAppointmentShow';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorShow />} />
        <Route path="/doctors/:id/edit" element={<EditDoctor />} />
        <Route path="/doctors/:doctor_id/appointments/:id" element={<DocAppointmentShow />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:id" element={<PatientShow />} />
        <Route path="/patients/:id/edit" element={<PatientEdit />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </div>
  );
}

export default App;
