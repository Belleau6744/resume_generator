import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import styled from 'styled-components';
import { PasswordValidationType, validatePassword } from 'utils/validation';
import { useSignupContext } from './useSignupContext';

const ListElement = styled.li`
    display: flex;
    align-items: center;
`;

const PasswordValidationTooltip = () => {
    const validation: PasswordValidationType = validatePassword(useSignupContext().passwordInput);
    const lengthIcon = useMemo(() => {
        return validation.length ? <CheckIcon color="success" fontSize='small'/> : <ClearIcon color="error" fontSize='small'/>
    }, [validation.length]);

    const lowerCase = useMemo(() => {
        return validation.lowerCase ? <CheckIcon color="success" fontSize='small'/> : <ClearIcon color="error" fontSize='small'/>
    }, [validation.lowerCase]);

    const number = useMemo(() => {
        return validation.number ? <CheckIcon color="success" fontSize='small'/> : <ClearIcon color="error" fontSize='small'/>
    }, [validation.number]);

    const specialChar = useMemo(() => {
        return validation.specialChar ? <CheckIcon color="success" fontSize='small'/> : <ClearIcon color="error" fontSize='small'/>
    }, [validation.specialChar]);

    const upperCase = useMemo(() => {
        return validation.upperCase ? <CheckIcon color="success" fontSize='small'/> : <ClearIcon color="error" fontSize='small'/>
    }, [validation.upperCase]);

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <ListElement>
            <div>{lengthIcon}</div>
            <Typography variant="caption" style={{ marginLeft: '0.5rem' }}>
                At least 8 characters
            </Typography>
        </ListElement>
        <ListElement>
            <div>{lowerCase}</div>
            <Typography variant="caption" style={{ marginLeft: '0.5rem' }}>
                Must contain at least 1 lower case
            </Typography>
        </ListElement>
        <ListElement>
            <div>{number}</div>
            <Typography variant="caption" style={{ marginLeft: '0.5rem' }}>
                Must contain 1 numerical value
            </Typography>
        </ListElement>
        <ListElement>
            <div>{specialChar}</div>
            <Typography variant="caption" style={{ marginLeft: '0.5rem' }}>
                At least 1 special character
            </Typography>
        </ListElement>
        <ListElement>
            <div>{upperCase}</div>
            <Typography variant="caption" style={{ marginLeft: '0.5rem' }}>
                Must contain at least 1 upper case
            </Typography>
        </ListElement>
      </ul>
    </div>
  );
};

export default PasswordValidationTooltip;
