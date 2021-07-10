const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const apikey = '44d9a6c3da87ec9c9e5ab74007f72e8f';
const baseUrl = `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`

app.use(express.json());

//Welcome Route

app.get('/', (req, res)=>{
    res.send("Welcome to the Amazon Scraper API");
})

//Get Product Details
app.get('/products/:productId', async(req, res)=>{
    const {productId} = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/dp/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error); 
    }
})

//Get Product Reviews
app.get('/products/:productId/reviews', async(req, res)=>{
    const {productId} = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/product-reviews/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error); 
    }
})

//Get Product Offers
app.get('/products/:productId/offers', async(req, res)=>{
    const {productId} = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error); 
    }
})

//Get Search Results
app.get('/search/:searchQuery', async(req, res)=>{
    const {searchQuery} = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/s?k=${searchQuery}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error); 
    }
})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})