import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditPatientDialog from './EditPatientDialog';

const PatientDetailDialog = ({ open, onClose, patient, onUpdatePatient }) => {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{`${patient.givenName} ${patient.familyName} Details`}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Details:</Typography>
        <Typography>
          <strong>ID:</strong> {patient.id}
        </Typography>
        <Typography>
          <strong>Family Name:</strong> {patient.familyName}
        </Typography>
        <Typography>
          <strong>Given Name:</strong> {patient.givenName}
        </Typography>
        <Typography>
          <strong>Sex:</strong> {patient.sex}
        </Typography>
        <Typography>
          <strong>Birth Date:</strong>{' '}
          {new Date(patient.birthDate).toLocaleDateString('en-US')}
        </Typography>

        <Typography variant="h6">Parameters:</Typography>
        {patient.parameters.map((param) => (
          <div key={param.id}>
            <Typography>
              <strong>Parameter ID:</strong> {param.id}
            </Typography>
            <Typography>
              <strong>Name:</strong> {param.name}
            </Typography>
            <Typography>
              <strong>Value:</strong> {param.value}
            </Typography>
            <Typography>
              <strong>Alarm:</strong> {param.alarm ? 'Yes' : 'No'}
            </Typography>
            <br />
          </div>
        ))}
        
        <Button variant="outlined" onClick={handleEditClick}>
          Edit Patient
        </Button>

        <EditPatientDialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          patient={patient}
          onUpdatePatient={onUpdatePatient}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailDialog;
