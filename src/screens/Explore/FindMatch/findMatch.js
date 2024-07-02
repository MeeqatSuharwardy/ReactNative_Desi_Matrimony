import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Firebase } from '~src/Firebase';
import { SearchingProfile } from '~src/assets/animations';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { IconTopWave } from '~src/assets/svg';
import { ProfileCard } from '~src/components';
import { resetFilteredActiveUsers } from '~src/redux/Explore/exploreActions';
import { selectFirebaseUsersStates } from '~src/redux/Explore/exploreSelectors';
import styles from './styles';

export const FindMatch = () => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const {
        subscribed_id_user: subscribedIdUser
    } = useSelector(selectFirebaseUsersStates);

    const animation = useRef();

    const subscribeFirebaseObserver = () => {
        Firebase
            .actions
            .subscribeActiveUsers();
        Firebase
            .actions
            .addUserInActiveUsersTable();
        Firebase
            .actions
            .subscribeMatchStatus();
        Firebase
            .actions
            .addRequestWithParamInMatchStatusTable();
    };

    const unsubscribeFirebaseObserver = () => {
        Firebase
            .actions
            .unsubscribeActiveUsers();
        Firebase
            .actions
            .unsubscribeMatchStatus();
    };

    useEffect(() => {
        if (isFocused) {
            subscribeFirebaseObserver();
        }
        return () => unsubscribeFirebaseObserver();
    }, [isFocused]);

    useEffect(() => () => dispatch(
        resetFilteredActiveUsers()
    ), [dispatch]);

    return (
        <View style={styles.container(colors.background)}>
            <View
                style={styles.topSvg}>
                <IconTopWave />
            </View>
            {
                subscribedIdUser
                    ?
                    <ProfileCard {...subscribedIdUser} />
                    : (
                        <>
                            <LottieView
                                ref={animation}
                                source={SearchingProfile}
                                style={{
                                    width: '100%',
                                   
                                }}
                                autoPlay
                                loop />
                            <Text
                                style={{
                                    fontFamily: FONT.BLACK,
                                    fontSize: SCALED_SIZE.s26,
                                    color: colors.buttonLinerGradient[0]
                                }}>
                                Finding a match
                            </Text>
                        </>
                    )
            }
        </View>
    );
};
