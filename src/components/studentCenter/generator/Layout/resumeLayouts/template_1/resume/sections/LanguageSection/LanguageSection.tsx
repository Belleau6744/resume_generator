import styled from "styled-components";
import { LanguageSectionProps } from "../../../../types";
import { SectionContainer } from "../../../resume/sections/utils";
import LanguageLevelScale from "./LanguageLevelScale";

const LanguageSection = ({languages}: LanguageSectionProps) => {
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