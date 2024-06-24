const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

let coupons = [];

app.post('/api/coupons', (req, res) => {
    const { coupon } = req.body;
    console.log('Received coupon:', coupon);

    if (!coupon) {
        return res.status(400).json({ error: 'Coupon data is required' });
    }

    coupons.push(coupon);
    res.status(201).json({ message: 'Coupon created successfully', coupon });
});

app.get('/api/coupons', (req, res) => {
    res.json(coupons);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
