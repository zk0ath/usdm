const express = require('express');
const app = express();
const cors = require('cors');
const o1js = require('o1js');
const { ethers } = require('ethers');
require('dotenv').config();

app.use(express.json());
app.use(cors()); // Using cors with default settings, which allows all origins

const infura_api_key = process.env.INFURA_API_KEY;
const sepoliaProvider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infura_api_key}`);

app.post('/startTransfer', async (req, res) => {
    console.log('Data received:', req.body);

    try {
        const txHash = req.body.txHash;
        const transaction = await sepoliaProvider.getTransaction(txHash);
        var amount = transaction.data.substr(11, transaction.data.length - 10);
        amount = parseInt(amount, 16);

        const tx = await o1js.Mina.transaction(req.body.minaPublicKey, () => {
            blockchainHandler.tokenContract.mint(mintToAddress, amountToMint);
        });
        await transaction.prove();
        await transaction.sign(signers).send();

        console.log('Transaction:', amount);
        return res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});
