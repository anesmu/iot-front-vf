import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Modal, Box, TextField, Typography } from '@mui/material';
import { Device } from '../../../types/device';
import { GET_DEVICES } from '../../../graphql/queries/getDevice';
import { UPDATE_DEVICE } from '../../../graphql/mutations/updateDevice';
import { ADD_DEVICE } from '../../../graphql/mutations/addDevice';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../components/common/Button.styles';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: Device | null;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DeviceModal: React.FC<DeviceModalProps> = ({
  isOpen,
  onClose,
  device,
}) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    mobileNumber: '',
    lastConnection: '',
    latitude: '',
    longitude: '',
  });

  const [addDevice] = useMutation(ADD_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }],
  });

  const [updateDevice] = useMutation(UPDATE_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }],
  });

  useEffect(() => {
    if (device) {
      setFormData({
        id: device.id ?? '',
        name: device.name ?? '',
        mobileNumber: device.mobileNumber ?? '',
        lastConnection: device.lastConnection ?? '',
        latitude: device.latitude?.toString() ?? '',
        longitude: device.longitude?.toString() ?? '',
      });
    } else {
      setFormData({
        id: '',
        name: '',
        mobileNumber: '',
        lastConnection: '',
        latitude: '',
        longitude: '',
      });
    }
  }, [device]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const { name, mobileNumber, lastConnection, latitude, longitude } =
      formData;

    if (name || mobileNumber || lastConnection || latitude || longitude) {
      if (device) {
        updateDevice({
          variables: {
            id: formData.id,
            updateDeviceInput: {
              name: formData.name,
              mobileNumber: formData.mobileNumber,
              lastConnection: formData.lastConnection,
              latitude: parseFloat(formData.latitude),
              longitude: parseFloat(formData.longitude),
            },
          },
        });
      } else {
        addDevice({
          variables: {
            createDeviceInput: {
              name: formData.name,
              mobileNumber: formData.mobileNumber,
              lastConnection: formData.lastConnection,
              latitude: parseFloat(formData.latitude),
              longitude: parseFloat(formData.longitude),
            },
          },
        });
      }
      onClose();
    } else {
      alert('Al menos un campo debe estar relleno.');
    }
  };

  const isFormValid = () => {
    const { name, mobileNumber, lastConnection, latitude, longitude } =
      formData;
    return name || mobileNumber || lastConnection || latitude || longitude;
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {device ? 'Edit Device' : 'Add Device'}
        </Typography>
        <TextField
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Mobile Number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Last Connection"
          name="lastConnection"
          value={formData.lastConnection}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          fullWidth
        />
        <Box display="flex" flexDirection="column" marginTop={2}>
          <PrimaryButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            style={{ marginBottom: '10px' }}
          >
            {device ? 'Save Changes' : 'Add Device'}
          </PrimaryButton>
          <SecondaryButton
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </SecondaryButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeviceModal;
