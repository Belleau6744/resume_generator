import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../../assets/Icons/HomeIcon";
import { auth } from "../../firebase/firebase";
import { Features } from "../../redux/features";

const NavBar = () => {
    const isSignedIn = useSelector(Features.UserFeature.selector.isUserSignedIn);
    const firstName = useSelector(Features.UserFeature.selector.getUserFirstName);
    const lastName = useSelector(Features.UserFeature.selector.getUserLastName);
    const nav = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            nav("/login");
        }).catch(() => {
            // TODO Catch error
        });
    }

    return (
        isSignedIn ? (
            <Container>
            <IconButton onClick={() => nav("/")}>
                <HomeIcon />
            </IconButton>
            <div style={{ color: 'white' }}>{firstName?.toLocaleUpperCase()}&nbsp;{lastName?.toLocaleUpperCase()}</div>
            <div>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </div>
        </Container>
        ) : (<></>)
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

export default NavBar;