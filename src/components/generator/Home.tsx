import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Features } from "../../redux/features";
import Education from "./Education";
import Experience from "./Experience";
import GeneralInfo from "./GeneralInfo";
import Skills from "./Skills";

const Home = () => {
    const nav = useNavigate();
    const [ sectionEdit, setSectionEdit ] = useState('generalInfo');

    /** Nav back if not logged in*/
    const isSignedIn = useSelector(Features.UserFeature.selector.isUserSignedIn);    
    useEffect(() => {
        if (!isSignedIn){
            nav("/resume-generator/login");
        }
    }, [isSignedIn, nav]);
    
    
    const Sections = {
        'generalInfo': <GeneralInfo />,
        'education': <Education />,
        'skills': <Skills />,
        'experience': <Experience />,
    };

    const handleSelect = useCallback(item => {
        return () => {
            setSectionEdit(item);
        }
    }, [])

    /**
     * Fetch user resume info
     */
    // const [ userDate, setUserDate ] = useState();
    // const [ isSaved ] = useState<boolean>(true);
    // const [ isModalOpened, setIsModalOpened ] = useState<boolean>(false);

    return (
        <Container>
            <SectionSelector>
                <ItemSelect $selected={sectionEdit == 'generalInfo'} onClick={handleSelect('generalInfo')}>General Info</ItemSelect>
                <ItemSelect $selected={sectionEdit == 'education'} onClick={handleSelect('education')}>Education</ItemSelect>
                <ItemSelect $selected={sectionEdit == 'skills'} onClick={handleSelect('skills')}>Skills</ItemSelect>
                <ItemSelect $selected={sectionEdit == 'experience'} onClick={handleSelect('experience')}>Experience</ItemSelect>
            </SectionSelector>
            <EditContent>
                {Sections[sectionEdit]}
            </EditContent>
        </Container>
    )
};

const EditContent = styled.div`
    padding: 24px;
    background: gray;
    margin-top: 10px;
    border-radius: 5px;
`;

const ItemSelect = styled.div<{ $selected: boolean }>`
    padding: 0 20px;

    ${props => props.$selected && css`
        font-weight: 900;
        border-bottom: 2px solid red;
    `}
`;

const SectionSelector = styled.div`
    display: flex;
    gap: 8px;
`;

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 24px;
    margin: 24px;
    padding-top: 24px;
    color: black;
`;

export default Home;