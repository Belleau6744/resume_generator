import { Button, FormControl, FormControlLabel, FormLabel, TextField, Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { UserRole } from "@types";
import BackgroundComponent from "components/Background";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { STRINGS_ENG } from "../../assets/stringConstants";
import { initReviewerDBSpace, initStudentDBSpace } from "../../firebase/db_actions";
import { auth } from "../../firebase/firebase";
import { Features } from "../../redux/features";
import { capitalizeEveryWord } from "../../utils/stringUtils";
import { checkAllFields, validateEmail, validateKey, validatePassword } from "../../utils/validation";
import "../style.css";
import ConfirmPasswordValidationTooltip from "./ConfirmPasswordValidationTooltip";
import PasswordValidationTooltip from "./PasswordValidationTooltip";
import { SignupContext } from "./SignUpContext";

type ErrorsType = 'emailError' | 'passwordError' | 'keyError' | "firstNameError" | "lastNameError" | "_2nPasswordError";

const Signup = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState<boolean>(false);

    const [ user, setUser ] = useState<{
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        _2nPassword: string,
        userRole: UserRole,
        errors: Record<ErrorsType, string>,
        accessKey: string,
    }>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        _2nPassword: "",
        userRole: "student",
        errors: { emailError: "", passwordError: "", keyError: "", firstNameError: "", lastNameError: "", _2nPasswordError: ""},
        accessKey: ""
    });
    const [ keysList, setKeysList ] = useState<[]>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const HtmlTooltip = useCallback(styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(() => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#d8d8d8',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 300,
          padding: '20px',
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
        },
      })), []);
  

    /**
     * Update the user role selected
     */
    const handleChangeUserRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({
            ...prev,
            userRole: ((event.target as HTMLInputElement).value as UserRole)
        }));
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
        fieldId: string, 
        inputValue: string | UserRole, 
        type: ErrorsType
    ) => {
        setUser(prev => ({
            ...prev,
            [fieldId]: inputValue,
            errors: {
                ...prev.errors,
                [type]: ''
            }
        }))
    };

    /**
     * 
     * @param e Submit Event
     */
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const currentErrors: Record<ErrorsType, string> = {
            emailError: "",
            passwordError: "",
            keyError: "",
            firstNameError: "",
            lastNameError: "",
            _2nPasswordError: ""
        }

        /**
         * Validate inputs and update the associated errors
         */
        currentErrors.emailError = validateEmail(user.email) ? '' : STRINGS_ENG.invalid_email; 
        currentErrors.passwordError = checkAllFields(validatePassword(user.password)) ? '' : STRINGS_ENG.invalid_password;
        currentErrors.firstNameError = user.firstName === "" ? STRINGS_ENG.firstName_required : "";
        currentErrors.lastNameError = user.lastName === "" ? STRINGS_ENG.lastName_required : "";
        currentErrors.keyError = (
            user.userRole === 'student' || 
            (
                user.userRole === 'reviewer' && 
                keysList && 
                validateKey(user.accessKey, keysList)
            )
        ) ? 
        '' : STRINGS_ENG.invalid_key;
        setUser(prev => ({...prev, errors: currentErrors}));

        /**
         * Proceed if all inputs are free of error
         */
        if (Object.values(currentErrors).every(item => item === '')) {
            await createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((credentials) => {
                    if (user.userRole === 'student') {
                        initStudentDBSpace(credentials.user.uid).then(() => {
                            toast.success(capitalizeEveryWord(STRINGS_ENG.student_account_created), {
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
                            dispatch(Features.UserFeature.action.setUserRole(user.userRole));
                            dispatch(Features.UserFeature.action.setUserAuthStatus(true));
                            dispatch(Features.UserFeature.action.setUserID(credentials.user.uid));
                            updateProfile(credentials.user, {
                                displayName: `${user.firstName}$$$${user.lastName}`
                            })
                            dispatch(Features.UserFeature.action.setUserFirstName(user.firstName));
                            dispatch(Features.UserFeature.action.setUserLastName(user.lastName));
                        }).finally(() => {
                            nav("/");
                        });
                    } else {
                        initReviewerDBSpace(credentials.user.uid).then(() => {
                            toast.success(capitalizeEveryWord(STRINGS_ENG.reviewer_account_created), {
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
                            dispatch(Features.UserFeature.action.setUserRole(user.userRole));
                            dispatch(Features.UserFeature.action.setUserAuthStatus(true));
                            dispatch(Features.UserFeature.action.setUserID(credentials.user.uid));
                            updateProfile(credentials.user, {
                                displayName: `${user.firstName}$$$${user.lastName}`
                            });
                            dispatch(Features.UserFeature.action.setUserFirstName(user.firstName));
                            dispatch(Features.UserFeature.action.setUserLastName(user.lastName));
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
        <SignupContext.Provider value={{
            passwordInput: user.password,
            confirmPasswordInput: user._2nPassword
        }}>
        <BackgroundComponent>
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SignupContainer>
            <Typography paddingBottom={"30px"} variant="h3" fontWeight="800" fontFamily={"Montserrat, sans-serif"}>{capitalizeEveryWord(STRINGS_ENG.create_account)}</Typography>                
                <form onSubmit={onSubmit}>
                    <InputsWrapper>   
                        <div style={{ display: 'flex', gap: '15px', width: '100%', justifyContent: "space-between" }}>
                            <TextField
                                label='First Name'
                                type="text"
                                fullWidth
                                variant="outlined"
                                placeholder="First name"
                                error={user.errors.firstNameError !== ''}
                                helperText={user.errors.firstNameError}
                                value={user.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value, 'firstNameError')}
                            />
                            <TextField
                                label='Last Name'
                                type="text"
                                fullWidth
                                error={user.errors.lastNameError !== ''}
                                placeholder="Last name"
                                helperText={user.errors.lastNameError}
                                value={user.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value, 'lastNameError')}
                            />
                        </div> 
                        <TextField
                            label='Email'
                            type="email"
                            error={user.errors.emailError !== ''}
                            helperText={user.errors.emailError}
                            value={user.email}
                            onChange={(e) => handleInputChange("email", e.target.value, 'emailError')}
                            />
                        <HtmlTooltip arrow open={isPasswordFocused} autoFocus placement="right" title={<div><PasswordValidationTooltip /></div>}>
                            <TextField
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                type="password"
                                label='Password'
                                error={user.errors.passwordError !== ''}
                                helperText={user.errors.passwordError}
                                value={user.password}
                                onChange={(e) => handleInputChange("password", e.target.value, 'passwordError')}
                            />
                        </HtmlTooltip>
                        <HtmlTooltip arrow open={isConfirmPasswordFocused} autoFocus placement="right" title={<div><ConfirmPasswordValidationTooltip /></div>}>
                        <TextField
                            onFocus={() => setIsConfirmPasswordFocused(true)}
                            onBlur={() => setIsConfirmPasswordFocused(false)}
                            type="password"
                            label='Re-Enter Password'
                            error={user.errors._2nPasswordError !== ''}
                            helperText={user.errors._2nPasswordError}
                            value={user._2nPassword}
                            onChange={(e) => handleInputChange("_2nPassword", e.target.value, '_2nPasswordError')}
                            />
                        </HtmlTooltip>
                        <FormControl sx={{ display: 'flex'}}>  
                            <FormLabel sx={{ color: 'black', fontWeight: '700' }} focused={false} id="user-role-select-label">{'User Role'}</FormLabel>
                            <RadioGroup
                                value={user.userRole}
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
                        {user.userRole === 'reviewer' && (
                            <TextField
                                type='text'
                                label={STRINGS_ENG.enter_access_key}
                                error={user.errors.keyError !== ''}
                                helperText={user.errors.keyError}
                                value={user.accessKey}
                                onChange={(e) => handleInputChange("accessKey", e.target.value, 'keyError')}
                            />
                        )}
                    </InputsWrapper>
                    <Button sx={{ margin: '20px 0'}} color="charcoal" fullWidth variant="contained" type="submit">{capitalizeEveryWord(STRINGS_ENG.sign_up)}</Button>
                </form>
                <ExistingAccountWrapper>
                    <p>{STRINGS_ENG.already_have_account_q}</p>
                    <Link to="/login"><p style={{color: 'blue', fontWeight: 'bold'}}>{capitalizeEveryWord(STRINGS_ENG.log_in)}</p></Link>
                </ExistingAccountWrapper>
            </SignupContainer>
            </div>
        </BackgroundComponent>
        </SignupContext.Provider>
    )
};

const ExistingAccountWrapper = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const SignupContainer = styled.div`
    z-index: 20;
    background: #ffffff;
    display: flex;
    border-radius: 10px;
    padding: 50px;
    width: 500px;
    height: fit-content;
    flex-direction: column;
    box-shadow: rgba(0,0,0, 0.35) 0px 5px 15px;
`;

export default Signup;
