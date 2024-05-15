import styled from "styled-components";
import { Language } from "../../../../../types/resumeTypes";
import LanguageLevelScale from "./LanguageLevelScale";

const LanguageSection = ({languages}: {languages?: Language}) => {
    return languages ? (
        <LanguageContainer>
            <SectionTitle>Languages</SectionTitle>
            {Object.entries(languages).map((lang, index) => {
                return (
                    <div>{<LanguageLevelScale key={index} language={lang[0]} level={+lang[1]} />}</div>
                )
            })}
        </LanguageContainer>
    ) : (
        <></>
    )
};

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1.3rem;
`;

const LanguageContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`; 

export default LanguageSection;