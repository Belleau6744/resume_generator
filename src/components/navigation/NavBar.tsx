import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../../assets/Icons/HomeIcon";
import { auth } from "../../firebase/firebase";
import { Features } from "../../redux/features";
import { capitalizeEveryWord } from "../../utils/stringUtils";

const NavBar = () => {
    const isSignedIn = useSelector(Features.UserFeature.selector.isUserSignedIn);
    const userRole = useSelector(Features.UserFeature.selector.getUserRole);
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
            <div style={{ color: 'white' }}>{userRole && capitalizeEveryWord(userRole)}&nbsp;Account</div>
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