module.exports = {
    name: 'search-bar',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/libs/search-bar',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js',
    ],
};
