/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Pressable,
    Text,
    KeyboardAvoidingView,
    useColorScheme,
    Platform,
    Alert,
    Image,
    Keyboard
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import LottieView from 'lottie-react-native';
import { AddPhoto } from '~src/assets/animations';
import { SCALED_SIZE } from '~src/assets/fonts';
import {
    IconBottomWave,
    IconEmail,
    IconPassword,
    IconTopWave,
    IconUser,
    IconUserName
} from '~src/assets/svg';
import {
    Button,
    ContactInput,
    CustomTextInput,
    Toast
} from '~src/components';
import { showToast } from '~src/components/Toast/action';
import { LABEL, CLAUSE } from '~src/constants/displayTexts';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import { signUpRequest } from '~src/redux/Auth/authActions';
import { selectApp } from '~src/redux/Auth/authSelectors';
import { getFilePathForPlatform, isRunningOniOS } from '~src/utils/helperFuncs';
import { checkCameraPermissions } from '~src/utils/permissionFuncs';
import { isValidEmail, validateNumber } from '~src/utils/validations';
import styles from './styles';

export const Signup = () => {

    const dispatch = useDispatch();
    const { colors } = useTheme();
    const scheme = useColorScheme();
    const animation = useRef();

    const { signingUp } = useSelector(selectApp);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [cca2, setCca2] = useState('DK');
    const [callingCode, setCallingCode] = useState(['45']);
    const [country, setCountry] = useState(['Denmark']);
    const [contact_number, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [profilePictureFile, setProfilePictureFile] = useState({ uri: null, type: 'image/jpeg', name: 'avatar.jpg' });

    const onAddPhotoPressed = async () => {
        checkCameraPermissions()
            .then(() => {
                Alert
                    .alert(
                        'Options',
                        'Choose Image from',
                        [
                            {
                                text: 'Camera',
                                onPress: () => {
                                    ImagePicker
                                        .openCamera({
                                            mediaType: 'photo',
                                            width: 300,
                                            height: 400,
                                            cropping: true,
                                        })
                                        .then(image => { 
                                            const file = profilePictureFile;
                                            file.uri = getFilePathForPlatform(image);
                                            setProfilePictureFile({ ...file });
                                        })
                                        // eslint-disable-next-line no-unused-vars
                                        .catch(err => { });
                                }
                            },
                            {
                                text: 'Gallery',
                                onPress: () => {
                                    ImagePicker
                                        .openPicker({
                                            mediaType: 'photo',
                                            width: 300,
                                            height: 400,
                                            cropping: true,
                                        })
                                        .then(image => { 
                                            const file = profilePictureFile;
                                            file.uri = getFilePathForPlatform(image);
                                            setProfilePictureFile({ ...file });
                                        })
                                        // eslint-disable-next-line no-unused-vars
                                        .catch(err => { });
                                }
                            }
                        ],
                    );
            });
    };

    const SignupPressed = () => {
        if (isValidEmail(email)) {
            if (password === confirm_password) {
                if (password.length >= 8) {
                    if (validateNumber(contact_number, cca2)) {
                        Keyboard.dismiss();
                        dispatch(signUpRequest({
                            payload: {
                                first_name,
                                last_name,
                                contact_number: `+${callingCode}${contact_number}`,
                                country,
                                email,
                                username,
                                password,
                                avatar: profilePictureFile?.uri 
                                    ? profilePictureFile
                                    : null,
                                loginFrom: Platform.OS
                            },
                            successCb: () => {
                                navigationActions
                                    .replace(
                                        NavigatorPath
                                            .SignupSuccessful
                                    );
                            },
                        }));
                    }
                    else {
                        dispatch(showToast('Please enter valid contact number'));
                    }
                }
                else {
                    dispatch(showToast('The password must be at least 8 characters'));
                }
            }
            else {
                dispatch(showToast('Password field didn\'t match with confirm password'));
            }
        }
        else {
            dispatch(showToast('The email must be a valid email address'));
        }
    };

    useEffect(() => {
        setTimeout(() => {
            animation?.current?.play();
        }, 1000);
    }, [animation]);

    useEffect(() => {
        if (
            _.isEmpty(first_name) ||
            _.isEmpty(last_name) ||
            _.isEmpty(contact_number) ||
            _.isEmpty(email) ||
            _.isEmpty(username) ||
            _.isEmpty(password) ||
            _.isEmpty(confirm_password)
        ) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [
        first_name,
        last_name,
        contact_number,
        email,
        username,
        password,
        confirm_password
    ]);

    return (
        <KeyboardAvoidingView
            style={styles.container(colors.background)}
            keyboardVerticalOffset={
                isRunningOniOS()
                    ? SCALED_SIZE.s60
                    : 0
            }
            behavior={
                isRunningOniOS()
                    ? 'padding'
                    : 'height'
            }
        >
            <View
                style={styles.topSvg}>
                <IconTopWave />
            </View>
            <View
                style={styles.bottomSvg}>
                <IconBottomWave />
            </View>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                contentContainerStyle={styles.scrollContainer}>
                <Text
                    style={styles.welcomeText(colors.boldHeadingText)}>
                    {CLAUSE.SIGNUP}
                </Text>
                <Text
                    style={styles.logback(colors.boldHeadingText)}>
                    {CLAUSE.GET_ACCESS_TO_THE_SERVICES}
                </Text>
                <Pressable
                    onPress={onAddPhotoPressed}
                    style={styles.addImageContainer(colors.buttonLinerGradient[0])}>
                    {
                        profilePictureFile?.uri
                            ? (
                                <Image
                                    source={{ uri: profilePictureFile?.uri }}
                                    resizeMode="cover"
                                    style={styles.addImage}
                                />
                            )
                            : (
                                <LottieView
                                    ref={animation}
                                    source={AddPhoto}
                                    style={styles.addImage}
                                    autoPlay
                                    loop
                                />
                            )
                    }
                </Pressable>
                <CustomTextInput
                    value={first_name}
                    placeholder={LABEL.FIRST_NAME}
                    onChangeText={_first_name => {
                        setFirstName(_first_name);
                    }}
                    icon={IconUser}
                    iconSvgProps={styles.icon}
                />
                <CustomTextInput
                    value={last_name}
                    placeholder={LABEL.LAST_NAME}
                    onChangeText={_last_name => {
                        setLastName(_last_name);
                    }}
                    icon={IconUser}
                    iconSvgProps={styles.icon}
                />
                <ContactInput
                    darkTheme={scheme === 'dark'}
                    cca2={cca2}
                    callingCode={callingCode}
                    value={contact_number}
                    onChangeText={_contact_number => {
                        setContactNumber(_contact_number);
                    }}
                    select={_country => {
                        setCountry(_country.name);
                        setCallingCode(_country.callingCode);
                        setCca2(_country.cca2);
                    }}
                />
                <CustomTextInput
                    value={email}
                    placeholder={LABEL.EMAIL}
                    onChangeText={_email => {
                        setEmail(_email);
                    }}
                    icon={IconEmail}
                    iconSvgProps={styles.icon}
                />
                <CustomTextInput
                    value={username}
                    placeholder={LABEL.USERNAME}
                    onChangeText={_username => {
                        setUsername(_username);
                    }}
                    icon={IconUserName}
                    iconSvgProps={styles.icon}
                />
                <CustomTextInput
                    value={password}
                    placeholder={LABEL.PASSWORD}
                    onChangeText={_password => {
                        setPassword(_password);
                    }}
                    icon={IconPassword}
                    iconSvgProps={styles.icon}
                />
                <CustomTextInput
                    value={confirm_password}
                    placeholder={LABEL.CONFIRM_PASSWORD}
                    onChangeText={_confirm_password => {
                        setConfirmPassword(_confirm_password);
                    }}
                    icon={IconPassword}
                    iconSvgProps={styles.icon}
                />
                <>
                    <Text
                        style={styles.signingupTheAccount(colors.boldHeadingText)}>
                        {CLAUSE.BY_SIGNING_UP_THE_ACCOUNT_YOU_AGREE}
                    </Text>
                    <Text
                        style={styles.termsOfService(colors.buttonLinerGradient[0])}>
                        {CLAUSE.TERMS_OF_SERVICES}
                    </Text>
                </>
                <Button
                    loading={signingUp}
                    disabled={buttonDisabled}
                    buttonContainerStyle={styles.signupButton}
                    title={CLAUSE.SIGNUP}
                    onPress={SignupPressed}
                />
            </ScrollView>
            <Toast />
        </KeyboardAvoidingView>
    );
};
