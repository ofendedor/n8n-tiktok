"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TikTokOAuth2Api = void 0;
const scopes = [
    'user.info.basic',
    'video.list',
    'video.upload',
    'video.delete',
    'video.comment',
    'video.like',
];
class TikTokOAuth2Api {
    constructor() {
        this.name = 'tiktokOAuth2Api';
        this.displayName = 'TikTok OAuth API';
        this.documentationUrl = 'https://developers.tiktok.com/doc/oauth-user-access-token-management';
        this.properties = [
            {
                displayName: 'Client Key',
                name: 'clientKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
            },
            {
                displayName: 'Client Secret',
                name: 'clientSecret',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
            },
            {
                displayName: 'Redirect URI',
                name: 'redirectUri',
                type: 'string',
                default: '',
                required: true,
            },
            {
                displayName: 'Scopes',
                name: 'scopes',
                type: 'hidden',
                default: `${scopes.join(',')}`,
            },
        ];
        this.test = {
            request: {
                method: 'POST',
                url: 'https://open.tiktokapis.com/v2/oauth/token/',
                body: {
                    client_key: '={{$credentials.clientKey}}',
                    client_secret: '={{$credentials.clientSecret}}',
                    redirect_uri: '={{$credentials.redirectUri}}',
                    grant_type: 'authorization_code',
                    scope: '={{$self.scopes}}',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        };
    }
}
exports.TikTokOAuth2Api = TikTokOAuth2Api;
//# sourceMappingURL=TikTokOAuth2Api.credentials.js.map