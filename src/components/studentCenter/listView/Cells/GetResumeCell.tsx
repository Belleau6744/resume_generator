import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Cell } from "react-aria-components";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DownloadIcon from "../../../../assets/Icons/DownloadIcon";
import { Features } from "../../../../redux/features";
import { ResumesType } from "../../../../types/dbStructType";

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ReactAriaCell = styled(Cell)`
border: 1px solid black;
border-right: none;
border-bottom: none;
height: 50px;
&:last-child {
  border-right: 1px solid black;
}
`;

const DownloadButton = styled.button`
  background: none;
  &:hover {
    background: gray;
    outline: none;
  }
  &:active {
    background: #525252;
  }
  &:focus, &:focus-visible {
    /* outline: 1px solid black; */
    /* outline: 4px auto -webkit-focus-ring-color; */
  }
`;

const GetResumeCell = ({id}: {id: string}) => {
  const userId = useSelector(Features.UserFeature.selector.getUserID);
  const [ resumesList , setResumesList ] = useState<ResumesType>({});
  
  const db = getDatabase();
  const dbRef = ref(db, `students/${userId}/resumes/`);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      setResumesList(snapshot.val());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetResume = () => {
    const rs = Object.values(resumesList).find(resume => resume.id===id);
    console.log(rs);
  };

  return (
    <ReactAriaCell>
      <Content>
        <DownloadButton onClick={handleGetResume}>
          <DownloadIcon />
        </DownloadButton>
      </Content>
    </ReactAriaCell>
    );
};


export default GetResumeCell