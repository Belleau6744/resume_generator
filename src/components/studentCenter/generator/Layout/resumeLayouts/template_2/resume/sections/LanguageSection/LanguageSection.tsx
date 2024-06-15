import styled from "styled-components";
import { LanguageSectionProps } from "../../../../types";
import LanguageLevelScale from "./LanguageLevelScale";

const LanguageContainer = styled.div`
    margin-bottom: 20px;
`; 

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding: 5px 30px 0 15px;
`;

const LanguageSection = ({ languages }: LanguageSectionProps) => {
    return languages ? (
        <LanguageContainer>
            <SectionTitle>Languages</SectionTitle>
            <Content>
                {Object.entries(languages).map((lang, index) => {
                    return (
                        <div key={index} style={{}} >{<LanguageLevelScale key={index} language={lang[0]} level={+lang[1]} />}</div>
                    )
                })}
            </Content>
        </LanguageContainer>
    ) : (
        <></>
    )
}

export default LanguageSection;