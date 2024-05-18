import { getDatabase, onValue, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Features } from "../../../redux/features";
import { ResumeType } from "../../../types/dbStructType";
import Education from "./Education";
import Experience from "./Experience";
import GeneralInfo from "./GeneralInfo";
import Skills from "./Skills";

const ResumeBuilder = () => {
    const nav = useNavigate();
    const { resumeID } = useParams();
    const isSignedIn = useSelector(Features.UserFeature.selector.isUserSignedIn);
    const userID = useSelector(Features.UserFeature.selector.getUserID);

    /**
     * Different sections of the resume builder
     */
    const Sections = {
        'generalInfo': <GeneralInfo />,
        'education': <Education />,
        'skills': <Skills />,
        'experience': <Experience />,
    };
    type SectionEditingType = keyof typeof Sections;
    const [ sectionEdit, setSectionEdit ] = useState<SectionEditingType>('generalInfo');

    /**
     * * Keeps track of the original resume, as a point of reference for updates
     */
    const [ originalResume, setOriginalResume ] = useState<ResumeType>({
        id: resumeID,
        status: 'New',
        creationDate: '',
        content: {
            generalInfo: {
                "First Name": "",
                "Last Name": "",
                Citizenship: "",
                Languages: {}
            },
            education: {},
            skills: {},
            experience: {}
        }
    });

    /**
     * Keeps track of the current resume form
     */
    const [ currentResume, setCurrentResume ] = useState<ResumeType>({
        id: resumeID,
        status: 'New',
        creationDate: '',
        content: {
            generalInfo: {
                "First Name": "",
                "Last Name": "",
                Citizenship: "",
                Languages: {}
            },
            education: {},
            skills: {},
            experience: {}
        }
    });  

    /**
     * Safety is user tries to access this page without being logged in
     */
    useEffect(() => {
        if (!isSignedIn){
            nav("/login");
        }
    }, [isSignedIn, nav]);

    /**
     * FETCHING - Resume content
     */ 
    const db = getDatabase();
    const dbRef = ref(db, `students/${userID}/${resumeID}/`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            if (snapshot.val()) {
                setOriginalResume(snapshot.val());
                setCurrentResume(snapshot.val());
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Changes the section being currently edited
     */
    const handleSelect = useCallback((item: SectionEditingType) => () => setSectionEdit(item), [])

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
    flex: 1;
    background: #D2D2D2;
    width: 100%;
    margin: 0 10px 10px 25px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ItemSelect = styled.div<{ $selected: boolean }>`
    padding: 0 20px;
    font-size: 1.2em;
    font-weight: 800;
    ${props => props.$selected && css`
        background: rgba(0, 96, 133, 0.8);
        border-radius: 5px;
        color: white;
    `}
`;

const SectionSelector = styled.div`
    display: flex;
    flex-direction: column;
    background: #D2D2D2;
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    gap: 8px;
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


export default ResumeBuilder;