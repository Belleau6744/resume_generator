import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Features } from "../redux/features";
import { UserRole } from "../types/dbStructType";
import ReviewerCenterListView from "./reviewerCenter/listView/ReviewerCenterListView";
import StudentCenterListView from "./studentCenter/listView/StudentCenterListView";

type HomeProps = {
    userID?: string;
}

const Home = (props: HomeProps) => {
    const { userID } = props;
    // TODO Implement user role
    const userRole: UserRole = useSelector(Features.UserFeature.selector.getUserRole);

    const Content = useCallback(() => {
        if (userRole === 'student') {
            return (<StudentCenterListView userID={userID} />)
        } else if (userRole === 'reviewer') {
            return (<ReviewerCenterListView userID={userID} />)
        } else {
            return (<></>)
        }
    }, [userID, userRole]);

    return (
        <Content />
    )
};

export default Home;