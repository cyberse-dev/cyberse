module.exports = {
    name: 'hangman',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/apps/hangman',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js',
    ],
};
