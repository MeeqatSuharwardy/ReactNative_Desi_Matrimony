import { DefaultTheme, DarkTheme, } from '@react-navigation/native';

const colors = {
    background: '#FFFFFF',
    blackOverLay: '#00000090',
    buttonLinerGradient: ['#ff3c78', '#fa4d82', '#fc608f'],
    lightCard: '#ffffff',
    lightCardBorder: '#ff3c7820',
    boldHeadingText: '#464566',
    headingWhite: '#FFFFFF',
    inactive: 'gray'
};

export const systemBasedTheme = {
    MyLightTheme: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            ...colors,
        },
    },
    MyDarkTheme: {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            ...colors,
        },
    }
};
