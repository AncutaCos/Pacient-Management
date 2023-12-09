import React from 'react';
import PatientList from './components/PatientList';
import Footer from './components/Footer';
 
function App() {
  return (
    <div>
      <h1>Patient Management App</h1>
      <PatientList />
      <Footer />
    </div>
  );
}

export default App;