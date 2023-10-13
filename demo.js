const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Your Facebook Page Access Token
const pageAccessToken = 'EAAS5FCpbQAQBOzZCK2BFZBfwxtU2EyPabewJDPChtN2Y4ZAixdbaXWqKAf5G5YDRC4a50K1dpe4Cyx78aiAUBIXyeRnIfBYXpin1psdC2fW4q9SINnvdCfR7eTGmuBN2RqZCzkRdJyaHdHhFcspDDm4k29XlcEs8LQ3xjbYn85lXcRdjwRIB1npnGtZAoMI9Ay9iCCGZA5bM5evJlREMFEQtUlL2tuCZC4ZD';
const pageId = '135945206274101'; // Replace with your Page ID

app.post('/post-to-facebook', async (req, res) => {
    const message = req.body.message;

    // Create the post data
    const postData = {
        access_token: pageAccessToken,
        message: message,
    };

    try {
        // Make a POST request to Facebook's Graph API to post to your Page
        const response = await axios.post(
            `https://graph.facebook.com/v12.0/${pageId}/feed`,
            postData
        );

        // Handle the API response
        if (response.data.id) {
            res.status(200).json({ message: 'Posted to Facebook successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to post to Facebook.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to post to Facebook.' });
    }
});

// Serve the HTML form at the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/demo.html');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
