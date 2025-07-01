"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TikTokV2 = void 0;
const VideoPostDescription_1 = require("./VideoPostDescription");
const PhotoPostDescription_1 = require("./PhotoPostDescription");
const GenericFunctions_1 = require("./GenericFunctions");
class TikTokV2 {
    constructor(baseDescription) {
        this.methods = {
            loadOptions: {
                async getLanguages() {
                    const returnData = [];
                    const languages = ['English', 'Spanish', 'French'];
                    for (const language of languages) {
                        returnData.push({
                            name: language,
                            value: language.toLowerCase(),
                        });
                    }
                    return returnData;
                },
            },
        };
        this.description = {
            ...baseDescription,
            version: 2,
            description: 'Upload and manage TikTok videos and photos',
            subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
            defaults: {
                name: 'TikTok',
            },
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: 'tiktokOAuth2Api',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Video Post',
                            value: 'videoPost',
                            description: 'Upload a video to TikTok',
                        },
                        {
                            name: 'Photo Post',
                            value: 'photoPost',
                            description: 'Upload a photo to TikTok',
                        },
                    ],
                    default: 'videoPost',
                },
                ...VideoPostDescription_1.videoPostOperations,
                ...VideoPostDescription_1.videoPostFields,
                ...PhotoPostDescription_1.photoPostOperations,
                ...PhotoPostDescription_1.photoPostFields,
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const length = items.length;
        let responseData;
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < length; i++) {
            try {
                if (resource === 'videoPost') {
                    if (operation === 'upload') {
                        const videoFile = this.getNodeParameter('videoFile', i);
                        const body = {
                            videoFile,
                        };
                        responseData = await GenericFunctions_1.tiktokApiRequest.call(this, 'POST', '/video/upload', body);
                    }
                }
                if (resource === 'photoPost') {
                    if (operation === 'upload') {
                        const photoUrl = this.getNodeParameter('photoUrl', i);
                        const body = {
                            photoUrl,
                        };
                        responseData = await GenericFunctions_1.tiktokApiRequest.call(this, 'POST', '/photo/upload', body);
                    }
                }
                const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), { itemData: { item: i } });
                returnData.push(...executionData);
            }
            catch (error) {
                if (this.continueOnFail()) {
                    const executionErrorData = {
                        json: {
                            error: error.message,
                        },
                    };
                    returnData.push(executionErrorData);
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.TikTokV2 = TikTokV2;
//# sourceMappingURL=TikTokV2.node.js.map