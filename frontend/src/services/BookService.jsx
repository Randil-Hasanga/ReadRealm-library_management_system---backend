import axios from "axios";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/books`;

const BookService = {
  getBooks: async () => {
    try {
      const response = await axios.get(baseUrl);
      console.log(baseUrl);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  addBook: async (bookData) => {
    try {
      const response = await axios.post(baseUrl, bookData);
      console.log("Book added:", response.data.data); // Log the correct data
      return response.data.data; // Return the book data
    } catch (error) {
      console.error("Error adding book:", error);
      throw error;
    }
  },
  
  updateBook: async (bookId, bookData) => {
    try {
      const response = await axios.patch(`${baseUrl}/${bookId}`, bookData);
      console.log("Book updated:", response.data.data);
      return response.data.data; // Return the updated book data
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  },
};

export default BookService;
