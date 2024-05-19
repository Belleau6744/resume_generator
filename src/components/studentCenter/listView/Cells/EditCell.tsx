import { Cell } from "react-aria-components";
import styled from "styled-components";
import EditIcon from "../../../../assets/Icons/EditIcon";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditCell = ({id}: {id: string}) => {
    return (
        <ReactAriaCell>
            <Content><EditIcon /></Content>
        </ReactAriaCell>
    );
};


export default EditCell;