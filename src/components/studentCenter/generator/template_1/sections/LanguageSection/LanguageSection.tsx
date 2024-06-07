import styled from "styled-components";
import { LanguageType } from "../../../../../../types/resumeTypes";
import { SectionContainer } from "../utils";
import LanguageLevelScale from "./LanguageLevelScale";

const LanguageSection = ({languages}: {languages?: LanguageType}) => {
    return languages ? (
        <LanguageContainer>
            <SectionTitle>Languages</SectionTitle>
            {Object.entries(languages).map((lang, index) => {
                return (
                    <div key={index}>{<LanguageLevelScale key={index} language={lang[0]} level={+lang[1]} />}</div>
                )
            })}
        </LanguageContainer>
    ) : (
        <></>
    )
};

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
`;

const LanguageContainer = styled(SectionContainer)`
    margin-bottom: 20px;
`; 

export default LanguageSection;