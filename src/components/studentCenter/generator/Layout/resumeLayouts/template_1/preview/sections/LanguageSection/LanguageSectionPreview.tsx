import styled from "styled-components";
import { SectionContainer } from "../../../resume/sections/utils";
import LanguageLevelScalePreview from "./LanguageLevelScalePreview";

const LanguageSectionPreview = () => {
    return(
        <LanguageContainer>
            <SectionTitle>Languages</SectionTitle>
            <LanguageLevelScalePreview />
        </LanguageContainer>
    )
};

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
`;

const LanguageContainer = styled(SectionContainer)`
    margin-bottom: 20px;
    color: black;
`; 

export default LanguageSectionPreview;