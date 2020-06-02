import {createSelector, createStructuredSelector} from "reselect";
import {ObjectLink} from "@rn-cantons/react-link";
import listen from "./actions/listen";
import {User} from "firebase";

interface Auth<T>{
    listen: (p: ObjectLink<T>) => void
    authentication: boolean
    authenticated: boolean
    firebaseUser: User
}

const user = p => p.value?.firebaseUser

const authSelector = createStructuredSelector<ObjectLink<any>, any>({
    listen,
    authentication: createSelector(user, (user) => user === null),
    authenticated: createSelector(user, (user) => !!user),
    userId: createSelector(user, (user) => user?.id),
    displayName: createSelector(user, (user) => user?.displayName),
    email: createSelector(user, (user) => user?.email),
    emailVerified: createSelector(user, (user) => user?.emailVerified),
    photoURL: createSelector(user, (user) => user?.photoURL),
    id: createSelector(user, (user) => user?.uid),
});

export default authSelector;


