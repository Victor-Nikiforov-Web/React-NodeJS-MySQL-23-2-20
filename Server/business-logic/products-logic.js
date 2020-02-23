const dal = require('../data-access/dal');

async function getAllProducts() {
    const sql = `SELECT * FROM products`;
    const products = await dal.executeAsync(sql);
    return products;
}

// async function getOffersOfProduct(id) {
//     const sql = `SELECT offers.price, products.name FROM offers 
//     inner JOIN  products ON products.id = offers.productID
//     WHERE offers.productID = ${id}`;
//     const offers = dal.executeAsync(sql);
//     return offers;
// }

async function getOffersOfProduct(id) {
    const sql = `SELECT * from offers
    WHERE offers.productID = ${id}`;
    const offers = dal.executeAsync(sql);
    return offers;
}

async function addOffer(offer) {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const nowTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const sql = `INSERT INTO offers(productID ,date ,nameOfUser ,price)
    VALUES (${offer.productID},'${nowTime}','${offer.nameOfUser}',${offer.price})`;
    const info = await dal.executeAsync(sql);
    offer.id = info.insertID;
    return offer;
}

module.exports = {
    getAllProducts,
    getOffersOfProduct,
    addOffer
}