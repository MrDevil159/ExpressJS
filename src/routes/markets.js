const { Router } = require('express');

const router = Router();
const superMarkets = [
    {
        id:1,
        store: 'Whole foods',
        miles: 0.6,
    },
    {
        id:2,
        store: 'Traders',
        miles: 1,
    },
    {
        id:3,
        store: 'walmart',
        miles: 5
    }
];
router.use((request, response, next)=> {
    if (request.session.user) {
        next()
    } else {
        response.sendStatus(401);
    }
})
router.get('/', (req, res) => {
    const miles = req.query.miles;
    const parsedMiles = parseInt(miles);
    if(!isNaN(parsedMiles)) {
        const filteredStores = superMarkets.filter(store => store.miles <= parsedMiles);
        res.send(filteredStores);
    }
    else res.send(superMarkets);
});

module.exports = router;