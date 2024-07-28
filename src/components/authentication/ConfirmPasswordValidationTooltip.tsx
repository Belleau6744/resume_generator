import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useSignupContext } from './useSignupContext';

const ListElement = styled.li`
    display: flex;
    align-items: center;
`;

const ConfirmPasswordValidationTooltip = () => {
    const { passwordInput, confirmPasswordInput } = useSignupContext();

    const isMatching = useMemo(() => {
        return (passwordInput === confirmPasswordInput && passwordInput !== '') ? <CheckIcon color="success" fontSize='small'/> : <ClearIcon color="error" fontSize='small'/>
    }, [confirmPasswordInput, passwordInput]);

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <ListElement>
            <div>{isMatching}</div>
            <Typography variant="caption" style={{ marginLeft: '0.5rem' }}>
                Must match entered password
            </Typography>
        </ListElement>
      </ul>
    </div>
  );
};

export default ConfirmPasswordValidationTooltip;
