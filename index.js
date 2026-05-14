const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// YOUR ROUTING TABLE: One name @kerge maps to ALL coins
const addressBook = {
    "kerge": {
        "BTC": "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
        "ETH": "0x27fa47...22941",
        "WAX": "teamgreymass",
        "SOL": "SolanaMainnetAddressHere",
        "DOGE": "DogeAddressHere",
        "USDC": "0x27fa47...22941",
        "USDT": "0x27fa47...22941"
    }
};

// PayString compatible endpoint
app.get('/.well-known/paystring', (req, res) => {
    res.json({
        "addresses": [
            { "paymentNetwork": "BTC", "addressDetails": { "address": addressBook.kerge.BTC } },
            { "paymentNetwork": "ETH", "addressDetails": { "address": addressBook.kerge.ETH } },
            { "paymentNetwork": "WAX", "addressDetails": { "address": addressBook.kerge.WAX } }
        ]
    });
});

// Your custom resolve endpoint
app.get('/resolve', (req, res) => {
    const { name, coin } = req.query;
    
    if (name && coin && addressBook[name] && addressBook[name][coin.toUpperCase()]) {
        res.json({
            status: "success",
            user: name,
            coin: coin.toUpperCase(),
            address: addressBook[name][coin.toUpperCase()],
            message: `Send ${coin.toUpperCase()} to @${name}`
        });
    } else {
        res.json({
            status: "error",
            message: `No address found for @${name} with coin ${coin}`
        });
    }
});

// Simple homepage showing your abstract address
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>@kerge - Universal Abstract Address</title></head>
            <body style="font-family: monospace; text-align: center; margin-top: 50px;">
                <h1>🔵 UNIVERSAL ABSTRACT ADDRESS</h1>
                <h2>@kerge</h2>
                <p>Send ANY coin to this one address.</p>
                <p>No one knows it's crypto - it just looks like a username!</p>
                <hr>
                <h3>Supported coins:</h3>
                <ul style="list-style: none;">
                    <li>BTC → ${addressBook.kerge.BTC.substring(0, 10)}...</li>
                    <li>ETH → ${addressBook.kerge.ETH.substring(0, 10)}...</li>
                    <li>WAX → ${addressBook.kerge.WAX}</li>
                </ul>
                <p><a href="/resolve?name=kerge&coin=BTC">Test BTC resolution</a></p>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`═══════════════════════════════════════════`);
    console.log(`   UNIVERSAL ABSTRACT ADDRESS API LIVE!`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`📍 Your abstract address: @kerge`);
    console.log(`🔗 API URL: http://localhost:${PORT}`);
    console.log(`✅ Ready to receive ANY coin!`);
    console.log(`═══════════════════════════════════════════`);
});
