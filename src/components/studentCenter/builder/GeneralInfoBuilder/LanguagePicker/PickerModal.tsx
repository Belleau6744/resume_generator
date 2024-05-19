import { Heading, ListBox, ListBoxItem, Modal, Popover, Select, SelectValue } from 'react-aria-components';
import styled from 'styled-components';
import './ModalStyling.css';

type PickerModalProps = {
    isModalOpened: boolean;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickerModal = ({ isModalOpened, setIsModalOpened }: PickerModalProps) => {
    return (
        
        <Modal isDismissable isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Container>
                <form style={{ background: 'white' }}>
                <Heading slot="title">Sign up</Heading>
                
                <Select>
                    <Button style={{ background: '#bcbcbc', color: 'black', border: '1px solid black' }}>
                        <SelectValue />
                        <span aria-hidden="true">▼</span>
                    </Button>
                    <Popover style={{ background: 'white' }}>
                        <ListBox>
                            <ListBoxItem>Aardvark</ListBoxItem>
                            <ListBoxItem>Cat</ListBoxItem>
                            <ListBoxItem>Dog</ListBoxItem>
                            <ListBoxItem>Kangaroo</ListBoxItem>
                            <ListBoxItem>Panda</ListBoxItem>
                            <ListBoxItem>Snake</ListBoxItem>
                        </ListBox>
                    </Popover>
                </Select>
                
                <ButtonWrapper>
                    <Button>Save</Button>
                    <Button>Submit</Button>
                </ButtonWrapper>                
                </form>
            </Container>
        </Modal>
    )
}

const Button = styled.button`
    background: white;
    border: 1px solid black;
`;

const ButtonWrapper = styled.div`
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
`;

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: fit-content;
    height: fit-content;
    padding: 25px;
`;

export default PickerModal;