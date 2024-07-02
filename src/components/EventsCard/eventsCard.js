import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import {
    IconCheckedLine,
    IconLineJoiner,
    IconLocation,
    IconStartBadge,
    IconTime,
} from '~src/assets/svg';
import { Button } from '~src/components/Button';
import {
    convertDateToStringEuropeanFormat,
    convertTimeToStringEuropeanFormat
} from '~src/utils/dateFuncs';
import { generateBoxShadowStyle } from '~src/utils/helperFuncs';

const styles = StyleSheet.create({
    cardContainer: borderColor => ({
        height: SCALED_SIZE.s360,
        borderRadius: SCALED_SIZE.s10,
        paddingVertical: SCALED_SIZE.s10,
        paddingHorizontal: SCALED_SIZE.s15,
        backgroundColor: '#FFFFFF',
        borderWidth: SCALED_SIZE.s1,
        borderColor,
        marginVertical: SCALED_SIZE.s5,
        ...generateBoxShadowStyle(),
    }),
    mainContentContainer: {
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 0.05,
        alignItems: 'center'
    },
    rightContainer: {
        flex: 0.95,
        paddingLeft: SCALED_SIZE.s20,
        paddingVertical: SCALED_SIZE.s10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: SCALED_SIZE.s10,
    },
    rightButton: showJoinButton => ({
        flex: 1,
        marginLeft: showJoinButton ? SCALED_SIZE.s5 : 0
    }),
    leftButton: showJoinButton => ({
        flex: 1,
        marginRight: showJoinButton ? SCALED_SIZE.s5 : 0
    }),
    addressText: color => ({
        fontSize: SCALED_SIZE.s14,
        fontFamily: FONT.MEDIUM,
        paddingHorizontal: SCALED_SIZE.s10,
        color
    }),
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: color => ({
        fontSize: SCALED_SIZE.s18,
        fontFamily: FONT.BOLD,
        paddingVertical: SCALED_SIZE.s10,
        color
    }),
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateTimeRightContainer: {
        justifyContent: 'center',
        paddingHorizontal: SCALED_SIZE.s20,
    },
    beginAtText: color => ({
        fontSize: SCALED_SIZE.s16,
        fontFamily: FONT.MEDIUM,
        color,
        paddingBottom: SCALED_SIZE.s8
    }),
    beginContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    endContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeText: color => ({
        fontSize: SCALED_SIZE.s14,
        fontFamily: FONT.MEDIUM,
        color,
        paddingHorizontal: SCALED_SIZE.s10
    }),
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SCALED_SIZE.s8
    },
    endAtText: color => ({
        fontSize: SCALED_SIZE.s16,
        fontFamily: FONT.MEDIUM,
        color,
        paddingVertical: SCALED_SIZE.s8
    })
});

export const EventsCard = memo(({
    item,
    index,
    start_date: startDate,
    end_date: endDate,
    title,
    address,
    country,
    city,
    state,
    interest_status: interestStatus,
    detailsButtonPressed,
    joinButtonPressed,
    showJoinButton
}) => {
    const { colors } = useTheme();
    // eslint-disable-next-line global-require
    const DateSvg = require('~src/assets/svg')[`IconDate${new Date(startDate || 1).getDate()}`];

    const detailsPressed = useCallback(() => {
        detailsButtonPressed(item, index);
    }, [detailsButtonPressed, index, item]);

    const joinPressed = useCallback(() => {
        joinButtonPressed(item, index);
    }, [joinButtonPressed, index, item]);

    return (
        <View
            style={styles.cardContainer(colors.lightCardBorder)}>
            <View
                style={styles.mainContentContainer}>
                <View
                    style={styles.leftContainer}>
                    <IconCheckedLine
                        height={SCALED_SIZE.s25}
                        width={SCALED_SIZE.s25}
                    />
                    <IconLineJoiner
                        height={SCALED_SIZE.s210}
                        fill={colors.buttonLinerGradient[0]}
                    />
                    <IconStartBadge
                        height={SCALED_SIZE.s25}
                        width={SCALED_SIZE.s25}
                        fill={colors.buttonLinerGradient[0]}
                    />
                </View>
                <View
                    style={styles.rightContainer}
                >
                    <View
                        style={styles.dateTimeContainer}
                    >
                        <DateSvg
                            height={SCALED_SIZE.s65}
                            width={SCALED_SIZE.s65}
                        />
                        <View
                            style={styles.dateTimeRightContainer}
                        >
                            <Text
                                style={styles.beginAtText(colors.boldHeadingText)}
                            >
                                Begin at:
                            </Text>
                            <View
                                style={styles.beginContainer}
                            >
                                <IconTime
                                    height={SCALED_SIZE.s15}
                                    width={SCALED_SIZE.s15}
                                />
                                <Text
                                    style={styles.timeText(`${colors.boldHeadingText}90`)}
                                >
                                    {`${convertDateToStringEuropeanFormat(
                                        new Date(startDate)
                                    )}`}
                                </Text>
                            </View>
                            <View
                                style={styles.timeContainer}
                            >
                                <IconTime
                                    height={SCALED_SIZE.s15}
                                    width={SCALED_SIZE.s15}
                                />
                                <Text
                                    style={styles.timeText(`${colors.boldHeadingText}90`)}
                                >
                                    {`${convertTimeToStringEuropeanFormat(
                                        new Date(startDate)
                                    )}`}
                                </Text>
                            </View>
                            <Text
                                style={styles.endAtText(colors.boldHeadingText)}
                            >
                                End at:
                            </Text>
                            <View
                                style={styles.endContainer}
                            >
                                <IconTime
                                    height={SCALED_SIZE.s15}
                                    width={SCALED_SIZE.s15}
                                />
                                <Text
                                    style={styles.timeText(`${colors.boldHeadingText}90`)}
                                >
                                    {`${convertDateToStringEuropeanFormat(
                                        new Date(endDate)
                                    )}`}
                                </Text>
                            </View>
                            <View
                                style={styles.timeContainer}
                            >
                                <IconTime
                                    height={SCALED_SIZE.s15}
                                    width={SCALED_SIZE.s15}
                                />
                                <Text
                                    style={styles.timeText(`${colors.boldHeadingText}90`)}
                                >
                                    {`${convertTimeToStringEuropeanFormat(
                                        new Date(endDate)
                                    )}`}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text
                        style={styles.titleText(colors.boldHeadingText)}
                    >
                        {title || ''}
                    </Text>
                    <View
                        style={styles.addressContainer}>
                        <IconLocation
                            height={SCALED_SIZE.s25}
                            width={SCALED_SIZE.s25}
                        />
                        <Text
                            style={styles.addressText(colors.boldHeadingText)}
                        >
                            {address || ''}
                            {address ? ',\n' : '\n'}
                            {country || ''}
                            {city ? ', ' : ''}
                            {city || ''}
                            {city ? ',\n' : '\n'}
                            {state || ''}

                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={styles.buttonContainer}
            >
                <Button
                    title="DETAILS"
                    onPress={detailsPressed}
                    loading={false}
                    buttonContainerStyle={styles.leftButton(showJoinButton)}
                />
                {
                    showJoinButton &&
                    (
                        <Button
                            title={
                                interestStatus === 'I' || interestStatus === 'N'
                                    ? 'JOIN'
                                    : 'JOINED'
                            }
                            onPress={joinPressed}
                            loading={false}
                            buttonContainerStyle={styles.rightButton(showJoinButton)}
                        />
                    )
                }
            </View>
        </View>
    );
});

EventsCard.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    interest_status: PropTypes.string,
    detailsButtonPressed: PropTypes.func,
    joinButtonPressed: PropTypes.func,
    showJoinButton: PropTypes.bool
};

EventsCard.defaultProps = {
    item: null,
    index: 0,
    start_date: '',
    end_date: '',
    title: '',
    address: '',
    country: '',
    city: '',
    state: '',
    interest_status: 'I',
    detailsButtonPressed: () => { },
    joinButtonPressed: () => { },
    showJoinButton: true
};
