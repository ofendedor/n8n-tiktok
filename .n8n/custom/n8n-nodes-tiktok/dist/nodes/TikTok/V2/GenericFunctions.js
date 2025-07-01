"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiktokApiRequest = tiktokApiRequest;
exports.tiktokApiRequestAllItems = tiktokApiRequestAllItems;
exports.returnId = returnId;
exports.returnIdFromUsername = returnIdFromUsername;
const n8n_workflow_1 = require("n8n-workflow");
const url_1 = require("url");
async function tiktokApiRequest(method, resource, body = {}, qs = {}, fullOutput, uri, option = {}) {
    let options = {
        method,
        body,
        qs,
        url: uri || `https://open.tiktokapis.com/v2${resource}`,
        json: true,
    };
    try {
        if (Object.keys(option).length !== 0) {
            options = Object.assign({}, options, option);
        }
        if (Object.keys(body).length === 0) {
            delete options.body;
        }
        if (Object.keys(qs).length === 0) {
            delete options.qs;
        }
        if (fullOutput) {
            return await this.helpers.requestOAuth2.call(this, 'tiktokOAuth2Api', options);
        }
        else {
            const { data } = await this.helpers.requestOAuth2.call(this, 'tiktokOAuth2Api', options);
            return data;
        }
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
async function tiktokApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
    const returnData = [];
    let responseData;
    query.max_results = 10;
    do {
        responseData = await tiktokApiRequest.call(this, method, endpoint, body, query, true);
        query.next_token = responseData.meta.next_token;
        returnData.push(...responseData[propertyName]);
    } while (responseData.meta.next_token);
    return returnData;
}
function returnId(contentId) {
    if (contentId.mode === 'id') {
        return contentId.value;
    }
    else if (contentId.mode === 'url') {
        try {
            const url = new url_1.URL(contentId.value);
            if (!url.hostname.includes('tiktok.com')) {
                throw new n8n_workflow_1.ApplicationError('Invalid TikTok domain');
            }
            const parts = url.pathname.split('/');
            if (parts.length !== 4 || !/^\d+$/.test(parts[3])) {
                throw new n8n_workflow_1.ApplicationError('Invalid TikTok content URL');
            }
            return parts[3];
        }
        catch (error) {
            throw new n8n_workflow_1.ApplicationError('Not a valid TikTok URL', {
                level: 'warning',
                cause: error,
                tags: {},
                extra: {}
            });
        }
    }
    else {
        throw new n8n_workflow_1.ApplicationError(`The mode ${contentId.mode} is not valid!`, { level: 'warning',
            tags: {},
            extra: {}
        });
    }
}
async function returnIdFromUsername(usernameRlc) {
    usernameRlc.value = usernameRlc.value.replace('@', '');
    if (usernameRlc.mode === 'username') {
        const user = (await tiktokApiRequest.call(this, 'GET', `/users/by/username/${usernameRlc.value}`, {}));
        return user.id;
    }
    else {
        throw new n8n_workflow_1.ApplicationError(`The username mode ${usernameRlc.mode} is not valid!`, {
            level: 'warning',
            tags: {},
            extra: {}
        });
    }
}
//# sourceMappingURL=GenericFunctions.js.map