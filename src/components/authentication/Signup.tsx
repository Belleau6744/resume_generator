import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase_setup/firebase";
import styled from "styled-components";
import UserIcon from "../../assets/Icons/UserIcon";
import LockIcon from "../../assets/Icons/LockIcon";


const Signup = () => {
    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: any) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                nav("/resume-generator/login");
            })
            .then((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
    }

    return (
        <Container>
            <Title><Link to="/resume-generator/login">Resume Generator</Link></Title>
            <SignupContainer>
                <h2>Create Account</h2>
                <form>
                    <InputsWrapper>
                        <InputContainer>
                            <IconHolder><UserIcon /></IconHolder>
                            <StyledInput
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email Address"
                                />
                        </InputContainer>
                        <InputContainer>
                            <IconHolder><LockIcon /></IconHolder>
                            <StyledInput
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                                />
                        </InputContainer>
                    </InputsWrapper>
                    <ButtonWrapper>
                        <SignupButton type="submit" onClick={onSubmit}>Sign up</SignupButton>
                    </ButtonWrapper>
                </form>
                <ExistingAccountWrapper>
                    <p>Already have an account?</p>
                    <Link to="/resume-generator/login"><p style={{color: 'black', fontWeight: 'bold'}}>Login</p></Link>
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
`;

const IconHolder = styled.div`
    width: 40px;
    height: 40px;
    padding: 1px;
    border-right: 1px solid black;
`;

const ButtonWrapper = styled.div`
    padding-top: 36px;
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const StyledInput = styled.input`
    background: none;
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
        outline: none;
    }
`;

const InputContainer = styled.div`
    display: flex
    align-items: center;
    justify-content: flex-start;
    border: 1px solid black;
    &:focus-within {
        outline: 1px solid #d3d3d3;
        outline-offset: -1px;
    }
`;

const Title = styled.div`
    font-weight: 700;
    position: absolute;
    top: 0;
    margin: 36px;
    left: 0;
`;

const SignupContainer = styled.div`
    display: flex;
    padding: 24px;
    width: 400px;
    height: 400px;
    flex-direction: column;
    box-shadow: rgba(0,0,0, 0.35) 0px 5px 15px;
`;

export default Signup;
