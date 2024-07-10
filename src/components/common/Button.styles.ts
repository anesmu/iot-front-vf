import styled from 'styled-components';
import { Button } from '@mui/material';

export const PrimaryButton = styled(Button)`
  background-color: red !important;
  color: white !important;

  &:hover {
    background-color: darkred !important;
  }

  &:disabled {
    background-color: #f0f0f0 !important;
    color: #c0c0c0 !important;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: white !important;
  color: black !important;
  border: 1px solid black !important;

  &:hover {
    background-color: lightgray !important;
  }

  &:disabled {
    background-color: #f0f0f0 !important;
    color: #c0c0c0 !important;
    border: 1px solid #c0c0c0 !important;
  }
`;
