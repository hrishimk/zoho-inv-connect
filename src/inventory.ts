import axios, { AxiosInstance } from "axios"

interface AdjustmentInfo {
    date: string,
    reason: string,
    adjustment_type: 'quantity' | 'value',
    line_items: Array<{
        item_id: string,
        quantity_adjusted: number
    }>
}

export class ZohoInventory {

    accessToken: string
    refreshToken: string
    clientId: string
    clientSecret: string
    initialized = false

    axios: AxiosInstance

    constructor({ accessToken, refreshToken, clientId, clientSecret }: { accessToken: string, refreshToken: string, clientId: string, clientSecret: string }) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.axios = axios.create({
            baseURL: 'https://inventory.zoho.in/api/v1',
            headers: {
                Authorization: `Zoho-oauthtoken ${this.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });
    }

    async init() {
        await this.getAccessToken()
        this.initialized = true
    }

    async getAccessToken() {


        const params = new URLSearchParams()
        params.append('refresh_token', this.refreshToken)
        params.append('client_id', this.clientId)
        params.append('client_secret', this.clientSecret)
        params.append('redirect_uri', 'http://www.zoho.com/inventory')
        params.append('grant_type', 'refresh_token')
        const res = await axios.post('https://accounts.zoho.in/oauth/v2/token', params).then(r => r.data)
        this.accessToken = res.access_token
        this.axios = axios.create({
            baseURL: 'https://inventory.zoho.in/api/v1',
            headers: {
                Authorization: `Zoho-oauthtoken ${this.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });
    }

    initCheck() {
        if (!this.initialized) {
            throw new Error('Should run ZohoInventory.init() first')
        }
    }

    getItems() {
        this.initCheck()
        return this.axios.get('/items').then(r => r.data)
    }

    async adjust({ date, reason, adjustment_type, line_items }
        : AdjustmentInfo) {
        this.initCheck()
        const data = {
            date,
            reason,
            // "description": "Just a sample description.",
            // "reference_number": "REF-IA-00001",
            adjustment_type,
            line_items
        }

        const params = new URLSearchParams();
        params.append('JSONString', JSON.stringify(data));

        const d = await this.axios.post('/inventoryadjustments', params)
        return d.data
    }

}