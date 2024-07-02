module.exports = {
    presets: [
        'module:metro-react-native-babel-preset',
        '@babel/preset-flow'
    ],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            },
        ],
        [
            'babel-plugin-root-import',
            {
                rootPathPrefix: '~src',
                rootPathSuffix: 'src'
            }
        ],
        'react-native-reanimated/plugin',
    ]
};
