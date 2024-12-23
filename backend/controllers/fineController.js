const fineService = require('../services/fineService');

const fineController = {
    getFines: async (req, res) => {
        try {
            const fines = await fineService.getFines();
            res.status(201).json({ message: "Fines retrieved successfully", data: fines });
        } catch (error) {
            res.status(501).json({ message: "Fines retrieval failed", error: error.message });
        }
    },
    getFineById: async (req, res) => {
        try {
            const id = req.params.id;
            const fine = await fineService.getFineById(id);
            res.status(201).json({ message: "Fine retrieved successfully", data: fine });
        } catch (error) {
            res.status(501).json({ message: "Fine retrieval failed", error: error.message });
        }
    },
    payFine: async (req, res) => {
        try {
            const bb_id = req.params.id;
            const payedFine = await fineService.payFine(bb_id);
            res.status(201).json({ message: "Fine paid successfully", effectedRows: payedFine });
        } catch (error) {
            res.status(501).json({ message: "Payment failed", error: error.message });
        }
    },
};

module.exports = fineController;