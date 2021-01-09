import { ZohoInventory } from '../inventory'
import * as dotenv from 'dotenv';
dotenv.config();

const date_ob = new Date();

// adjust 0 before single digit date
const date = ("0" + date_ob.getDate()).slice(-2);

// current month
const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
const year = date_ob.getFullYear();

const curDate = year + '-' + month + '-' + date

it('Fetches zoho inv items successfully', async () => {
    const inventory = new ZohoInventory(
        {
            // @ts-ignore
            accessToken: process.env.ACCESS_TOKEN,
            // @ts-ignore
            refreshToken: process.env.REFRESH_TOKEN,
            // @ts-ignore
            clientId: process.env.CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.CLIENT_SECRET
        }
    );

    await inventory.init()
    const data = await inventory.getItems()
    expect(data).toHaveProperty('message', 'success')
})

describe('Adjustment', () => {
    it('Adjustment reciept works correctly', async () => {
        const inventory = new ZohoInventory(
            {
                // @ts-ignore
                accessToken: process.env.ACCESS_TOKEN,
                // @ts-ignore
                refreshToken: process.env.REFRESH_TOKEN,
                // @ts-ignore
                clientId: process.env.CLIENT_ID,
                // @ts-ignore
                clientSecret: process.env.CLIENT_SECRET
            }
        );

        await inventory.init()
        const data = await inventory.adjust({
            date: curDate, adjustment_type: 'quantity', reason: 'Store credit', line_items: [
                {
                    item_id: '445212000000011058',
                    quantity_adjusted: 100
                }
            ]
        })
        expect(data).toHaveProperty('message', 'Inventory Adjustment has been added')
    })

    it('Adjustment issue works correctly', async () => {
        const inventory = new ZohoInventory(
            {
                // @ts-ignore
                accessToken: process.env.ACCESS_TOKEN,
                // @ts-ignore
                refreshToken: process.env.REFRESH_TOKEN,
                // @ts-ignore
                clientId: process.env.CLIENT_ID,
                // @ts-ignore
                clientSecret: process.env.CLIENT_SECRET
            }
        );

        await inventory.init()
        const data = await inventory.adjust({
            date: curDate, adjustment_type: 'quantity', reason: 'Store credit', line_items: [
                {
                    // @ts-ignore
                    item_id: process.env.PRODUCT_ID,
                    quantity_adjusted: -100
                }
            ]
        })

        expect(data).toHaveProperty('message', 'Inventory Adjustment has been added')
    })
})