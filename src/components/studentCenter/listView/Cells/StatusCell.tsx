import { Cell } from "react-aria-components";
import styled from "styled-components";

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

const StatusCell = ({status}: {status: string}) => {
    return (
        <ReactAriaCell>
            <Content>{status}</Content>
        </ReactAriaCell>
    );
};

export default StatusCell;