import { UserRole, UserType } from "@types";
import { getDatabase, onValue, ref } from "firebase/database";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Features } from "../redux/features";
import LoadingPage from "./LoadingPage";
import ReviewerCenterListView from "./reviewerCenter/listView/ReviewerCenterListView";
import StudentCenterListView from "./studentCenter/listView/StudentCenterListView";

type HomeProps = {
    userID?: string;
}

const Home = (props: HomeProps) => {
    const { userID } = props;
    const userRole: UserRole = useSelector(Features.UserFeature.selector.getUserRole);
    const dispatch = useDispatch();

    /**
     * FETCHING - User resumes IDs
     */
    const db = getDatabase();
    const dbRef = ref(db, `content/users/${userID}`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            if (snapshot.val()) {
                dispatch(Features.UserFeature.action.setUserRole((snapshot.val() as UserType).userRole));
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const Content = useCallback(() => {
        if (userRole === 'student') {
            return (<StudentCenterListView userID={userID} />)
        } else if (userRole === 'reviewer') {
            return (<ReviewerCenterListView />)
        } else {
            return (<LoadingPage />)
        }
    }, [userID, userRole]);

    return (
        <Content />
    )
};

export default Home;