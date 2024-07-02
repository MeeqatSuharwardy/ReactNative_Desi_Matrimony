/* eslint-disable react/prop-types */
import React, { memo, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { StripeProvider, CardField, confirmPayment } from '@stripe/stripe-react-native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { Button, Header, Toast } from '~src/components';
import { showToast } from '~src/components/Toast/action';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import { fetchUserDataRequest } from '~src/redux/Auth/authActions';
import { getPaymentIntentRequest } from '~src/redux/Checkout/checkoutActions';
import { selectStripePaymentIntentStates, selectPaymentPlanStates } from '~src/redux/Checkout/checkoutSelectors';

const BillInfo = memo(({
    title = '',
    info = ''
}) => {
    const { colors } = useTheme();
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: '#F5F5F5',
                height: SCALED_SIZE.s45,
                alignItems: 'center'
            }}>
            <Text
                style={{
                    flex: 1,
                    paddingLeft: SCALED_SIZE.s20,
                    fontSize: SCALED_SIZE.s18,
                    fontFamily: FONT.BOLD,
                    color: colors.boldHeadingText
                }}>
                {title}
            </Text>
            <Text
                style={{
                    flex: 1,
                    paddingLeft: SCALED_SIZE.s40,
                    fontSize: SCALED_SIZE.s18,
                    fontFamily: FONT.MEDIUM,
                    color: `${colors.buttonLinerGradient[0]}90`
                }}>
                {info}
            </Text>
        </View>
    );
});

export const PaymentCheckout = () => {
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const stripePaymentIntentStates = useSelector(selectStripePaymentIntentStates);
    const paymentPlanStates = useSelector(selectPaymentPlanStates);
    const [selectedPaymentPlan] = paymentPlanStates
        ?.payment_plans_data
        ?.filter(el => el?.id === paymentPlanStates?.selected_payment_plan_id ? el : null);

    useEffect(() => {
        dispatch(getPaymentIntentRequest());
    }, [dispatch]);

    const handlePayPress = async () => {
        const clientSecret = stripePaymentIntentStates.stripeClientSecret;
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
        });

        if (error) {
            dispatch(showToast(error.localizedMessage));
        } else if (paymentIntent) {
            dispatch(fetchUserDataRequest());
            if (paymentIntent.status === 'Succeeded') {
                navigationActions
                    .replace(
                        NavigatorPath
                            .CheckoutSucceed
                    );
            }
            else {
                navigationActions
                    .replace(
                        NavigatorPath
                            .CheckoutFailed
                    );
            }
        }
    };

    return (
        stripePaymentIntentStates.fetchingPaymentIntentRequest
            ?
            <>
                <Header
                    title="Subscription Plan"
                />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator
                        size="large"
                        color={colors.buttonLinerGradient[0]}
                        style={{
                            height: SCALED_SIZE.s180,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                </View>
            </>
            :
            <StripeProvider
                publishableKey={stripePaymentIntentStates.stripePublishableKey}
            >
                <Header
                    title="Subscription Plan"
                />
                <View
                    style={{
                        flex: 1,
                        padding: SCALED_SIZE.s20,
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            borderRadius: SCALED_SIZE.s10,
                            backgroundColor: '#F5F5F5',
                            paddingVertical: SCALED_SIZE.s10
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                padding: SCALED_SIZE.s10,
                                fontSize: SCALED_SIZE.s18,
                                fontFamily: FONT.BOLD,
                                color: colors.buttonLinerGradient[0]
                            }}
                        >
                            Package Details
                        </Text>
                        <BillInfo
                            title="Package Name"
                            info={selectedPaymentPlan?.title}
                        />
                        <BillInfo
                            title="Duration"
                            info={`${selectedPaymentPlan?.duration} Days`}
                        />
                        <BillInfo
                            title="Amount"
                            info={`${selectedPaymentPlan?.amount} ${selectedPaymentPlan?.currency?.toUpperCase()}`}
                        />
                    </View>
                    <CardField
                        postalCodeEnabled
                        placeholders={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: '#F5F5F5',
                            textColor: '#000000',
                        }}
                        style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 30,
                        }}
                    />
                    <BillInfo
                        title="Total Amount"
                        info={`${selectedPaymentPlan?.amount} ${selectedPaymentPlan?.currency?.toUpperCase()}`}
                    />
                    <Button
                        buttonContainerStyle={{
                            marginTop: SCALED_SIZE.s30
                        }}
                        title="Subscribe"
                        onPress={handlePayPress}
                    />
                </View>
                <Toast />
            </StripeProvider>
    );
};
