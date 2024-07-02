import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { useTheme } from '@react-navigation/native';
import { APP_ICON_PINK_TRANSPARENT } from '~src/assets/images';
import { LABEL } from '~src/constants/displayTexts';
import { screenWidth } from '~src/constants/screenSizes';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import styles from './styles';

const SLIDER_WIDTH = screenWidth;

const introScreen1 = () => (
    <View
        style={styles.introItem}>
        <FastImage
            source={APP_ICON_PINK_TRANSPARENT}
            style={styles.introImage}
            resizeMode={FastImage.resizeMode.contain}
        />

        <Text
            style={styles.title}>
            {'Preventative Security\nOn-Demand'}
        </Text>
        <Text
            style={styles.description}>
            911 was designed to deal with crime. Hero was designed to prevent it.
        </Text>
    </View>
);

const introScreen2 = () => (
    <View
        style={styles.introItem}>
        <FastImage
            source={APP_ICON_PINK_TRANSPARENT}
            style={styles.introImage}
            resizeMode={FastImage.resizeMode.contain}
        />

        <Text
            style={styles.title}>
            {'With Hero, You\'re\nNever Alone'}
        </Text>
        <Text
            style={styles.description}>
            {'With Hero\'s advanced technology, you are never alone.' +
                'Hero\'s are always available and can be by your side within minutes.'}
        </Text>
    </View>
);

const introScreen3 = () => (
    <View style={styles.introItem}>
        <FastImage
            source={APP_ICON_PINK_TRANSPARENT}
            style={styles.introImage}
            resizeMode={FastImage.resizeMode.contain}
        />

        <Text style={styles.title}>
            Pay only when you use it and to your measure
        </Text>
        <Text style={styles.description}>
            Say goodbye to contracts or memberships, pay only when you use it and worry only about what matters
        </Text>
    </View>
);

const introScreens = [introScreen1, introScreen2, introScreen3];

export const Intro = () => {
    // const { colors } = useTheme();
    const [activeSlide, setActiveSlide] = useState(0);
    const carouselRef = useRef(null);

    const skipPressed = () => {
        navigationActions.reset(NavigatorPath.NAVIGATOR_AUTH);
    };

    return (
        <View>
            <View
                style={styles.carouselContainer}>
                <Carousel
                    ref={carouselRef}
                    onSnapToItem={index => setActiveSlide(index)}
                    data={introScreens}
                    renderItem={({ item: Screen }) => <Screen />}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={SLIDER_WIDTH}
                    contentContainerCustomStyle={styles.carouselContentContainer}
                />
            </View>
            <View
                style={styles.bottomActionContainer}>
                <View
                    style={styles.skipTextContainer}>
                    <Text
                        onPress={skipPressed}
                        style={styles.labelText}>{LABEL.SKIP}</Text>
                </View>
                <Pagination
                    dotsLength={introScreens.length}
                    activeDotIndex={activeSlide}
                    dotStyle={styles.paginationDot}
                    inactiveDotScale={1}
                    inactiveDotStyle={styles.paginationDotInactive}
                />
                <View
                    style={styles.nextTextContainer}>
                    <Text
                        onPress={
                            () => {
                                if (activeSlide < introScreens.length - 1) {
                                    carouselRef?.current?.snapToNext(true, true);
                                }
                                else {
                                    skipPressed();
                                }
                            }
                        }
                        style={styles.labelText}>{
                            activeSlide < introScreens.length - 1
                                ? LABEL.NEXT
                                : LABEL.DONE
                        }</Text>
                </View>
            </View>
        </View>
    );
};
