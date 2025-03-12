const Service = require('../models/Service');

const getServices = async (req, res) => {
    try {
        let { minPrice, maxPrice, type, page = 1, limit = 10 } = req.query;
        minPrice = minPrice ? parseFloat(minPrice) : 0;
        maxPrice = maxPrice ? parseFloat(maxPrice) : Infinity;
        page = parseInt(page);
        limit = parseInt(limit);
        let query = {
            price: { $gte: minPrice, $lte: maxPrice }
        };
        if (type) query.category = type;
        const services = await Service.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const totalServices = await Service.countDocuments(query);
        res.json({
            total: totalServices,
            page,
            limit,
            totalPages: Math.ceil(totalServices / limit),
            services
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

 module.exports = getServices
