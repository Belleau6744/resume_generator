import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import { Alert, Button, Snackbar, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ResumeDefinition, ResumeGroup } from "@types";
import { STRINGS_ENG } from "assets/stringConstants";
import { child, get, getDatabase, ref } from "firebase/database";
import { saveResume } from "firebase/db_actions";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeEveryWord } from "utils/stringUtils";
import ConfirmDeletionModal from "./ConfirmDeletionModal";
import ConfirmEditingModal from "./ConfirmEditingModal";
import ConfirmSubmissionModal from "./ConfirmSubmissionModal";

type ResumeTableProps = {
    userResumes?: ResumeGroup;
}

const ResumeTable = ({ userResumes }: ResumeTableProps) => {
    const nav = useNavigate();
    const dbRef = ref(getDatabase());
    const [ resumeToSubmit, setResumeToSubmit ] = useState<string>('');
    const [ submissionStatus, setSubmissionStatus ] = useState<{ open: boolean, status?: 'error' | 'success' }>({ open: false, status: undefined });
    const [ isConfirmSubmitOpen, setIsConfirmSubmitOpen ] = useState<boolean>(false);

    const [ isConfirmDeleteOpen, setIsConfirmDeleteOpen ] = useState<boolean>(false);
    const [ deletionStatus, setDeletionStatus ] = useState<{ open: boolean, status?: 'error' | 'success' }>({ open: false, status: undefined });
    const [ resumeToDelete, setResumeToDelete ] = useState<string>('');

    const [ isConfirmEditingOpen, setIsConfirmEditingOpen ] = useState<boolean>(false);
    const [ resumeToEdit, setResumeToEdit ] = useState<string>('');
    

    /**
     * Takes users to the page to edit the selected resume
     */
    const handleEditResume = useCallback((resumeID: string) => {
        get(child(dbRef, `content/resumes/${resumeID}`)).then((snapshot) => {
            if (snapshot.val()) {
                if((snapshot.val() as ResumeDefinition).status === 'submitted' || (snapshot.val() as ResumeDefinition).status === 'approved') {
                    setResumeToEdit(resumeID);
                    setIsConfirmEditingOpen(true);
                    return;
                } else {
                    setResumeToEdit('');
                    nav(`/builder/${resumeID}`);
                }
            }
        });
    }, [dbRef, nav]);

    /**
     * This function handles the confirmEditing modal's action
     * @param resumeID Resume to be edited
     * @param status Approval or cancellation of the editing
     */
    const handleCloseConfirmEditing = (resumeID: string, status: 'continue' | 'cancel') => {
        if (status === 'continue') {
            let currentResume: ResumeDefinition;
            get(child(dbRef, `content/resumes/${resumeID}`)).then((snapshot) => {
                if (snapshot.val()) {
                    currentResume = snapshot.val() as ResumeDefinition;    
                    currentResume.status = 'new';
                    saveResume(currentResume, resumeID);
                    nav(`/builder/${resumeID}`);
                    
                }
            });
        }        
    }

    /**
     * Takes users to the page to preview the selected resume
     */
    const handlePreviewResume = useCallback((resumeID: string) => {
        nav(`/preview/${resumeID}`);
    }, [nav]);

    /**
     * Return a text matching the Submission Status
     */
    const getSubmissionStatusString = useCallback(() => {
        if (submissionStatus.status === 'success') {
            return STRINGS_ENG.resume_submission_status.success;
        } else if (submissionStatus.status === 'error') {
            return STRINGS_ENG.resume_submission_status.error;
        } else {
            return '';
        }
    }, [submissionStatus.status]);

    /**
     * Return a text matching the Deletion Status
     */
    const getDeletionStatusString = useCallback(() => {
        if (deletionStatus.status === 'success') {
            return STRINGS_ENG.resume_deletion_status.success;
        } else if (deletionStatus.status === 'error') {
            return STRINGS_ENG.resume_deletion_status.error;
        } else {
            return '';
        }
    }, [deletionStatus.status]);

    /**
     * Pops the modal to confirm the action of the student - Submit Resume
     */
    const handleSubmitResume = (resumeID: string) => {
        setIsConfirmSubmitOpen(true);
        setResumeToSubmit(resumeID);
    }
    
    /**
     * Pops the modal to confirm the action of the student - Delete Resume
     */
    const handleDeleteResume = (resumeID: string) => {
        setIsConfirmDeleteOpen(true);
        setResumeToDelete(resumeID);
    }

    /**
     * To match the modal state when OpenDelay runs out
     */
    const handleCloseSubmissionStatus = () =>{
        setSubmissionStatus(prev => ({...prev, open: false}));
    }

    /**
     * To match the modal state when OpenDelay runs out
     */
    const handleCloseDeletionStatus = () =>{
        setDeletionStatus(prev => ({...prev, open: false}));
    }
    
    return (
        <>
            {/** Confirm Submission */}
            <ConfirmSubmissionModal 
                isConfirmSubmitOpen={isConfirmSubmitOpen}
                setIsConfirmSubmitOpen={setIsConfirmSubmitOpen}
                setResumeToSubmit={setResumeToSubmit}
                resumeToSubmit={resumeToSubmit}
                setSubmissionStatus={setSubmissionStatus}
            />

            {/** Confirm Deletion */}
            <ConfirmDeletionModal 
                isConfirmDeleteOpen={isConfirmDeleteOpen}
                setIsConfirmDeleteOpen={setIsConfirmDeleteOpen}
                setResumeToSubmit={setResumeToSubmit}
                setDeletionStatus={setDeletionStatus}
                resumeToDelete={resumeToDelete}
            />

            <ConfirmEditingModal
                open={isConfirmEditingOpen}
                resumeID={resumeToEdit}
                setIsConfirmEditingOpen={setIsConfirmEditingOpen}
                onClose={handleCloseConfirmEditing}
            />

             {/** Submission Status */}
             <Snackbar open={submissionStatus.open} autoHideDuration={2000} onClose={handleCloseSubmissionStatus}>
                <Alert
                    onClose={handleCloseSubmissionStatus}
                    severity={submissionStatus.status}
                    variant="filled"
                    sx={{ width: '100%' }}
                >{getSubmissionStatusString()}</Alert>
             </Snackbar>

             {/** Deletion Status */}
             <Snackbar open={deletionStatus.open} autoHideDuration={2000} onClose={handleCloseDeletionStatus}>
                <Alert
                    onClose={handleCloseDeletionStatus}
                    severity={deletionStatus.status}
                    variant="filled"
                    sx={{ width: '100%' }}
                >{getDeletionStatusString()}</Alert>
             </Snackbar>

             {/** Content Table */}
             <Table aria-label="simple table">
                <TableHead sx={{ background: '#2C3E50' }}>
                    <TableRow>
                        {/* <TableCell align="center" sx={{ fontWeight: '800' }}>ID</TableCell> */}
                        <TableCell align="left" sx={{ fontWeight: '800', color: 'white' }}>Creation Date</TableCell>
                        <TableCell align="left" sx={{ fontWeight: '800', color: 'white' }}>Status</TableCell>
                        <TableCell align="center" size='small' sx={{ fontWeight: '800', width: '0', margin: '0', padding: '10px', border: '0', color: 'white' }}/>
                        <TableCell align="center" size='small' sx={{ fontWeight: '800', width: '0', margin: '0', padding: '10px', border: '0', color: 'white' }}/>
                        <TableCell align="center" size='small' sx={{ fontWeight: '800', width: '0', margin: '0', padding: '10px', border: '0', color: 'white' }}/>
                        <TableCell align="center" size='small' sx={{ fontWeight: '800', width: '0', margin: '0', padding: '10px', border: '0', color: 'white' }}/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userResumes && Object.entries(userResumes).map((resumeContent, index) => {
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: index%2 === 0 ? 'none' : 'rgba(193, 193, 193, 0.22)' }}
                            >
                                {/* <TableCell align="center">{value.id}</TableCell> */}
                                <TableCell align="left" sx={{ width: '100px' }}>{resumeContent[1].creationDate}</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '800', width: '100px' }}>{capitalizeEveryWord(resumeContent[1].status)}</TableCell>
                                <TableCell align="center" size='small' sx={{ margin: '0', padding: '10px', border: '0', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                    <Button color="warning" variant="outlined" startIcon={<EditIcon />} onClick={() => handleEditResume(resumeContent[0])}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell align="center" size='small' sx={{ margin: '0', padding: '10px', border: '0', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                    <Button color="emeraldGreen" sx={{ color: 'white' }} variant="contained" onClick={() => handleSubmitResume(resumeContent[0])} startIcon={<SendIcon />}>
                                        Submit
                                    </Button>
                                </TableCell>
                                <TableCell align="center" size='small' sx={{ margin: '0', padding: '10px', border: '0', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                    <Button color="primary" variant="contained" onClick={() => handlePreviewResume(resumeContent[0])} startIcon={<OpenInNewIcon />}>
                                        Preview
                                    </Button>
                                </TableCell>
                                <TableCell align="center" size='small' sx={{ margin: '0', padding: '10px', border: '0', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                    <Button color="carmineRed" variant="contained" onClick={() => handleDeleteResume(resumeContent[0])} startIcon={<DeleteOutlineIcon />}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            </>
    )
}

export default ResumeTable;