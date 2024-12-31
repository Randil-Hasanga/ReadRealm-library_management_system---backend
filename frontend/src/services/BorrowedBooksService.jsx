import axios from "axios";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/borrowed-book`;

const BorrowedBooksService = {
  getBorrowedBooks: async () => {
    try {
      const response = await axios.get(baseUrl);
      console.log(baseUrl);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },
  getBorrowedBookByBookID: async (bookID) => {
    try {
      const response = await axios.get(`${baseUrl}/books/${bookID}`);
      return response.data.data || [];
    } catch (error) {
      console.error(`Error fetching book with ID ${bookID}:`, error);
      throw error;
    }
  }
}

export default BorrowedBooksService;