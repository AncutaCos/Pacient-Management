import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditPatientDialog = ({ open, onClose, onUpdatePatient, patient }) => {
  const [editedPatient, setEditedPatient] = useState({
    familyName: patient.familyName,
    givenName: patient.givenName,
    sex: patient.sex,
  });

  const handleFieldChange = (field, value) => {
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Assicurati di includere la data di nascita originale del paziente
      const updatedData = {
        ...editedPatient,
        id: patient.id,
        birthDate: patient.birthDate,
      };

      await onUpdatePatient(updatedData);
      onClose();
    } catch (error) {
      console.error("Errore durante l'aggiornamento del paziente:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{`Edit ${patient.givenName} ${patient.familyName}`}</DialogTitle>
      <DialogContent>
        <TextField
          label="Family Name"
          value={editedPatient.familyName}
          onChange={(e) => handleFieldChange("familyName", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Given Name"
          value={editedPatient.givenName}
          onChange={(e) => handleFieldChange("givenName", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Sex"
          value={editedPatient.sex}
          onChange={(e) => handleFieldChange("sex", e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditPatientDialog;
