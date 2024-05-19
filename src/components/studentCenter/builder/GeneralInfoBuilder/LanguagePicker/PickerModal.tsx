import { Button, Dialog, Heading, Input, Label, Modal, TextField } from 'react-aria-components';
import './ModalStyling.css';
import styled from 'styled-components';

type PickerModalProps = {
    isModalOpened: boolean;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickerModal = ({ isModalOpened, setIsModalOpened }: PickerModalProps) => {
    return (
        <Modal isDismissable isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Dialog>
            <Container>
                <form style={{ background: 'white' }}>
                <Heading slot="title">Sign up</Heading>
                <TextField autoFocus>
                    <Label>First Name:</Label>
                    <Input />
                </TextField>
                <TextField>
                    <Label>Last Name:</Label>
                    <Input />
                </TextField>
                <Button>Save</Button>
                <Button>Submit</Button>
                </form>
                </Container>
            </Dialog>
        </Modal>
    )
}

const Container = styled.div`
    width: 500px;
    height: 500px;
`;

export default PickerModal;