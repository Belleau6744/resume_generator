import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase_setup/firebase";
import { Features } from "../../redux/features";

const NavBar = () => {
    const isSignedIn = useSelector(Features.UserFeature.selector.isUserSignedIn);
    const nav = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            nav("/resume-generator/login");
        }).catch(() => {
            // TODO Catch error
        });
    }

    if (!isSignedIn) {
        return;
    }

    return (
        <Container>
            <NavItems>
                <LogoHolder>
                    {/* TODO HOME ICON */}
                    <Link style={{color:'white'}} to="/resume-generator/">Home Icon</Link>
                </LogoHolder>
                <Item>
                    {/* TODO CREATE SECTION */}
                    <Link style={{color: 'white'}} to="/resume-generator/create">Edit</Link>
                </Item>
            </NavItems>
            <div>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </div>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    position: static;
    padding-left: 30px;
    align-items: center;
    padding-right: 40px;
    padding-top: 18px;
    left: 0;
    top: 0;
    justify-content: space-between;
`;
const LogoutButton = styled.button`
    background: white;
    color: black;
`;
const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NavItems = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const LogoHolder = styled.div`
    padding-right: 50px;
`;

export default NavBar;