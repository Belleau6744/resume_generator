const save = 'save';
const no_account_q = 'no account yet?';
const already_have_account_q = 'already have an account?';
const student_account_created = 'student account created';
const reviewer_account_created = 'reviewer account created';
const create_account = 'create account';
const student_role = 'student';
const reviewer_role = 'reviewer';
const sign_up = 'sign up';
const log_in = 'log in';
const invalid_email = 'invalid email';
const invalid_password = 'invalid passord';
const invalid_key = 'invalid key';
const enter_access_key = 'Please enter the access key you received';
const password_must = `Password must: `;
const create_first_resume = `Create your first resume`;
const firstName_required = "Please enter your first name";
const lastName_required = "Please enter your last name";
const resumes = 'resumes';
const new_resume = 'new resume';
const still_working = 'still working';
const resume_to_review_title = 'resumes to review';
const adding = {
    plus_workingExperience: '+ add working experience',
    addNewWorkingExperience: 'add working experience',
    plus_projectExperience: '+ add project experience',
    addNewProjectExperience: 'add project experience',
    plus_volunteeringExperience: '+ add volunteering experience',
    addNewVolunteeringExperience: 'add new volunteering experience'
}
const education_input_examples = {
    'degree': "Bachelor | Master's | PhD | DEC ...",
    "field of study": "Computer Science | Business | Nursing ...",
    "school name": "Enter the full name",
    "school address": "Establishment number, street name, province | state, country",
    "start date": "month - yearh",
    "end date": "Expected or graduated"
}
const password_requirements = [
    'Have at least 8 characteres', 
    'Contain at least one upper case letter',
    'Contain at least one lower case letter',
    'Contain at least one number',
    'Contain at least one special character',
];
const education_input_errors = {
    'degree': "Please fill in your degree",
    'field of study': "Please fill in your field of study",
    'school name': "Please fill in your school name",
    'school address': "Please fill in your school address",
    'start date': "Please fill in your start date",
    'end date': "Please fill in your end date",
    'multiple': "Please fill in the fields"
}
const resume_submission_status = {
    "error": "There was an error submitting your resume",
    "success": "Your resume was submitted successfully"
}
const resume_deletion_status = {
    "error": "There was an error deleting your resume",
    "success": "Your resume was deleted successfully"
}
const resume_approval_status = {
    "error": "The resume could not be approved at the moment. Please try again later",
    "success": "The resume was approved successfully"
}
const resume_ask_revision_status = {
    "error": "The resume could not be sent for revision at the moment. Please try again later",
    "success": "The resume was successfully sent for revision"
}


export const STRINGS_ENG =  {
    save,
    no_account_q,
    student_account_created,
    reviewer_account_created,
    create_account,
    already_have_account_q,
    student_role,
    reviewer_role,
    sign_up,
    log_in,
    invalid_email,
    invalid_password,
    invalid_key,
    enter_access_key,
    password_must,
    password_requirements,
    create_first_resume,
    resumes,
    new_resume,
    education_input_errors,
    still_working,
    adding,
    education_input_examples,
    resume_submission_status,
    resume_deletion_status,
    resume_to_review_title,
    resume_approval_status,
    resume_ask_revision_status,
    firstName_required,
    lastName_required
}