import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../components/common/Button.styles';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
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

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Deletion
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this device?
        </Typography>
        <PrimaryButton
          variant="contained"
          color="secondary"
          onClick={onConfirm}
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Delete
        </PrimaryButton>
        <SecondaryButton
          variant="contained"
          onClick={onClose}
          fullWidth
          style={{ marginTop: '10px' }}
        >
          Cancel
        </SecondaryButton>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
