const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

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

// Serve HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for programmatic lookup
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
    } else if (name && addressBook[name]) {
        res.json({
            status: "error",
            message: `No coin specified. Available coins: ${Object.keys(addressBook[name]).join(', ')}`
        });
    } else {
        res.json({
            status: "error",
            message: `No address found for @${name}`
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Universal Abstract Address API running on port ${PORT}`);
    console.log(`📍 Your address: @kerge`);
});
