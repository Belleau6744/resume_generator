import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserIcon from '../../assets/Icons/UserIcon';
import { useEffect, useState, MouseEvent } from 'react';
import { Features } from '../../redux/features';
import { useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { initUserDBSpace } from '../../firebase_setup/db_actions';
import LockIcon from '../../assets/Icons/LockIcon';
import { auth } from '../../firebase_setup/firebase';

const Login = () => {
    const nav = useNavigate();
    const isSignedIn = useSelector(Features.UserFeature.selector.isUserSignedIn);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userList, setUserList] = useState<any>();

    useEffect(() => {
        if(isSignedIn) {
            nav("/resume-generator/");
        }
    }, [isSignedIn, nav])

    const onLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            if(userList[user.uid] === undefined) {
                initUserDBSpace(user.uid);
            }
            nav("resume-generator/");
        })
        .catch((error) => {
            // TODO Handle error
            console.log(error.message);
            // const errorCode = error.code;
            // const errorMessage = error.message;
        })
    };
    

    return (
        <Container>
            <Title><Link to="/resume-generator/login">Resume Generator</Link></Title>
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
                    No account yet? {' '}
                    <Link to="/resume-generator/signup">
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
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 24px;
    align-self: center;
`;

const LoginContainer = styled.div`
    display: flex;
    padding: 24px;
    width: 400px;
    height: 400px;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Title = styled.div`
    font-weight: 700;
    position: absolute;
    top: 0;
    margin: 36px;
    left: 0;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid black;
`;

const StyledInput = styled.input`
    background: none;
    flex: 1;
    padding-left: 8px;
    color: white;
    height: 40px;
    border: none;
    &::placeholder {
        color: white;
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
    transistion: box-shadow .2s ease-in-out;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    &:focus {
        outline: 1px solid blue;
    }
`;

export default Login;