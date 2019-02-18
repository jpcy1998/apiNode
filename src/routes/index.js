const {
    Router
} = require('express');
const router = Router()

router.get('/test', (req, res) => {
    res.json({
        "Titulo": "Hello cotto"
    })
})

router.get('/monos', (req, res) => {
    res.json({
        "Titulo": "7u7"
    })
})

module.exports = router