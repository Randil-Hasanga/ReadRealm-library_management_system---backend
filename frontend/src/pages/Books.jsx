import { useEffect, useState } from "react";
import BookService from "../services/BookService";
import Table from "../components/Table";
import Loader from "../components/Loader";
import Icon from "../components/Icon";
import AddBookModal from "../models/books/AddBookModal";
import UpdateBookModal from "../models/books/UpdateBookModal";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch books from the API on initial load
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await BookService.getBooks();
        setBooks(data);
      } catch (error) {
        console.error(`Error fetching books: ${error}`);
        setErrorMessage('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Handle opening the modal for adding a new book
  const handleAddBookClick = () => {
    setIsAddBookModalOpen(true);
  };

  // Handle closing the Add Book Modal
  const handleCloseAddBookModal = () => {
    setIsAddBookModalOpen(false);
  };

  // Handle opening the Update Book Modal
  const handleUpdateBookClick = (book) => {
    setSelectedBook(book);
    setIsUpdateBookModalOpen(true);
  };

  // Handle closing the Update Book Modal
  const handleCloseUpdateBookModal = () => {
    setIsUpdateBookModalOpen(false);
    setSelectedBook(null);
  };

  const handleDeleteBookClick = (book) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  }

  const handleCloseDeleteConfirmation = () => {
    setIsDeleteDialogOpen(false);
  }

  const handleAddBookSubmit = async (newBook) => {
    try {
      const addedBook = await BookService.addBook(newBook);
      console.log("Added Book:", addedBook);
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      setIsAddBookModalOpen(false);
    } catch (error) {
      console.error("Error adding book:", error);
      setErrorMessage('Failed to add book.');
    }
  };

  const handleUpdateBookSubmit = async (updatedBook) => {
    try {
      const bookId = selectedBook.book_id;
      const result = await BookService.updateBook(bookId, updatedBook);
      console.log("Updated Book:", result);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.book_id === bookId ? { ...book, ...updatedBook } : book
        )
      );
      setIsUpdateBookModalOpen(false);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
      setErrorMessage('Failed to update book.');
    }
  };

  const handleDeleteBookSubmit = async () => {
    if (!selectedBook) return;
  
    setIsDeleting(true);
    setErrorMessage('');
    try {
      const bookId = selectedBook.book_id;
      const response = await BookService.deleteBook(bookId);
      
      console.log("Book Deleted:", response);

      setBooks((prevBooks) => prevBooks.filter((book) => book.book_id !== bookId));
      
      setIsDeleteDialogOpen(false);
      setSelectedBook(null);
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Table columns for books
  const columns = [
    { label: "ID", field: "book_id" },
    { label: "Name", field: "book_name" },
    { label: "ISBN", field: "ISBN" },
    { label: "QTY", field: "quantity" },
    { label: "Available QTY", field: "available_qty" },
  ];

  const renderActions = (book) => (
    <>
      <button
        className="text-gray-500 hover:text-gray-900"
        onClick={() => handleUpdateBookClick(book)}
      >
        <Icon name="RefreshCw" />
      </button>
      <button
        className="text-gray-500 hover:text-gray-900"
        onClick={() => handleDeleteBookClick(book)}
      >
        <Icon name="Trash2" />
      </button>
      <button
        className="text-gray-500 hover:text-gray-900"
        onClick={() => console.log("View clicked")}
      >
        <Icon name="BookOpen" />
      </button>
    </>
  );

  const totalPages = Math.ceil(books.length / itemsPerPage);

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      {loading && <Loader />}

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <header className="flex justify-between items-center mb-6 mt-11">
        <h1 className="text-3xl font-bold text-orange-600">Book Management</h1>
        <div className="flex items-center">
          <button
            className="bg-orange-500 shadow-md text-white px-4 py-2 rounded-md mr-4 font-semibold"
            onClick={handleAddBookClick}
          >
            Add Book
          </button>
          <input
            type="text"
            placeholder="Search by ID or Type"
            className="border rounded-md p-2 w-64"
          />
        </div>
      </header>

      <Table columns={columns} data={currentBooks} renderActions={renderActions} />

      <div className="flex justify-end mt-6">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md mx-1 ${currentPage === index + 1
              ? "bg-orange-500 text-white"
              : "bg-gray-300 text-gray-700"
              }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <AddBookModal
        isOpen={isAddBookModalOpen}
        onClose={handleCloseAddBookModal}
        onSubmit={handleAddBookSubmit}
      />
      <UpdateBookModal
        isOpen={isUpdateBookModalOpen}
        onClose={handleCloseUpdateBookModal}
        onSubmit={handleUpdateBookSubmit}
        book={selectedBook}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteConfirmation}
        onConfirm={handleDeleteBookSubmit}
        type="book"
        name={selectedBook ? selectedBook.book_name : ''}
      />
    </div>
  );
};

export default Books;