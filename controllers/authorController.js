const authorService = require('../services/authorService');

const authorController = {
    createAuthor: async (req, res) => {
        try {
            const newAuthor = await authorService.createAuthor(req.body);
            res.status(201).json({ message: "Author created successfully", data: newAuthor });
        } catch (error) {
            res.status(501).json({ message: "Error creating author", data: error.message });
        }
    },
    getAuthors: async (req, res) => {
        try {
            const authors = await authorService.getAuthors();
            res.status(201).json({ message: "Authors retrieved successfully", data: authors });
        } catch (error) {
            res.status(501).json({ message: "Error retrieving authors", data: error.message });
        }
    },
    getAuthorById: async(req, res) => {
        const author_id = req.params.id;

        try {
            const author = await authorService.getAuthorById(author_id);
            res.status(201).json({ message: "Author retrieved successfully", data: author });
        } catch (error) {
            res.status(501).json({ message: "Error retrieving author", data: error.message });
        }
    },
    updateAuthor: async(req, res) => {
        const id = req.params.id;

        const {author_name} = req.body;

        try {
            const updatedAuthor = await authorService.updateAuthor(id, {author_name});
            res.status(201).json({ message: "Author updated successfully", data: updatedAuthor });
        } catch (error) {
            res.status(501).json({ message: "Error updating author", data: error.message });
        }
    }
}

module.exports = authorController;