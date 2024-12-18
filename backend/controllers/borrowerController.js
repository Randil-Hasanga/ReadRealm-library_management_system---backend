const borrowerService = require('../services/borrowerService');

const borrowerController = {
    getBorrowers: async (req, res) => {
        try {
            const borrowers = await borrowerService.getBorrowers();
            res.status(201).json({ message: "Borrowers retrieved successfully", data: borrowers });
        } catch (error) {
            res.status(501).json({ message: "Borrowers retrieval failed", error: error.message });
        }
    },
    getBorrowerById: async (req, res) => {
        try {
            const borrower_id = req.params.id;
            const borrower = await borrowerService.getBorrowerById(borrower_id);
            res.status(201).json({ message: "Borrowers retrieved successfully", data: borrower });
        } catch (error) {
            res.status(501).json({ message: "Borrower retrieval failed", error: error.message });
        }
    },
    createBorrower: async (req, res) => {
        try {
            const new_borrower = await borrowerService.createBorrower(req.body);
            res.status(201).json({ message: "Borrower insertion successful", data: new_borrower });
        } catch (error) {
            res.status(501).json({ message: "Borrower insertion failed", error: error.message });
        }
    },
    updateBorrower: async (req, res) => {
        try {
            const borrower_id = req.params.id;
            const effectedRows = await borrowerService.updateBorrower(borrower_id, req.body);
            res.status(201).json({ message: "Borrower updated successfully", effectedRows: effectedRows });
        } catch (error) {
            res.status(501).json({ message: "Borrower update failed", error: error.message });
        }
    },
    deleteOrRestoreBorrower: async (req, res) => {
        try {
            const id = req.params.id;
            const effectedRows = await borrowerService.deleteOrRestoreBorrower(id, req.body);
            res.status(201).json({ message: "Borrower updated successfully", effectedRows: effectedRows });
        } catch (error) {
            res.status(501).json({ message: "Borrower update failed", error: error.message });
        }
    }
};

module.exports = borrowerController;