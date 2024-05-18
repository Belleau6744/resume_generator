import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, redirect } from "react-router-dom";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import LockIcon from "../../assets/Icons/LockIcon";
import UserIcon from "../../assets/Icons/UserIcon";
import { initStudentDBSpace } from "../../firebase_setup/db_actions";
import { auth } from "../../firebase_setup/firebase";
import { Features } from "../../redux/features";


const Signup = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                initStudentDBSpace(credentials.user.uid).then(() => {
                    toast.success('Student Account Created!', {
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
                    dispatch(Features.UserFeature.action.setUserAuthStatus(true));
                    dispatch(Features.UserFeature.action.setUserID(credentials.user.uid))
                    
                }).finally(() => {
                    redirect("/login");
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Container>
            <ToastContainer />
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
                    <Link to="/login"><p style={{color: 'blue', fontWeight: 'bold'}}>Login</p></Link>
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

const SignupContainer = styled.div`
    display: flex;
    padding: 24px;
    width: 400px;
    height: 400px;
    flex-direction: column;
    box-shadow: rgba(0,0,0, 0.35) 0px 5px 15px;
`;

export default Signup;
