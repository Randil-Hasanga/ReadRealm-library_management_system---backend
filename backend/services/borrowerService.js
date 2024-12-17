const Borrower = require('../models/Borrower');

const borrowerService = {
    getBorrowers: async () => {
        const borrowers = await Borrower.findAll();
        if (!borrowers) {
            throw new Error('No borrower found');
        }
        return borrowers;
    },
    getBorrowerById: async (id) => {
        const borrower = await Borrower.findOne({ where: { borrower_id: id } });
        if (!borrower) {
            throw new Error('Borrower not found');
        }
        return borrower;
    },
    createBorrower: async (data) => {
        const { NIC } = data;
        const existing_borrower = await Borrower.findOne({ where: { NIC } });
        if (existing_borrower) {
            throw new Error('Borrower with this NIC already exist');
        }
        const new_borrower = await Borrower.create(data);
        return new_borrower;
    },
    updateBorrower: async (id, updatedData) => {
        const existing_borrower = await Borrower.findOne({ where: { borrower_id: id } });
        if (!existing_borrower) {
            throw new Error('Borrower not found');
        }
        const [effectedRows] = await Borrower.update(updatedData, { where: { borrower_id: id } });
        if (effectedRows === 0) {
            throw new Error('Failed to update borrower');
        }
        return effectedRows;
    }
};

module.exports = borrowerService;