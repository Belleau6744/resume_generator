import { FormControl, FormControlLabel, FormLabel, InputAdornment, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import LockIcon from "../../assets/Icons/LockIcon";
import UserIcon from "../../assets/Icons/UserIcon";
import { STRINGS_ENG } from "../../assets/stringConstants";
import { initReviewerDBSpace, initStudentDBSpace } from "../../firebase/db_actions";
import { auth } from "../../firebase/firebase";
import { Features } from "../../redux/features";
import { UserRole } from "../../types/dbStructType";
import { capitalizeEveryWord } from "../../utils/stringUtils";
import { validateEmail, validateKey, validatePassword } from "../../utils/validation";

type ErrorsType = 'emailError' | 'passwordError' | 'keyError';

const Signup = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ userRole, setUserRole ] = useState<UserRole>('student');
    const [ errors, setErrors ] = useState<Record<ErrorsType, string>>({emailError: '', passwordError: '', keyError: ''});
    const [ accessKey, setAccessKey ] = useState<string>('');
    const [ keysList, setKeysList ] = useState<[]>([]);

    /**
     * Update the user role selected
     */
    const handleChangeUserRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserRole((event.target as HTMLInputElement).value as UserRole);
    };

    /**
     * FETCHING 
     */ 
    const db = getDatabase();
    const dbRef = ref(db, `accessKeys`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setKeysList(snapshot.val());
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Centralized input update function, clearing previous associated errors
     * @param setter SetState function associated with the input being updated
     * @param inputValue Current input value
     * @param type Type of the input being updated: Email | Password | AccessKey
     */
    const handleInputChange = (
        setter: React.Dispatch<React.SetStateAction<string | UserRole>>, 
        inputValue: string | UserRole, 
        type: ErrorsType
    ) => {
        setErrors(prev => ({
            ...prev,
            [type]: ''
        }));
        setter(inputValue);
    };


    /**
     * 
     * @param e Submit Event
     */
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const currentErrors = {
            emailError: '',
            passwordError: '',
            keyError: '',
        }

        /**
         * Validate inputs and update the associated errors
         */
        currentErrors.emailError = validateEmail(email) ? '' : STRINGS_ENG.invalid_email; 
        currentErrors.passwordError = validatePassword(password) ? '' : STRINGS_ENG.invalid_password;
        currentErrors.keyError = (userRole === 'student' || 
            (userRole === 'reviewer' && keysList && validateKey(accessKey, keysList))) ? '' : STRINGS_ENG.invalid_key;
        setErrors(currentErrors);

        /**
         * Proceed if all inputs are free of error
         */
        if (Object.values(currentErrors).every(item => item === '')) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((credentials) => {
                    if (userRole === 'student') {
                        initStudentDBSpace(credentials.user.uid).then(() => {
                            toast.success(STRINGS_ENG.student_account_created, {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                transition: Bounce,
                            })
                            dispatch(Features.UserFeature.action.setUserRole(userRole))
                            dispatch(Features.UserFeature.action.setUserAuthStatus(true));
                            dispatch(Features.UserFeature.action.setUserID(credentials.user.uid))
                        }).finally(() => {
                            nav("/");
                        });
                    } else {
                        initReviewerDBSpace(credentials.user.uid).then(() => {
                            toast.success(STRINGS_ENG.student_account_created, {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                transition: Bounce,
                            })
                            dispatch(Features.UserFeature.action.setUserRole(userRole))
                            dispatch(Features.UserFeature.action.setUserAuthStatus(true));
                            dispatch(Features.UserFeature.action.setUserID(credentials.user.uid))
                        }).finally(() => {
                            nav("/");
                        });
                    }
                })
                .catch((error) => {
                    console.warn(error);
                })
        } else {
            console.log('Missing information');
        }
    }

    return (
        <Container>
            <SignupContainer>
                <h2>{capitalizeEveryWord(STRINGS_ENG.create_account)}</h2>
                <form onSubmit={onSubmit}>
                    <InputsWrapper>    
                        <TextField
                            label='Email'
                            type="email"
                            error={errors.emailError !== ''}
                            helperText={errors.emailError}
                            value={email}
                            onChange={(e) => handleInputChange(setEmail, e.target.value, 'emailError')}
                            // placeholder="Email Address"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <UserIcon />
                                    </InputAdornment>
                                ),
                                }}
                            />
                        <TextField
                            type="password"
                            label='Password'
                            error={errors.passwordError !== ''}
                            helperText={errors.passwordError}
                            value={password}
                            onChange={(e) => handleInputChange(setPassword, e.target.value, 'passwordError')}
                            // placeholder="Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <LockIcon />
                                    </InputAdornment>
                                ),
                                }}
                            />
                        
                        <FormControl sx={{ display: 'flex'}}>  
                            <FormLabel sx={{ color: 'black', fontWeight: '700' }} focused={false} id="user-role-select-label">{'User Role'}</FormLabel>
                            <RadioGroup
                                value={userRole}
                                onChange={handleChangeUserRole}
                                aria-labelledby="user-role-select"
                                defaultValue={'student'}
                                row
                                name="user-role-select"
                            >
                                <FormControlLabel value={'student'} control={<Radio />} label={capitalizeEveryWord(STRINGS_ENG.student_role)} />
                                <FormControlLabel value={'reviewer'} control={<Radio />} label={capitalizeEveryWord(STRINGS_ENG.reviewer_role)} />
                            </RadioGroup>
                        </FormControl>
                        {userRole === 'reviewer' && (
                            <TextField
                                type='text'
                                label={STRINGS_ENG.enter_access_key}
                                error={errors.keyError !== ''}
                                helperText={errors.keyError}
                                value={accessKey}
                                onChange={(e) => handleInputChange(setAccessKey, e.target.value, 'keyError')}
                            />
                        )}
                    </InputsWrapper>
                      
                    <ButtonWrapper>
                        <SignupButton type="submit">{capitalizeEveryWord(STRINGS_ENG.sign_up)}</SignupButton>
                    </ButtonWrapper>
                </form>
                <ExistingAccountWrapper>
                    <p>{STRINGS_ENG.already_have_account_q}</p>
                    <Link to="/login"><p style={{color: 'blue', fontWeight: 'bold'}}>{capitalizeEveryWord(STRINGS_ENG.log_in)}</p></Link>
                </ExistingAccountWrapper>
            </SignupContainer>
        </Container>
    )
};

const ExistingAccountWrapper = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const SignupButton = styled.button`
    border: 0;
    border-radius: 8px;
    width: 100%;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui,"Segoe UI",Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 2.5;
    outline: transparent;
    padding: 0 1rem;
    text-align: center;
    background: black;
    text-decoration: none;
    transition: box-shadow .2s ease-in-out;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    &:focus {
        outline: 1px solid blue;
    }
`;

const Container = styled.div`
    background: white;
    padding: 24px;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 24px;
    align-self: center;
`;

const ButtonWrapper = styled.div`
    padding-top: 36px;
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const SignupContainer = styled.div`
    display: flex;
    padding: 24px;
    width: 400px;
    height: fit-content;
    flex-direction: column;
    box-shadow: rgba(0,0,0, 0.35) 0px 5px 15px;
`;

export default Signup;
