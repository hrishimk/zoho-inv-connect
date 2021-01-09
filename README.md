# zoho-inv-connect
Connect to zoho inventory

Only Zoho India API's are supported, because the API urls are hard coded 😴

Get all items
```ts

const REFRESH_TOKEN = 'Zoho refresh token'
const CLIENT_ID = 'Zoho client ID'
const CLIENT_SECRET = 'Zoho client secret'

const inventory = new ZohoInventory(
    {
        refreshToken: REFRESH_TOKEN,

        clientId: CLIENT_ID,

        clientSecret: CLIENT_SECRET
    }
);

(async () => {
    // Run init before calling other methods
    await inventory.init()
    
    // Get all items in inventory
    const data = await inventory.getItems()
})();
```

Add a stock adjustment
```ts

const REFRESH_TOKEN = 'Zoho refresh token'
const CLIENT_ID = 'Zoho client ID'
const CLIENT_SECRET = 'Zoho client secret'

const inventory = new ZohoInventory(
    {
        refreshToken: REFRESH_TOKEN,

        clientId: CLIENT_ID,

        clientSecret: CLIENT_SECRET
    }
);

(async () => {
    // Run init before calling other methods
    await inventory.init()
    
    // Add 100 units of an item to stock
    const data = await inventory.adjust({
        date: curDate, adjustment_type: 'quantity', reason: 'Store credit', line_items: [
            {
                item_id: 'PRODUCT_ID',
                quantity_adjusted: 100
            }
        ]
    })
})();

```