/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, Pressable, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { NoDataList, ProceedArrow, SearchBar } from '~src/assets/animations';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { FEMALE_FORMAL, MALE_FORMAL } from '~src/assets/images';
import { IconNotification } from '~src/assets/svg';
import { ProfileCard, RoundedImageView } from '~src/components';
import { screenHeight } from '~src/constants/screenSizes';
import { GenderEnum } from '~src/enum';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import { fetchUserDataRequest } from '~src/redux/Auth/authActions';
import { selectApp } from '~src/redux/Auth/authSelectors';
import {
    getDilReceivedUsersRequest,
    getUserProfileVisitedByRequest,
    setSelectedUser
} from '~src/redux/Home/homeActions';
import { selectDilReceivedStates, selectUserProfileVisitedByStates } from '~src/redux/Home/homeSelectors';
import { getGreetingTextFromTime } from '~src/utils/dateFuncs';
import { generateBoxShadowStyle } from '~src/utils/helperFuncs';
import styles from './styles';

export const Dashboard = () => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const animation = useRef();
    const { currentUser } = useSelector(selectApp);
    const userProfileVisitedByStates = useSelector(selectUserProfileVisitedByStates);
    const dilReceivedStates = useSelector(selectDilReceivedStates);

    useEffect(() => {
        setTimeout(() => {
            animation?.current?.play();
        }, 1000);
    }, [animation]);

    useEffect(() => {
        if (isFocused) {
            dispatch(fetchUserDataRequest());
            dispatch(getUserProfileVisitedByRequest());
            dispatch(getDilReceivedUsersRequest());
        }
    }, [dispatch, isFocused]);

    return (
        <>
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: screenHeight * 0.07,
                    backgroundColor: '#ff3c78',
                    paddingHorizontal: SCALED_SIZE.s20
                }}>
                <RoundedImageView
                    onPress={() => { navigationActions.navigate(NavigatorPath.SettingsStack); }}
                    imageUri={currentUser?.avatar || null}
                    nameFontSize={SCALED_SIZE.s16}
                    nameInitials={currentUser?.first_name}
                    nameTextColor="#ff3c78"
                    bgColor="#ffffff"
                    size={SCALED_SIZE.s34} />
                <Text
                    style={{
                        ...styles.headingText(colors.headingWhite),
                        alignSelf: 'center',
                        paddingHorizontal: SCALED_SIZE.s10,
                        flex: 1,
                    }}
                >
                    {`${getGreetingTextFromTime()} ${currentUser?.first_name} !` || ''}
                </Text>
                <Pressable>
                    <IconNotification
                        height={SCALED_SIZE.s28}
                        width={SCALED_SIZE.s28}
                    />
                </Pressable>
            </View>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
            >

                <Pressable
                    onPress={() => { }}>
                    <LottieView
                        source={SearchBar}
                        style={{ width: '100%', padding: 0 }}
                        autoPlay
                        loop={false}
                    />
                </Pressable>
                <View
                    style={{
                        // flex: 1,
                        colors: colors.background,
                        paddingHorizontal: SCALED_SIZE.s20
                    }}>
                    <View style={{
                        height: SCALED_SIZE.s250,
                        backgroundColor: colors.lightCard,
                        borderRadius: SCALED_SIZE.s10,
                        borderWidth: SCALED_SIZE.s1,
                        borderColor: colors.lightCardBorder,
                        ...generateBoxShadowStyle(),
                        padding: SCALED_SIZE.s20

                    }} >
                        <Text
                            style={styles.headingText(colors.boldHeadingText)}
                        >
                            Your Profile Need Attention
                        </Text>
                        <View style={{ alignItems: 'center', paddingVertical: SCALED_SIZE.s5 }}>
                            <CircularProgress
                                value={
                                    (
                                        Object
                                            .values(currentUser)
                                            .filter(n => n)
                                            .length
                                        /
                                        Object
                                            .keys(currentUser)
                                            .length
                                    )
                                    *
                                    100
                                }
                                fontSize={SCALED_SIZE.s30}
                                radius={SCALED_SIZE.s65}
                                progressValueColor="#ecf0f1"
                                inActiveStrokeColor="#9b59b6"
                                inActiveStrokeOpacity={0.5}
                                inActiveStrokeWidth={SCALED_SIZE.s10}
                                activeStrokeWidth={SCALED_SIZE.s20}
                                activeStrokeSecondaryColor="green"
                                maxValue={100}
                                valueSuffix="%"
                            />

                        </View>
                        <Text
                            style={styles.miniHeadingText(colors.boldHeadingText)}
                        >
                            Your Progress
                        </Text>
                        <Pressable
                            onPress={() => { navigationActions.navigate(NavigatorPath.SettingsStack); }}
                            style={{
                                flexDirection: 'row',
                                paddingVertical: SCALED_SIZE.s12,
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: FONT.MEDIUM,
                                    fontSize: SCALED_SIZE.s14,
                                    color: colors.buttonLinerGradient[0],
                                    paddingHorizontal: SCALED_SIZE.s10
                                }}
                            >
                                Complete your Profile
                            </Text>
                            <LottieView
                                ref={animation}
                                source={ProceedArrow}
                                style={styles.completeProfileAnimation}
                                autoPlay
                                loop
                            />
                        </Pressable>
                    </View>
                    <>
                        <Text
                            style={{
                                fontFamily: FONT.BOLD,
                                fontSize: SCALED_SIZE.s16,
                                paddingTop: SCALED_SIZE.s20,
                                color: colors.boldHeadingText
                            }}>
                            See Who has recently viewed you profile:
                        </Text>
                        {
                            userProfileVisitedByStates
                                .fetchingUserProfileVisitedByRequest
                                ?
                                <ActivityIndicator
                                    size="large"
                                    color={colors.buttonLinerGradient[0]}
                                    style={{
                                        height: SCALED_SIZE.s180,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                />
                                :
                                userProfileVisitedByStates
                                    .userProfileVisitedBy
                                    .length > 0
                                    ?
                                    <FlatList
                                        contentContainerStyle={{
                                            flexGrow: 1,
                                            paddingVertical: SCALED_SIZE.s20
                                        }}
                                        horizontal
                                        data={
                                            userProfileVisitedByStates
                                                .userProfileVisitedBy
                                        }
                                        keyExtractor={item => item.id.toString()}
                                        renderItem={
                                            ({ item }) => (
                                                <Pressable
                                                    onPress={() => {
                                                        dispatch(setSelectedUser(item));
                                                    }}
                                                    key={item?.id?.toString()}
                                                >
                                                    <ImageBackground
                                                        source={item?.avatar
                                                            ? { uri: item?.avatar }
                                                            : GenderEnum[item?.gender] === GenderEnum.F
                                                                ? FEMALE_FORMAL
                                                                : MALE_FORMAL
                                                        }
                                                        resizeMode="cover"
                                                        blurRadius={
                                                            !currentUser?.is_payment_plan_expired
                                                                ? 0
                                                                : item?.avatar
                                                                    ? 20
                                                                    : 0
                                                        }
                                                        style={{
                                                            height: SCALED_SIZE.s180,
                                                            width: SCALED_SIZE.s170,
                                                            backgroundColor: '#ff3c7820',
                                                            marginHorizontal: SCALED_SIZE.s10,
                                                            borderRadius: SCALED_SIZE.s10,
                                                            overflow: 'hidden'
                                                        }}>
                                                        <View style={{ flex: 1 }} />
                                                        <View
                                                            style={{
                                                                flex: 0.3,
                                                                padding: SCALED_SIZE.s10,
                                                                backgroundColor: '#00000080',
                                                                borderTopLeftRadius: SCALED_SIZE.s10,
                                                                borderTopRightRadius: SCALED_SIZE.s10
                                                            }}>
                                                            <Text
                                                                numberOfLines={1}
                                                                style={{
                                                                    color: '#ffffff',
                                                                    fontFamily: FONT.BOLD,
                                                                    fontSize: SCALED_SIZE.s14
                                                                }}>
                                                                {
                                                                // eslint-disable-next-line max-len
                                                                    `${item?.first_name || item?.username} ${item?.last_name}`
                                                                }
                                                            </Text>
                                                            <Text
                                                                numberOfLines={1}
                                                                style={{
                                                                    color: '#ffffff',
                                                                    fontFamily: FONT.BOLD,
                                                                    fontSize: SCALED_SIZE.s12,
                                                                    paddingTop: SCALED_SIZE.s5,
                                                                }}>
                                                                {`Viewed ${item?.view_count} times your profile`}
                                                            </Text>
                                                        </View>
                                                    </ImageBackground>
                                                </Pressable>
                                            )}
                                    />
                                    :
                                    <View
                                        style={{
                                            height: SCALED_SIZE.s180,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <LottieView
                                            source={NoDataList}
                                            autoPlay
                                            loop
                                        />
                                    </View>
                        }
                    </>
                    <Text
                        style={{
                            fontFamily: FONT.BOLD,
                            fontSize: SCALED_SIZE.s16,
                            paddingTop: SCALED_SIZE.s20,
                            color: colors.boldHeadingText
                        }}>
                        See Who has sent you Dil Connection:
                    </Text>
                    {
                        dilReceivedStates
                            .dilReceivedUsers
                            .length > 10
                                && (
                                    <Text
                                        onPress={
                                            () => {
                                                navigationActions.navigate(NavigatorPath.DilConnectUsers);
                                            }
                                        }
                                        style={{
                                            fontFamily: FONT.BLACK,
                                            fontSize: SCALED_SIZE.s14,
                                            color: colors.buttonLinerGradient[0],
                                            paddingBottom: SCALED_SIZE.s20,
                                            alignSelf: 'flex-end'
                                        }}>
                                            View all
                                    </Text>
                                )
                    }
                    {

                        dilReceivedStates
                            .fetchingDilReceivedUsersRequest
                            ?
                            <ActivityIndicator
                                size="large"
                                color={colors.buttonLinerGradient[0]}
                                style={{
                                    height: SCALED_SIZE.s180,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            />
                            :
                            dilReceivedStates
                                .dilReceivedUsers
                                .length > 0
                                ?
                                dilReceivedStates
                                    .dilReceivedUsers
                                    .slice(0, 10)
                                    ?.map(
                                        item =>
                                            <Pressable
                                                onPress={() => {
                                                    dispatch(setSelectedUser(item));
                                                }}
                                                key={item?.id?.toString()}
                                                style={{
                                                    marginVertical: SCALED_SIZE.s10,
                                                }}
                                            >
                                                <ProfileCard
                                                    key={item?.id?.toString()}
                                                    {...item}
                                                    showBottomButton={false}
                                                    is_payment_plan_expired={currentUser?.is_payment_plan_expired}
                                                    displayDetails={false}
                                                />
                                            </Pressable>
                                    )
                                :
                                <View
                                    style={{
                                        height: SCALED_SIZE.s180,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <LottieView
                                        source={NoDataList}
                                        autoPlay
                                        loop
                                    />
                                </View>
                    }
                </View>
            </ScrollView>
        </>
    );
};
