/* eslint-disable no-console */
import OneSignal from 'react-native-onesignal';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { CometChatConfigs, OneSignalConfigs } from '~src/constants/config';

export const initOneSignalSDK = () => {
    // OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(OneSignalConfigs.appID);
    // END OneSignal Init Code

    // Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
        console.log('Prompt response:', response);
    });

    // Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
        console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent);
        const notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
    });

    // Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
        console.log('OneSignal: notification opened:', notification);
    });
};

export const initCometChatSDK = () => {
    const appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(CometChatConfigs.region)
        .autoEstablishSocketConnection(true)
        .build();
    CometChat.init(CometChatConfigs.appID, appSetting).then(
        () => {
            console.log('Initialization completed successfully');
        }, error => {
            console.log('Initialization failed with error:', error);
        }
    );
};

export const createCometChatUser = async user => {
    const { id, first_name: firstName, last_name: lastName, avatar } = user;
    const cometChatNewUser = {
        uid: id?.toString(),
        name: `${firstName} ${lastName}`,
        avatar,
    };

    await CometChat.createUser(cometChatNewUser, CometChatConfigs.authKey)
        .then(
            async _user => {
                console.log('Comet Chat Signedup User:', _user);
                // eslint-disable-next-line no-use-before-define
                await loginCometChatUser(user);
            }, error => {
                console.log('CometChat Signup failed with exception:', { error });
            }
        );
};

export const loginCometChatUser = async user => {
    await CometChat.getLoggedinUser()
        .then(async cometChatLoggedInUser => {
            if (!cometChatLoggedInUser) {
                await CometChat.login(user?.id, CometChatConfigs.authKey)
                    .then(
                        async _user => {
                            console.log('Comet Chat Loggedin User:', _user);
                        },
                        async error => {
                            if (error?.code === 'ERR_UID_NOT_FOUND') {
                                await createCometChatUser(user);
                            }
                            else {
                                console.log('CometChat Login failed with exception:', { error });
                            }
                        },
                    );
            }
        }, error => {
            console.log('Something went wrong', error);
        }
        );
};
