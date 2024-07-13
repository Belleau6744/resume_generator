import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Dialog, DialogTitle, Divider } from "@mui/material";

type FAQModalProps = {
    handleCloseHelpDialog: () => void;
    isHelpModalOpened: boolean;
}

const FAQModal = ({handleCloseHelpDialog, isHelpModalOpened}: FAQModalProps) => {
    return (
        <Dialog sx={{ padding: '40px' }} onClose={handleCloseHelpDialog} open={isHelpModalOpened}>
            <DialogTitle>Frequently Asked Question</DialogTitle>
            <Divider/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faq-general-process"
                    id="faq-general-process"
                    >
                What's the general process?
                </AccordionSummary>
                <AccordionDetails>
                    1. You should start by creating your first resume with the builder<br/>
                    2. Then, you can can submit your resume for review<br/>
                    3. Afterwards, a reviewier will leave comments<br/>
                    4. You can address the comments and re-submit<br/>
                    5. At anytime, you can download a PDF version by selecting a resume layout
                </AccordionDetails>
            </Accordion>
        </Dialog>
    )
}

export default FAQModal;