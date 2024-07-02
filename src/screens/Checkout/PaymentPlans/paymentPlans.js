/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { IconCheckboxChecked, IconCheckboxUnChecked } from '~src/assets/svg';
import { Button, Header } from '~src/components';
import { screenHeight } from '~src/constants/screenSizes';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import { selectApp } from '~src/redux/Auth/authSelectors';
import { getPaymentPlansRequest, setSelectedPaymentPlanId } from '~src/redux/Checkout/checkoutActions';
import { selectPaymentPlanStates } from '~src/redux/Checkout/checkoutSelectors';
import { generateBoxShadowStyle } from '~src/utils/helperFuncs';
import { NoDataView, Loader } from '../components';
import styles from './styles';

export const PaymentPlans = () => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector(selectApp);
    const paymentPlanStates = useSelector(selectPaymentPlanStates);
    const { colors } = useTheme();

    useEffect(() => {
        dispatch(getPaymentPlansRequest());
    }, [dispatch]);

    const planSelectionPressed = () => {
        navigationActions
            .replace(
                NavigatorPath
                    .PaymentCheckout
            );
    };

    return (
        <View style={styles.container(colors.background)}>
            {
                paymentPlanStates
                    .fetchingPaymentPlansRequest
                    ?
                    <Loader
                        title="Payment Plans"
                    />
                    :
                    paymentPlanStates
                        .payment_plans_data
                        .length > 0
                        ?
                        <>
                            <Header
                                title="Payment Plans"
                            />
                            <View
                                style={{
                                    backgroundColor: '#F6AE38',
                                    justifyContent: 'center',
                                    paddingVertical: SCALED_SIZE.s10,
                                    paddingHorizontal: SCALED_SIZE.s20,
                                    alignItems: 'center',
                                    ...generateBoxShadowStyle(),
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: FONT.BOLD,
                                        fontSize: SCALED_SIZE.s18,
                                        color: '#000404',
                                        textAlign: 'center'
                                    }}>
                                    {
                                        !currentUser?.is_payment_plan_expired
                                            &&
                                            currentUser?.payment_plan === null
                                            ?
                                            'You are using trial version of the application. Please Subscribe to a Payment Plan'
                                            :
                                            !currentUser?.is_payment_plan_expired
                                                &&
                                                currentUser?.payment_plan !== null
                                                ?
                                                `You are already subscribed to ${currentUser?.payment_plan_title}`
                                                :
                                                currentUser?.is_payment_plan_expired
                                                    &&
                                                    currentUser?.payment_plan === null
                                                    ?
                                                    'Your trial for using this application has expired. Please Subscribe to a Payment Plan'
                                                    :
                                                    currentUser?.is_payment_plan_expired
                                                        &&
                                                        currentUser?.payment_plan !== null
                                                        ?
                                                        'Your Payment Plan has expired. Please Renew your Plan'
                                                        :
                                                        null
                                    }
                                </Text>
                            </View>

                            <FlatList
                                ListHeaderComponentStyle={{
                                    marginLeft: -SCALED_SIZE.s20
                                }}
                                ListHeaderComponent={
                                    <>
                                        <Text
                                            style={{
                                                paddingHorizontal: SCALED_SIZE.s20,
                                                paddingTop: SCALED_SIZE.s20,
                                                fontFamily: FONT.BOLD,
                                                fontSize: SCALED_SIZE.s18,
                                                color: colors.boldHeadingText
                                            }}>
                                            Let's Choose a Payment Plan:
                                        </Text>
                                        <Text
                                            style={{
                                                paddingTop: SCALED_SIZE.s15,
                                                paddingBottom: SCALED_SIZE.s20,
                                                fontFamily: FONT.REGULAR,
                                                fontSize: SCALED_SIZE.s14,
                                                color: colors.boldHeadingText,
                                                textAlign: 'center'
                                            }}>
                                            Payment plans starts from
                                            {` ${paymentPlanStates?.payment_plans_data[0]?.currency?.toUpperCase()}`}
                                            {` ${paymentPlanStates?.payment_plans_data[0]?.amount}`}
                                        </Text>
                                        <Text
                                            style={{
                                                paddingBottom: SCALED_SIZE.s10,
                                                fontFamily: FONT.MEDIUM,
                                                fontSize: SCALED_SIZE.s14,
                                                color: colors.boldHeadingText,
                                                textAlign: 'center'
                                            }}>
                                            Press a Plan to start with
                                        </Text>
                                    </>
                                }
                                contentContainerStyle={{
                                    paddingBottom: screenHeight * 0.2,
                                    paddingHorizontal: SCALED_SIZE.s20,
                                }}
                                data={
                                    paymentPlanStates
                                        .payment_plans_data
                                }
                                keyExtractor={item => item.id.toString()}
                                renderItem={
                                    ({ item }) =>
                                        <Pressable
                                            disabled={
                                                !currentUser?.is_payment_plan_expired
                                                &&
                                                currentUser?.payment_plan !== null
                                            }
                                            onPress={() => {
                                                dispatch(setSelectedPaymentPlanId(item?.id || null));
                                            }}
                                            style={{
                                                ...generateBoxShadowStyle(0, 2, '#000', 0.15, 4, 4, '#000'),
                                                backgroundColor: '#ffffff',
                                                borderRadius: SCALED_SIZE.s10,
                                                height: SCALED_SIZE.s160,
                                                padding: SCALED_SIZE.s20,
                                                marginVertical: SCALED_SIZE.s8,
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 0.9
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontFamily: FONT.BOLD,
                                                            color: colors.buttonLinerGradient[0],
                                                            fontSize: SCALED_SIZE.s16
                                                        }}
                                                    >
                                                        {`${item?.title} for ${item?.currency?.toUpperCase()} ${item?.amount}`}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flex: 0.1
                                                    }}
                                                >
                                                    {
                                                        paymentPlanStates?.selected_payment_plan_id === item?.id
                                                            ?
                                                            <IconCheckboxChecked />
                                                            :
                                                            <IconCheckboxUnChecked />
                                                    }
                                                </View>
                                            </View>
                                            <Text
                                                style={{
                                                    fontFamily: FONT.MEDIUM,
                                                    color: `${colors.boldHeadingText}90`,
                                                    fontSize: SCALED_SIZE.s14,
                                                    paddingTop: SCALED_SIZE.s10,
                                                    paddingBottom: SCALED_SIZE.s20
                                                }}
                                            >
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                            </Text>
                                        </Pressable>
                                }
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    zIndex: 999,
                                    bottom: screenHeight * 0.05,
                                    width: '90%',
                                    alignSelf: 'center'
                                }}
                            >
                                <Button
                                    disabled={paymentPlanStates.selected_payment_plan_id === null}
                                    onPress={planSelectionPressed}
                                    title="Next"
                                />
                            </View>
                        </>
                        :
                        <NoDataView
                            title="Payment Plans"
                        />
            }
        </View>
    );
};
