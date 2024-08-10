import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Dialog, DialogTitle, Divider } from "@mui/material";

type FAQModalProps = {
    handleCloseHelpDialog: () => void;
    isHelpModalOpened: boolean;
}

const FAQModal = ({handleCloseHelpDialog, isHelpModalOpened}: FAQModalProps) => {
    return (
        <Dialog sx={{ padding: '40px' }} onClose={handleCloseHelpDialog} open={isHelpModalOpened}>
            <DialogTitle fontWeight={900}>Frequently Asked Question</DialogTitle>
            <Divider/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faq-general-process"
                    id="faq-general-process"
                    sx={{
                        fontWeight: 500
                    }}
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
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faq-general-process"
                    id="faq-general-process"
                    sx={{
                        fontWeight: 500
                    }}
                    >
                When can I get feedback on a resume I've submitted
                </AccordionSummary>
                <AccordionDetails>
                    Our personel will look over your resume and approve it, or provide feedback in between 1-2 business days<br/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faq-general-process"
                    id="faq-general-process"
                    sx={{
                        fontWeight: 500
                    }}
                    >
                What are the different states for a resume
                </AccordionSummary>
                <AccordionDetails>
                    1. `New resume`: Represents a resume you have created but not submitted
                    2. `Submitted` : Once you resume has been sent to our team of reviewers
                    3. `Reviewed` : When a review has sent you back your resume with comments about things to improve
                    4 `Approved` : You resume is approved once a reviewer believes it is ready to be sent to potential employers
                </AccordionDetails>
            </Accordion>
        </Dialog>
    )
}

export default FAQModal;