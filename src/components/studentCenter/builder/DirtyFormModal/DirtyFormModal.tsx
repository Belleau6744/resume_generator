import { Blocker } from "@types";
import { Button, Dialog, Heading, Input, Label, Modal, TextField } from 'react-aria-components';
import './ModalStyling.css';

type ModalProps = {
    isModalOpened: boolean;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    blocker: Blocker;
}

const DirtyFormModal = (props: ModalProps) => {
    const { isModalOpened, setIsModalOpened, blocker } = props;

    const handleSaveData = () => {
        blocker.proceed?.();
    };

    const handleReturnToPage = () => {
        blocker.reset?.();
    };

    return (
        // <DialogTrigger>
        //     <Button>Sign up…</Button>
            <Modal isDismissable isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
                <Dialog>
                    <form style={{background: 'white'}}>
                    <Heading slot="title">Sign up</Heading>
                    <TextField autoFocus>
                        <Label>First Name:</Label>
                        <Input />
                    </TextField>
                    <TextField>
                        <Label>Last Name:</Label>
                        <Input />
                    </TextField>
                    <Button onPress={handleSaveData}>Save</Button>
                    <Button onPress={handleReturnToPage}>Submit</Button>
                    </form>
                </Dialog>
            </Modal>
        // </DialogTrigger>
    );
};

export default DirtyFormModal;