import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import BackgroundComponent from 'components/Background';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Features } from 'redux/features';
import styled from 'styled-components';
import { getFirstLastNameFromDisplayName } from 'utils/stringUtils';
import LockIcon from '../../assets/Icons/LockIcon';
import UserIcon from '../../assets/Icons/UserIcon';
import { STRINGS_ENG } from '../../assets/stringConstants';
import { auth } from '../../firebase/firebase';
import "../style.css";

const Login = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
            const { firstName, lastName } = getFirstLastNameFromDisplayName(auth.user.displayName);
            dispatch(Features.UserFeature.action.setUserFirstName(firstName));
            dispatch(Features.UserFeature.action.setUserLastName(lastName));
            nav("/");
        })
        .catch((error) => {
            // TODO Handle error
            console.warn(error.message);
            // const errorCode = error.code;
            // const errorMessage = error.message;
        })
    };
    

    return (
        <BackgroundComponent>
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LoginContainer>
                <Typography paddingBottom={"30px"} variant="h3" fontWeight="800" fontFamily={"Montserrat, sans-serif"}>Login</Typography>                
                <InputsWrapper>
                    <TextField
                        id="email-address"
                        name="email"
                        type="email"
                        variant='outlined'
                        placeholder="Email Address"
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <UserIcon />
                                </InputAdornment>
                            ),
                            }}
                        />
                    <TextField
                        id="password"
                        name="password"
                        variant="outlined"
                        type="password"
                        required
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <LockIcon />
                                </InputAdornment>
                            ),
                            }}
                        />
                </InputsWrapper>
                <Button sx={{ marginTop: "30px", marginBottom: "10px" }} size="large" fullWidth variant="contained" color="midnightBlue" onClick={onLogin}>Login</Button>
                
                <div className='text-sm text-white text-center'>
                    {STRINGS_ENG.no_account_q}&nbsp;
                    <Link style={{color: 'blue'}} to="/signup">
                        <Typography variant="body1">Sign up</Typography>
                    </Link>
                </div>
            </LoginContainer>
            </div>
        </BackgroundComponent>
    )
};
const LoginContainer = styled.div`
    display: flex;
    background: white;
    border-radius: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 50px;
    padding-bottom: 40px;
    z-index: 20;
    width: 400px;
    height: 400px;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const InputsWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 24px;
`;

export default Login;