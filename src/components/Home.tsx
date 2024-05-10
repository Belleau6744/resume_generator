import { useCallback } from "react";
import { UserRole } from "../types/dbStructType";
import ListView from "./studentCenter/listView/ListView";

type HomeProps = {
    userID?: string;
}

const Home = (props: HomeProps) => {
    const { userID } = props;
    // TODO Implement user role
    const userRole: UserRole = 'student';

    const Content = useCallback(() => {
        return (
            userRole == 'student' ?
        (
            <ListView userID={userID} />
        ) : (
            <div>NO YET IMPLEMENTED</div>
        )
        )
    }, [userID]);

    return (
        <Content />
    )
};

export default Home;