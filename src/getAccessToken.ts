import axios from 'axios'

interface AccessTokenInfo {
    clientId: string,
    clientSecret: string,
    scope: string,
    code: string
}

const URL = 'https://accounts.zoho.in/oauth/v2/token'

export const getAccessToken = async (data: AccessTokenInfo) => {
    const params = new URLSearchParams();
    params.append('scope', data.scope);
    params.append('code', data.code);
    params.append('grant_type', 'authorization_code');
    params.append('client_id', data.clientId);
    params.append('client_secret', data.clientSecret);
    params.append('redirect_uri', 'http://example.com')

    return axios.post(URL, params)
}
