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
    font-weight: 700;
    font-size: 0.8rem;
`;

const LanguageContainer = styled(SectionContainer)`
    margin-bottom: 10px;
    color: black;
`; 

export default LanguageSectionPreview;