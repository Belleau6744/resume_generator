import { useEffect } from "react";
import { ResumeStatusType } from "../../../types/dbStructType";
import CreationDateCell from "./Cells/CreationDateCell";
import EditCell from "./Cells/EditCell";
import GetResumeCell from "./Cells/GetResumeCell";
import StatusCell from "./Cells/StatusCell";

type ItemType = {
    creationDate?: string;
    status?: ResumeStatusType | '';
    id?: string;
}

const ResumeRow = (props: ItemType) => {
    const { creationDate, status, id } = props;

    useEffect(() => {
        console.log(creationDate);
        console.log(status);
    }, [creationDate, status]);

    return (
        (creationDate && status && id) ? (
            <>
            <CreationDateCell creationDate={creationDate} />
            <StatusCell status={status}/>
            <EditCell id={id} />
            <GetResumeCell id={id} />
            </>
        ) : (
           <></> 
        )
    );
};

export default ResumeRow;