import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { GET_DEVICES } from '../../graphql/queries/getDevice';
import { DELETE_DEVICE } from '../../graphql/mutations/deleteDevice';
import { Device } from '../../types/device';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import {
  ContentContainer,
  PageContainer,
  Title,
  TitleContainer,
} from './Device.styles';
import { PrimaryButton } from '../../components/common/Button.styles';
import DeviceModal from './components/DeviceModal';
import ConfirmationModal from './components/ConfirmationModal';

const StyledTableHead = styled(TableHead)`
  background-color: #f2f2f2;
  & th {
    font-weight: bold;
  }
`;

const StyledTableRow = styled(TableRow)`
  border-bottom: 2px solid black;
`;

const Devices: React.FC = () => {
  const { loading, error, data } = useQuery<{ devices: Device[] }>(GET_DEVICES);
  const [deleteDevice] = useMutation(DELETE_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }],
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedDevice, setSelectedDevice] = React.useState<Device | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id?: string) => {
    deleteDevice({ variables: { id } });
    setIsConfirmationModalOpen(false);
  };

  const handleEdit = (device: Device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedDevice(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenConfirmationModal = (device: Device) => {
    setSelectedDevice(device);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <PageContainer>
      <ContentContainer>
        <TitleContainer>
          <Title>Devices List</Title>
          <PrimaryButton
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Device
          </PrimaryButton>
        </TitleContainer>
        <Paper>
          <TableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Last Connection</TableCell>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </StyledTableHead>
              <StyledTableRow />
              <TableBody>
                {data?.devices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((device: Device, index: number) => (
                    <TableRow key={device.id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>{' '}
                      {/* Añadido */}
                      <TableCell>{device.id}</TableCell>
                      <TableCell>{device.name}</TableCell>
                      <TableCell>{device.mobileNumber}</TableCell>
                      <TableCell>{device.lastConnection}</TableCell>
                      <TableCell>{device.latitude}</TableCell>
                      <TableCell>{device.longitude}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(device)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenConfirmationModal(device)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.devices.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <DeviceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          device={selectedDevice}
        />
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleCloseConfirmationModal}
          onConfirm={() => handleDelete(selectedDevice?.id)}
        />
      </ContentContainer>
    </PageContainer>
  );
};

export default Devices;
