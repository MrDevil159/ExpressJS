const { Router } = require('express');

const router = Router();

const groceryList = [
    {
        item: 'milk',
        quantity: 2,
    }, 
    {
        item: 'Something',
        quantity: 1,
    }, 
    {
        item: 'quan',
        quantity: 2,
    }
];
router.use((request, response, next)=> {
    console.log('Inside Grocery');
    console.log(request.user);
    if (request.user) {
        next()
    } else {
        response.sendStatus(401);
    }
})
router.get('/',(request, response, next) => {
    console.log('before handling request');
    next();
}, (request, response, next)=> {
    response.cookie('visited', true, {
        maxAge: 10000
    });
    response.send(groceryList);
    next();
},(request, response)=> {
    console.log('Finished processing request');
});

router.get('/:item',(request, response) => {
    const item = request.params.item;
    const itemIndex = groceryList.findIndex(grocery => grocery.item === item);
    if (itemIndex === -1) {
        console.log(request.cookies);

        response.status(404).send(`${item} not found`);
    } else {
        console.log(request.cookies);

        response.send(groceryList[itemIndex]); 
    }
});

router.post('/', (request, response) => {
    groceryList.push(request.body)
    console.log(groceryList);
    response.status(201).send("201");
});


router.get('/cart/check', (request, response) => {
    const { cart } = request.session;
    if(!cart) {
        response.send('404 Not Found');
    } else {
        response.send(cart);
    }
});

router.post('/cart/item', (request, response) => {
    const { item, quantity } = request.body;
    const cartItem = { item, quantity };
    const { cart } = request.session;
    if(cart) {
        request.session.cart.items.push(cartItem);
    } else {
        request.session.cart = {
            items: [cartItem]
        }
    }
    response.status(201).send(request.session)
});

module.exports = router;