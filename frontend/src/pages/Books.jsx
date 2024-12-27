import { useEffect, useState } from "react";
import BookService from "../services/BookService";
import Table from "../components/Table";
import Loader from "../components/Loader";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        
        const data = await BookService.getBooks();
        setBooks(data);
      } catch (error) {
        console.error(`Error ${error}`);
      }finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { label: "ID", field: "book_id" },
    { label: "Name", field: "book_name" },
    { label: "ISBN", field: "ISBN" },
    { label: "QTY", field: "quantity" },
    { label: "Available QTY", field: "available_qty" },
  ];

  // eslint-disable-next-line no-unused-vars
  const renderActions = (book) => (
    <>
      <button className="text-gray-500 hover:text-gray-900" onClick={() => console.log("Button clicked")}>✏️</button>
      <button className="text-gray-500 hover:text-gray-900">🗑️</button>
      <button className="text-gray-500 hover:text-gray-900">📖</button>
    </>
  );

  // Pagination: Calculate the total pages
  const totalPages = Math.ceil(books.length / itemsPerPage);

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
       {loading && <Loader />}
      <header className="flex justify-between items-center mb-6 mt-11">
        <h1 className="text-3xl font-bold text-orange-700">Book Management</h1>
        <div className="flex items-center">
          <button className="bg-orange-900 shadow-md text-white px-4 py-2 rounded-md mr-4">
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
      
      {/* Pagination Controls */}
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
            className={`px-4 py-2 rounded-md mx-1 ${currentPage === index + 1 ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-700"}`}
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
    </div>
  );
};

export default Books;
