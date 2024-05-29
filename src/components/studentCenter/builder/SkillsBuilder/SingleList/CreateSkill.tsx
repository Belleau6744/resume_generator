import { Alert, Button } from '@mui/material';
import { Dialog, Heading, Modal } from 'react-aria-components';
import '../../../../../assets/ModalStyling.css';

type CreateSkillModalProps = {
    isModalOpened: boolean;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSkill = ({ isModalOpened, setIsModalOpened }: CreateSkillModalProps) => {
    return (
        <Modal isDismissable isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Dialog style={{ padding: '25px', background: 'white', display: 'flex', flexDirection: 'column' }}>
                <Heading slot="title">Before you continue...</Heading>
                <Alert variant='filled' severity="warning">By continuing you will lose any section you've created</Alert>
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                    <Button variant='outlined'>Add skill</Button>
                    <Button variant='contained' color='info'>Cancel</Button>
                </div>
            </Dialog>
        </Modal>
    )
}

export default CreateSkill;