// fetchPatients.js
import api from '../services/api/api';

export const getPatients = async () => {
  try {
    const response = await api.get('/Patient/GetList');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePatient = async (updatedPatientData) => {
  try {
    const response = await api.post('/Patient/Update', updatedPatientData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

