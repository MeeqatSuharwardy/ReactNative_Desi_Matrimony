/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { Info, HeartBoom, HeartBreak, NoDataList } from '~src/assets/animations';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { FEMALE_FORMAL, MALE_FORMAL, LOCK_IMAGE } from '~src/assets/images';
import { IconDislike, IconHeart, IconHeartBroken, IconLike, IconMessage, IconProfileCardWave } from '~src/assets/svg';
import { screenHeight, screenWidth } from '~src/constants/screenSizes';
import {
    ProfileCreatedByEnum,
    BloodGroupEnum,
    GenderEnum,
    MartialStatusEnum,
    RelegionEnum,
} from '~src/enum';
import { openChatWithUser, sendDisLikeSentiment, sendLikeSentiment } from '~src/redux/Home/homeActions';
import { getAge } from '~src/utils/dateFuncs';
import { generateBoxShadowStyle } from '~src/utils/helperFuncs';

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
});

const DetailItem = memo(({
    title = '',
    value = '',
    blur = false,
    visible = true
}) => visible && (
    <View
        style={{ flexDirection: 'row', paddingVertical: SCALED_SIZE.s5 }}>
        <View
            style={{
                flex: 1,
                alignItems: 'flex-start',
            }}>
            <Text style={{
                fontFamily: FONT.MEDIUM,
                fontSize: SCALED_SIZE.s16,
                textAlign: 'center',
                color: blur
                    ? '#46456650'
                    : '#464566',
            }}>
                {title}
            </Text>
        </View>
        <View
            style={{ flex: 1, alignItems: 'flex-end' }}>
            {
                blur ?
                    <Image
                        source={LOCK_IMAGE}
                        resizeMode="contain"
                        style={{ height: SCALED_SIZE.s20, width: SCALED_SIZE.s20, }}
                    />

                    :
                    <Text style={{
                        fontFamily: FONT.MEDIUM,
                        fontSize: SCALED_SIZE.s16,
                        textAlign: 'center',
                        color: '#464566',
                    }}>
                        {value}
                    </Text>
            }
        </View>
    </View>
));

const AnimationComponent = memo(({
    visible = false,
    heartBreak = false,
    heartBoom = false,
    duration = 2000,
}) => visible && (
    <View
        style={{
            height: screenHeight,
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            position:'absolute',
            zIndex: 999,
            backgroundColor: '#00000010'
        }}
    >
        <LottieView
            duration={duration}
            source={
                heartBreak 
                    ? HeartBreak
                    : heartBoom
                        ? HeartBoom
                        : NoDataList
            }
            autoPlay
            loop={false}
        />
    </View>
));

export const ProfileCard = memo(({
    displayDetails = true,
    showBottomButton = true,
    is_payment_plan_expired: userPaymentStatusExpired = true,
    username = '',
    email = '',
    employer = null,
    about_dislikes: aboutDislikes = null,
    about_family: aboutFamily = null,
    about_lifestyle: aboutLifestyle = null,
    about_likes: aboutLikes = null,
    about_partner: aboutPartner = null,
    about_self: aboutSelf = null,
    contact_number: contactNumber = '',
    annual_income: annualIncome = 0,
    avatar = null,
    blood_group: bloodGroup = '',
    brothers_count: brothersCount = 0,
    children_count: childrenCount = 0,
    city = null,
    city_of_birth: cityOfBirth = null,
    community = null,
    country = null,
    created_by: createdBy = '',
    date_of_birth: dateOfBirth = '',
    designation = null,
    first_name: firstName = '',
    gender = '',
    has_disability: hasDisability = false,
    height = 0,
    highest_qualification: highestQualification = null,
    id = 0,
    is_father_alive: isFatherAlive = true,
    is_mother_alive: isMotherAlive = true,
    last_name: lastName = '',
    marital_status: maritalStatus = '',
    mother_tongue: motherTongue = null,
    profile_dislikes: profileDislikes = 0,
    profile_likes: profileLikes = 0,
    religion = '',
    residency_status: residencyStatus = null,
    sisters_count: sistersCount = 0,
    sub_community: subCommunity = null,
    time_of_birth: timeOfBirth = '',
    zip_code: zipCode = null,
    onLikePressed = () => { },
    onDislikePressed = () => { },
    onMessagePressed = () => { }
}) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const [seeMore, setSeeMore] = useState(false);
    const [renderHeartBoom, setRenderHeartBoom] = useState(false);
    const [renderHeartBreak, setRenderHeartBreak] = useState(false);
    const UserTraitsData = [
        { title: 'Martial Status', value: MartialStatusEnum[maritalStatus] },
        { title: 'Age', value: getAge(dateOfBirth) },
        { title: 'Height', value: height ? `${height} cm` : '' },
        { title: 'Blood Group', value: BloodGroupEnum[bloodGroup] },
        { title: 'Gender', value: GenderEnum[gender] },
        { title: 'Education', value: highestQualification },
        { title: 'Profile Created By', value: ProfileCreatedByEnum[createdBy] },
        { title: 'Annual Income', value: annualIncome },
        { title: 'Number of Childrens', value: childrenCount },
        { title: 'Number of Brothers', value: brothersCount },
        { title: 'Number of Sisters', value: sistersCount },
        { title: 'City of Birth', value: cityOfBirth },
        { title: 'Community', value: community },
        { title: 'Sub Community', value: subCommunity },
        { title: 'Date of Birth', value: dateOfBirth },
        { title: 'Time of Birth', value: timeOfBirth },
        { title: 'Designation', value: designation },
        { title: 'Has Disablity', value: hasDisability ? 'Yes' : 'No' },
        { title: 'Is Father Alive', value: isFatherAlive ? 'Yes' : 'No' },
        { title: 'Is Mother Alive', value: isMotherAlive ? 'Yes' : 'No' },
        { title: 'Mother Tongue', value: motherTongue },
        { title: 'Relegion', value: RelegionEnum[religion] },
        { title: 'Residency Status', value: residencyStatus },
        { title: 'See More State Hook' }
    ];
    const animationDuration = 3000;

    useEffect(() => {
        if (renderHeartBoom || renderHeartBreak) {
            setTimeout(() => {
                setRenderHeartBoom(false);
                setRenderHeartBreak(false);
            }, animationDuration);
        }
    }, [renderHeartBoom, renderHeartBreak]);

    return (
        <>
            <View
                style={{
                    width: screenWidth * 0.9,
                    backgroundColor: '#FFFFFF',
                    borderRadius: SCALED_SIZE.s30,
                    ...generateBoxShadowStyle(),
                }}
            >
                <View
                    style={{
                        backgroundColor: displayDetails ? '#F7F7F7' : 'transparent',
                        padding: SCALED_SIZE.s20,
                        borderTopLeftRadius: SCALED_SIZE.s30,
                        borderTopRightRadius: SCALED_SIZE.s30,
                        borderBottomLeftRadius: displayDetails ? 0 : SCALED_SIZE.s30,
                        borderBottomRightRadius: displayDetails ? 0 : SCALED_SIZE.s30,
                        borderBottomColor: '#D8D8D8',
                        borderBottomWidth: displayDetails ? SCALED_SIZE.s1 : 0
                    }}>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        width: screenWidth * 0.9,
                        height: SCALED_SIZE.s84,
                        borderTopLeftRadius: SCALED_SIZE.s30,
                        borderTopRightRadius: SCALED_SIZE.s30,
                        borderBottomLeftRadius: displayDetails ? SCALED_SIZE.s30 : 0,
                        borderBottomRightRadius: displayDetails ? SCALED_SIZE.s30 : 0,
                        overflow: 'hidden'
                    }}>
                        <IconProfileCardWave />
                    </View>
                    {
                        userPaymentStatusExpired &&
                        (
                            <Pressable
                                onPress={() => {
                                    Alert.alert(
                                        'Upgradtion Notice',
                                        'Upgrade to Premium account to see hidden content'
                                    );
                                }}
                                style={{
                                    width: SCALED_SIZE.s50,
                                    height: SCALED_SIZE.s50,
                                    position: 'absolute',
                                    right: SCALED_SIZE.s10,
                                    top: SCALED_SIZE.s15
                                }}
                            >
                                <LottieView
                                    source={Info}
                                    autoPlay
                                    loop
                                />
                            </Pressable>
                        )
                    }
                    <Image
                        source={
                            // eslint-disable-next-line no-nested-ternary
                            avatar
                                ? {
                                    uri: avatar
                                }
                                : gender === 'M'
                                    ? MALE_FORMAL
                                    : FEMALE_FORMAL
                        }
                        resizeMode="cover"
                        blurRadius={
                            !userPaymentStatusExpired
                                ? 0
                                : avatar
                                    ? 20
                                    : 0
                        }
                        style={{
                            height: screenHeight * 0.2,
                            width: screenHeight * 0.2,
                            borderRadius: screenHeight * 0.2 / SCALED_SIZE.s2,
                            alignSelf: 'center',
                            margin: SCALED_SIZE.s5
                        }}
                    />
                    <Text style={{
                        fontFamily: FONT.BOLD,
                        fontSize: SCALED_SIZE.s18,
                        textAlign: 'center',
                        color: '#464566',
                        paddingBottom: SCALED_SIZE.s3
                    }}>
                        Rishta-ID: {id}
                    </Text>
                    <Text style={{
                        fontFamily: FONT.BOLD,
                        fontSize: SCALED_SIZE.s18,
                        textAlign: 'center',
                        color: '#464566',
                        padding: SCALED_SIZE.s3
                    }}>
                        {`${firstName} ${lastName}`}
                    </Text>
                    <Text style={{
                        fontFamily: FONT.MEDIUM,
                        fontSize: SCALED_SIZE.s16,
                        textAlign: 'center',
                        color: '#8F8E8E',
                        padding: SCALED_SIZE.s3
                    }}>
                        {
                            [country, city, zipCode]
                                .filter(location => location)
                                .join(', ')
                        }
                    </Text>
                    <View
                        style={{
                            position: 'absolute',
                            height: SCALED_SIZE.s40,
                            width: SCALED_SIZE.s40,
                            bottom: SCALED_SIZE.s30,
                            left: SCALED_SIZE.s10,
                            alignItems: 'center'
                        }}
                    >
                        <IconLike />
                        <Text
                            numberOfLines={1}
                            style={{ fontFamily: FONT.BOLD, fontSize: SCALED_SIZE.s14, color: colors.boldHeadingText }}
                        >
                            {profileLikes}
                        </Text>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            height: SCALED_SIZE.s40,
                            width: SCALED_SIZE.s40,
                            bottom: SCALED_SIZE.s30,
                            right: SCALED_SIZE.s10,
                            alignItems: 'center'
                        }}
                    >
                        <IconDislike />
                        <Text
                            numberOfLines={1}
                            style={{ fontFamily: FONT.BOLD, fontSize: SCALED_SIZE.s14, color: colors.boldHeadingText }}
                        >
                            {profileDislikes}
                        </Text>
                    </View>
                </View>
                {
                    displayDetails
                    && (
                        <View style={{ maxHeight: screenHeight * 0.33, }}>
                            <FlatList
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingHorizontal: SCALED_SIZE.s30,
                                    paddingVertical: SCALED_SIZE.s20
                                }}
                                showsVerticalScrollIndicator={false}
                                data={UserTraitsData}
                                keyExtractor={item => item.title}
                                renderItem={
                                    ({ item, index }) =>
                                        item?.title === 'See More State Hook' && UserTraitsData?.length > 10
                                            ?
                                            <Text
                                                style={{
                                                    fontFamily: FONT.BOLD,
                                                    paddingVertical: SCALED_SIZE.s10,
                                                    fontSize: SCALED_SIZE.s14,
                                                    textDecorationLine: 'underline',
                                                    color: colors.buttonLinerGradient[0]
                                                }}
                                                onPress={() => {
                                                    setSeeMore(!seeMore);
                                                }}>
                                                {
                                                    seeMore
                                                        ? 'Less'
                                                        : 'More'
                                                }
                                            </Text>
                                            :
                                            index < 9
                                                ?
                                                <DetailItem
                                                    title={item?.title}
                                                    value={item?.value}
                                                    blur={
                                                        index > 4 &&
                                                        userPaymentStatusExpired
                                                    }
                                                    visible
                                                />
                                                :
                                                <DetailItem
                                                    title={item?.title}
                                                    value={item?.value}
                                                    blur={
                                                        userPaymentStatusExpired
                                                    }
                                                    visible={seeMore}
                                                />

                                }
                            />

                        </View>
                    )}
                {
                    showBottomButton &&
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            paddingBottom: SCALED_SIZE.s20,
                            paddingTop: SCALED_SIZE.s10
                        }}>
                        <Pressable
                            onPress={()=>{
                                setRenderHeartBreak(true);
                                dispatch(sendDisLikeSentiment(id));
                                setTimeout(() => {
                                    onDislikePressed();
                                }, animationDuration);
                            }}
                            style={{
                                ...generateBoxShadowStyle(0, 2, '#ff3c78', 0.25, 4, 4, '#ff3c78'),
                                backgroundColor: 'transparent',
                                borderRadius: SCALED_SIZE.s45 / SCALED_SIZE.s2
                            }}
                        >
                            <IconHeartBroken
                                height={SCALED_SIZE.s45}
                                width={SCALED_SIZE.s45}
                            />
                        </Pressable>
                        <Pressable
                            onPress={()=>{
                                onMessagePressed();
                                dispatch(openChatWithUser(id));
                            }} 
                            style={{
                                ...generateBoxShadowStyle(0, 2, '#ff3c78', 0.25, 4, 4, '#ff3c78'),
                                backgroundColor: 'transparent',
                                borderRadius: SCALED_SIZE.s45 / SCALED_SIZE.s2
                            }}
                        >
                            <IconMessage
                                height={SCALED_SIZE.s45}
                                width={SCALED_SIZE.s45}
                            />
                        </Pressable>
                        <Pressable
                            onPress={()=>{
                                setRenderHeartBoom(true);
                                dispatch(sendLikeSentiment(id));
                                setTimeout(() => {
                                    onLikePressed();
                                }, animationDuration);
                            }} 
                            style={{
                                ...generateBoxShadowStyle(0, 2, '#ff3c78', 0.25, 4, 4, '#ff3c78'),
                                backgroundColor: 'transparent',
                                borderRadius: SCALED_SIZE.s45 / SCALED_SIZE.s2
                            }}
                        >
                            <IconHeart
                                height={SCALED_SIZE.s45}
                                width={SCALED_SIZE.s45}
                            />
                        </Pressable>
                    </View>
                }
            </View>
            <AnimationComponent
                duration={animationDuration} 
                visible={renderHeartBoom || renderHeartBreak}
                heartBreak={renderHeartBreak}
                heartBoom={renderHeartBoom}
            />
        </>
    );
});

DetailItem.propTypes = {
};

DetailItem.defaultProps = {
};

AnimationComponent.propTypes = {
};

AnimationComponent.defaultProps = {
};

ProfileCard.propTypes = {
};

ProfileCard.defaultProps = {
};
