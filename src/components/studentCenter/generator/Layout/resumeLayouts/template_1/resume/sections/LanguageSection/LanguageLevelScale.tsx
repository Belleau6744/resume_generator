import styled from "styled-components";
import EmptyCircleIcon from "../../../../../../../../../assets/Icons/EmptyCircleIcon";
import FullCircleIcon from "../../../../../../../../../assets/Icons/FullCircleIcon";
import { LangLevel, LangList } from "../../../../../../../../../utils/Languages";

type LanguageLevelScaleProps = {
    level: number;
    language: string;
}

const LanguageLevelScale = (props: LanguageLevelScaleProps) => {
    const { level, language } = props;
    return (
        <Container>
            <LeftSide>
                <LanguageName>{LangList[language]}</LanguageName>
                <LanguageLevelDescription>{LangLevel[level]}</LanguageLevelDescription>
            </LeftSide>
            <Scale>
                {Array.from(Array(6)).map((_, index) => {
                    return  (
                        <div key={index}>
                            {(index < level) ? (<FullCircleIcon />) : (<EmptyCircleIcon />)}
                        </div>
                    );
                })}
            </Scale>
        </Container>
    )
};

const LanguageLevelDescription = styled.div`
    color: #667085;
    font-size: 0.8rem;
`;

const LanguageName = styled.div``;

const Scale = styled.div`
    display: flex;
`;

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    border-bottom: 1px solid black;
`;


export default LanguageLevelScale