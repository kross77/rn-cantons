"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMessages = exports.messagingSelector = void 0;
const app_1 = __importDefault(require("firebase/app"));
require("firebase/messaging");
const reselect_1 = require("reselect");
const react_link_1 = require("@rn-cantons/react-link");
const ts_utils_1 = require("@rn-cantons/ts-utils");
exports.messagingSelector = reselect_1.createStructuredSelector({
    messaging: (link) => link.value.messaging,
    messages: (link) => link.value.messages,
    token: (link) => link.value.token,
    permission: (link) => link.value.permission,
    permissionRequesting: (link) => link.value.permission === 'requesting',
    permissionGranted: (link) => link.value.permission === 'granted',
    init: (link) => () => {
        const messaging = app_1.default.messaging();
        const messages = new ts_utils_1.Collection();
        link.update({ messaging });
        return messaging.onMessage((payload) => {
            messages.add(payload);
            link.update({ messages: messages.array });
        });
    },
    requestPermission: (link) => () => {
        const { messaging } = link.value;
        link.update({ permission: 'requesting' });
        Notification.requestPermission().then((permission) => {
            link.update({ permission });
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                // TODO(developer): Retrieve a registration token for use with FCM.
                // ...
            }
            else {
                console.log('Unable to get permission to notify.');
            }
        });
    },
    deleteToken: (link) => () => {
        const { messaging } = link.value;
        // [START messaging_delete_token]
        messaging === null || messaging === void 0 ? void 0 : messaging.deleteToken().then(() => {
            link.update({ token: undefined, permission: 'default' });
        }).catch((err) => {
            link.update({
                token: { error: `Unable to delete token. \n\t ${err.message}` },
            });
        });
    },
    getToken: (link) => (vapidKey) => {
        const { messaging } = link.value;
        // [START messaging_get_token]
        // Get registration token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging === null || messaging === void 0 ? void 0 : messaging.getToken({ vapidKey }).then((token) => {
            if (token) {
                link.update({ token });
            }
            else {
                link.update({
                    token: {
                        error: 'No registration token available. Request permission to generate one.',
                    },
                });
            }
        }).catch((err) => {
            link.update({
                token: {
                    error: `An error occurred while retrieving token. \n\t${err.message}`,
                },
            });
        });
    },
});
const useMessages = () => {
    const messagesLink = react_link_1.useObjectLink({ permission: 'default' });
    return exports.messagingSelector(messagesLink);
};
exports.useMessages = useMessages;
//# sourceMappingURL=index.js.map