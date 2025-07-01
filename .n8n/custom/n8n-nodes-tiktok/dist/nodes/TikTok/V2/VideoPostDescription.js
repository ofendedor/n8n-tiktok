"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoPostFields = exports.videoPostOperations = void 0;
exports.videoPostOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['videoPost'],
            },
        },
        options: [
            {
                name: 'Upload',
                value: 'upload',
                description: 'Upload a video to TikTok',
                action: 'Upload video',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a video from TikTok',
                action: 'Delete video',
            },
        ],
        default: 'upload',
    },
];
exports.videoPostFields = [
    {
        displayName: 'Video File',
        name: 'videoFile',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['videoPost'],
                operation: ['upload'],
            },
        },
        description: 'The path to the video file to upload',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['videoPost'],
                operation: ['upload'],
            },
        },
        options: [
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
                description: 'The title for the video post',
            },
            {
                displayName: 'Tags',
                name: 'tags',
                type: 'string',
                default: '',
                description: 'Comma-separated list of tags for the video post',
            },
        ],
    },
    {
        displayName: 'Video ID',
        name: 'videoId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['videoPost'],
                operation: ['delete'],
            },
        },
        description: 'The ID of the video to delete',
    },
];
//# sourceMappingURL=VideoPostDescription.js.map