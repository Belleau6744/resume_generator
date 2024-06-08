import { Alert, Button } from '@mui/material';
import { Dialog, Heading, Modal } from 'react-aria-components';
import '../../../../../assets/ModalStyling.css';

type ModalProps = {
    isModalOpened: boolean;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setUserResponse: React.Dispatch<React.SetStateAction<boolean>>;
}

const LosingSectionsModal = (props: ModalProps) => {
    const { isModalOpened, setIsModalOpened, setUserResponse } = props;

    const handleUserResponse = (response: boolean) => {
        setUserResponse(response);
        setIsModalOpened(false);
    };

    return (
        <Modal isDismissable isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Dialog style={{ padding: '25px', background: 'white', display: 'flex', flexDirection: 'column' }}>
                <Heading slot="title">Before you continue...</Heading>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px'}}>
                    <Alert variant='filled' severity="warning">By continuing you will lose any section you've created</Alert>
                    <Alert variant='filled' severity='info'>You will still keep all the skills you added</Alert>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                    <Button variant='outlined' onClick={() => handleUserResponse(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={() => handleUserResponse(true)}>Continue</Button>
                </div>
            </Dialog>
        </Modal>
    );
};

export default LosingSectionsModal;