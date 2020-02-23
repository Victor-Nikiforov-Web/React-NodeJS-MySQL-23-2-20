const express = require('express');
const router = express.Router();
const productsLogic = require('../business-logic/products-logic');

router.get('/products', async (request, response) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

router.get('/products/:id', async (request, response) => {
    try {
        const id = +request.params.id;
        const offers = await productsLogic.getOffersOfProduct(id);
        response.json(offers);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

router.post('/products', async (request, response) => {
    try {
        const offer = request.body;
        const addedOffer = await productsLogic.addOffer(offer);
        response.status(201).json(addedOffer);
    } catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
});
module.exports = router;