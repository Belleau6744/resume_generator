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
        <Container>
            <LoginContainer>
                <h2>Login</h2>
                <form>
                    <InputsWrapper>
                        <InputContainer>
                            <IconHolder><UserIcon /></IconHolder>
                            <StyledInput
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder='Email Address'
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                        </InputContainer>
                        <InputContainer>
                            <IconHolder><LockIcon /></IconHolder>
                            <StyledInput
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </InputContainer>
                    </InputsWrapper>
                    <ButtonWrapper><LoginButton onClick={onLogin}>Login</LoginButton></ButtonWrapper>
                </form>
                <p className='text-sm text-white text-center'>
                    {STRINGS_ENG.no_account_q}&nbsp;
                    <Link style={{color: 'blue'}} to="/signup">
                        Sign up
                    </Link>
                </p>
            </LoginContainer>
        </Container>
    )
};

const Container = styled.div`
    background: white;
    padding: 24px;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 24px;
`;

const LoginContainer = styled.div`
    display: flex;
    padding: 24px;
    width: 400px;
    height: 400px;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid black;
    &:focus-within {
        outline: 1px solid #d3d3d3;
        outline-offset: -1px;
    }
`;

const StyledInput = styled.input`
    background: white;
    flex: 1;
    padding-left: 8px;
    color: black;
    height: 40px;
    border: none;
    &::placeholder {
        color: gray;
    }
    &:focus {
        border: none;
        outline: 1px solid #3a9fbf;
    }
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const ButtonWrapper = styled.div`
    padding-top: 36px;
`;

const IconHolder = styled.div`
    width: 40px;
    height: 40px;
    padding: 1px;
    border-right: 1px solid black;
`;

const LoginButton = styled.button`
    border: 0;
    border-radius: 8px;
    width: 100%;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    background: black;
    font-family: -apple-system, system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 2.5;
    outline: transparent;
    padding: 0 1rem;
    text-align: center;
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

export default Login;