import { Alert, Button, Dialog, DialogTitle } from '@mui/material';
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
        <Dialog open={isModalOpened}>
            <DialogTitle color={"#34495E"} sx={{ borderBottom: "1px solid #ced2d3", fontWeight: '800', marginBottom: '20px' }}>Before you continue...</DialogTitle>
            <div style={{ padding: '0 40px 20px 40px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px'}}>
                    <Alert variant='filled' severity="warning">By continuing you will lose any section you've created</Alert>
                    <Alert variant='filled' severity='info'>You will still keep all the skills you added</Alert>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
                    <Button variant='outlined' onClick={() => handleUserResponse(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={() => handleUserResponse(true)}>Continue</Button>
                </div>
            </div>
        </Dialog>
    );
};

export default LosingSectionsModal;