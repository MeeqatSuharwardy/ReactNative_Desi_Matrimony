/* eslint-disable max-len */
/* eslint-disable prefer-promise-reject-errors */
import { Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { isRunningOniOS } from './helperFuncs';

const catchAlert = title => {
    Alert
        .alert(
            'Whoops!',
            title,
            [
                { 
                    text: 'Dismiss', 
                }
            ],
        );
};

export const checkCameraPermissions = () => {
    const permissions = isRunningOniOS()
        ? PERMISSIONS.IOS
        : PERMISSIONS.ANDROID;

    return new Promise((resolve, reject) => {
        check(permissions.CAMERA)
            .then(result => {
                switch (result) {
                case RESULTS.UNAVAILABLE:
                    catchAlert(
                        'This feature is not available (on this device / in this context)',
                        () => { 
                            reject('This feature is not available (on this device / in this context)'); 
                        }
                    );
                    break;
                case RESULTS.DENIED:
                    request(permissions.CAMERA)
                        .then(requestResult => {
                            switch (requestResult) {
                            case RESULTS.GRANTED:
                                resolve('The permission is granted');
                                break;
                            default:
                                catchAlert(
                                    'Try to request Permissions Manually or The permission has not been requested / is denied but requestable',
                                    () => { 
                                        reject('Try to request Permissions Manually or The permission has not been requested / is denied but requestable'); 
                                    }
                                );
                            }
                        })
                        .catch(requestError => {
                            catchAlert(
                                'Unexpected error occured',
                                () => { 
                                    reject(requestError); 
                                }
                            );
                        });
                    break;
                case RESULTS.LIMITED:
                    catchAlert(
                        'The permission is limited: some actions are possible',
                        () => { 
                            reject('The permission is limited: some actions are possible'); 
                        }
                    );
                    break;
                case RESULTS.GRANTED:
                    resolve('The permission is granted');
                    break;
                case RESULTS.BLOCKED:
                    catchAlert(
                        'The permission is denied and not requestable anymore',
                        () => { 
                            reject('The permission is denied and not requestable anymore'); 
                        }
                    );
                    break;
                default:
                    catchAlert(
                        'Something Went Wrong',
                        () => { 
                            reject('Something Went Wrong'); 
                        }
                    );
                    break;
                }
            })
            .catch(error => {
                catchAlert(
                    'Unexpected error occured',
                    () => { 
                        reject(error); 
                    }
                );
            });
    });
};
