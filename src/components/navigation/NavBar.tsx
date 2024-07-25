import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import { Button, IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase/firebase";
import { Features } from "../../redux/features";
import FAQModal from '../studentCenter/listView/FAQModal';

const NavBar = () => {
    const isSignedIn = useSelector(Features.UserFeature.selector.isUserSignedIn);
    const firstName = useSelector(Features.UserFeature.selector.getUserFirstName);
    const lastName = useSelector(Features.UserFeature.selector.getUserLastName);
    const [isHelpModalOpened, setIsHelpModalOpened] = useState<boolean>(false);
    const nav = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            nav("/login");
        }).catch(() => {
            // TODO Catch error
        });
    }

    const handleClickHelpModal = () => {
        setIsHelpModalOpened(true);
    }
    const handleCloseHelpDialog = () => {
        setIsHelpModalOpened(false);
    }


    return (
        isSignedIn ? (
            <Container>
            <FAQModal handleCloseHelpDialog={handleCloseHelpDialog} isHelpModalOpened={isHelpModalOpened} />
            <IconButton onClick={() => nav("/")}>
                <HomeIcon fontSize="large" />
            </IconButton>
            <div style={{ color: '#34495E' }}>{firstName?.toLocaleUpperCase()}&nbsp;{lastName?.toLocaleUpperCase()}</div>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Button onClick={handleClickHelpModal} sx={{ display: 'flex', alignItems: 'center', gap: '5px' }} variant="outlined" size="medium" color="charcoal"><HelpIcon fontSize='small'/>FAQ</Button>
                <Button variant='contained' color="midnightBlue" onClick={handleLogout}>Logout</Button>
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
    color: black;
    justify-content: space-between;
`;

export default NavBar;