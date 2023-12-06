import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getPatients, updatePatient } from "../services/fetchPatients";
import PatientDetailDialog from "./PatientDetailDialog";
import EditPatientDialog from "./EditPatientDialog";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "familyName", headerName: "Family Name", width: 150 },
    { field: "givenName", headerName: "Given Name", width: 150 },
    { field: "sex", headerName: "Sex", width: 100 },
    {
      field: "birthDate",
      headerName: "Birth Date",
      width: 150,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString("en-US"),
    },
    {
      field: "numParameters",
      headerName: "Num Parameters",
      width: 150,
    },
    {
      field: "hasAlarm",
      headerName: "Alarm",
      width: 100,
      renderCell: (params) =>
        params.row.hasAlarm ? <div style={{ color: "red" }}>Alarm</div> : null,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <button onClick={() => handleEditButtonClick(params.row)}>Edit</button>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const patientsData = await getPatients();
      const formattedPatients = patientsData.map((patient) => ({
        ...patient,
        numParameters: patient.parameters.length,
        hasAlarm: patient.parameters.some((param) => param.alarm),
      }));
      setPatients(formattedPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setOpenDetailDialog(true);
  };

  const handleEditButtonClick = (patient) => {
    setSelectedPatient(patient);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={patients}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={(params) => handlePatientClick(params.row)}
      />
      {selectedPatient && (
        <>
          <PatientDetailDialog
            open={openDetailDialog}
            onClose={() => setOpenDetailDialog(false)}
            patient={selectedPatient}
          />
          <EditPatientDialog
            open={openEditDialog}
            onClose={handleEditDialogClose}
            patient={selectedPatient}
            onUpdatePatient={updatePatient} 
          />
        </>
      )}
    </div>
  );
};

export default PatientList;
