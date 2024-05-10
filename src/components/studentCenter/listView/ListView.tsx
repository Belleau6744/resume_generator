import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Features } from "../../../redux/features";
import { StudentType } from "../../../types/dbStructType";

type ListViewProps = {
    userID?: string;
}

const ListView = (props: ListViewProps) => {
    const { userID } = props;
    const nav = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dbContent, setDbContent] = useState<StudentType>({resumes: {}});

    /** Nav back if not logged in*/
    const isSignedIn = useSelector(Features.UserFeature.selector.isUserSignedIn);    
    useEffect(() => {
        if (!isSignedIn){
            nav("/resume-generator/login");
        }
    }, [isSignedIn, nav]);

    /**
     * FETCHING 
     */ 
    const db = getDatabase();
    const dbRef = ref(db, `students/${userID}/`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setDbContent(snapshot.val());
        });
    }, []);

    

    return (
        <Container>
            <Title>Resumes</Title>
            <ListContainer>
                {Object.entries(dbContent.resumes).map((value) => {
                    return (
                        <Item>value: {value[0]} __ IT:{value[1].status}</Item>
                    )
                })};
            </ListContainer>
        </Container>
    )
};

const Title = styled.h1`
    color: rgba(0, 96, 133, 1);
`;

const Item = styled.div``;

const ListContainer = styled.div`

`;

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 24px;
    margin: 24px;
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
    color: black;
`;

export default ListView;