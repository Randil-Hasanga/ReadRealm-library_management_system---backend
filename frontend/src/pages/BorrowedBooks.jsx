// import Table from "../components/Table";
// import BorrowedBooksService from "../services/BorrowedBooksService";
// import { useState, useEffect } from "react";
// import Icon from "../components/Icon";
// import ReturnConfirmationDialog from "../components/ReturnConfirmationDialog";
// import Pagination from "../components/Pagination";

// const BorrowedBooks = () => {
//     const [borrowedBooks, setBorrowedBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [selectedBorrowedBook, setSelectedBorrowedBook] = useState(null);
//     const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [booksPerPage] = useState(10);

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const data = await BorrowedBooksService.getBorrowedBooks();
//                 setBorrowedBooks(data);
//             } catch (error) {
//                 console.error(`Error fetching books: ${error}`);
//                 setErrorMessage('Failed to fetch books.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchBooks();
//     }, []);

//     const handleReturnBookClick = (book) => {
//         setSelectedBorrowedBook(book);
//         setIsReturnDialogOpen(true);
//     };

//     const handleCloseReturnDialog = () => {
//         setIsReturnDialogOpen(false);
//         setSelectedBorrowedBook(null);
//     };

//     const handleReturnConfirmation = async () => {
//         if (!selectedBorrowedBook) {
//             return;
//         }

//         try {
//             const bb_id = selectedBorrowedBook.BorrowedBookID;
//             const response = await BorrowedBooksService.returnBorrowedBook(bb_id);
//             console.log("Book Returned:", response);

//             if (typeof response === 'string') {
//                 alert(response);
//                 return;
//             }

//             setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book.BorrowedBookID !== bb_id));
//             setIsReturnDialogOpen(false);
//             setSelectedBorrowedBook(null);
//         } catch (error) {
//             console.error("Error returning book:", error);
//             alert('Cannot mark book as returned. Outstanding fines must be paid first.');
//         }
//     };

//     const columns = [
//         { label: "ID", field: "BorrowedBookID" },
//         { label: "Book Name", field: "BookName" },
//         { label: "Borrower", field: "BorrowerFullName" },
//         { label: "Email", field: "email" },
//         { label: "Contact No", field: "contact_no" },
//         { label: "Borrowed Date", field: "borrowed_date" },
//         { label: "Due Date", field: "return_date" }
//     ];

//     const renderActions = (book) => (
//         <button
//             className="text-gray-500 hover:text-gray-900"
//             onClick={() => handleReturnBookClick(book)}
//         >
//             <Icon name="CornerUpLeft" color="green" />
//         </button>
//     );

//     const indexOfLastBook = currentPage * booksPerPage;
//     const indexOfFirstBook = indexOfLastBook - booksPerPage;
//     const currentBooks = borrowedBooks.slice(indexOfFirstBook, indexOfLastBook);
//     const totalPages = Math.ceil(borrowedBooks.length / booksPerPage);

//     return (
//         <div className="p-8 bg-gray-200 min-h-screen">
//             <header className="flex justify-between items-center mb-6 mt-11">
//                 <div className="flex space-x-4">
//                     <button onClick={() => console.log("Show borrowed books")}>
//                         <h1 className="text-3xl font-bold text-orange-600">Borrowed Books</h1>
//                     </button>
//                     <button onClick={() => console.log("Show overdue books")}>
//                         <h1 className="text-3xl font-bold text-orange-600">Overdue Books</h1>
//                     </button>
//                 </div>
//                 <div className="flex items-center">
//                     <input
//                         type="text"
//                         placeholder="Search by ID or Type"
//                         className="border rounded-md p-2 w-64"
//                     />
//                 </div>
//             </header>

//             <Table columns={columns} data={currentBooks} renderActions={renderActions} />
//             <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={setCurrentPage}
//             />
//             <ReturnConfirmationDialog
//                 isOpen={isReturnDialogOpen}
//                 onClose={handleCloseReturnDialog}
//                 onConfirm={handleReturnConfirmation}
//                 type="book"
//                 bookName={selectedBorrowedBook ? selectedBorrowedBook.BookName : ''}
//                 borrowerName={selectedBorrowedBook ? selectedBorrowedBook.BorrowerFullName : ''}
//             />
//         </div>
//     );
// };

// export default BorrowedBooks;


import Table from "../components/Table";
import BorrowedBooksService from "../services/BorrowedBooksService";
import { useState, useEffect, useReducer } from "react";
import Icon from "../components/Icon";
import ReturnConfirmationDialog from "../components/ReturnConfirmationDialog";
import Pagination from "../components/Pagination";

// Reducer for switching between borrowed books and overdue books
const switchReducer = (state, action) => {
    switch (action.type) {
        case "SET_BORROWED_BOOKS":
            return { ...state, activeSection: "borrowed" };
        case "SET_OVERDUE_BOOKS":
            return { ...state, activeSection: "overdue" };
        default:
            return state;
    }
};

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [overdueBooks, setOverdueBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBorrowedBook, setSelectedBorrowedBook] = useState(null);
    const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);

    // UseReducer hook for managing the switch between borrowed and overdue
    const [state, dispatch] = useReducer(switchReducer, {
        activeSection: "borrowed", // default section is borrowed
    });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const borrowed = await BorrowedBooksService.getBorrowedBooks();
                const overDue = await BorrowedBooksService.getOverdueBooks();
                setBorrowedBooks(borrowed);
                setOverdueBooks(overDue);
            } catch (error) {
                console.error(`Error fetching books: ${error}`);
                setErrorMessage('Failed to fetch books.');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleReturnBookClick = (book) => {
        setSelectedBorrowedBook(book);
        setIsReturnDialogOpen(true);
    };

    const handleCloseReturnDialog = () => {
        setIsReturnDialogOpen(false);
        setSelectedBorrowedBook(null);
    };

    const handleReturnConfirmation = async () => {
        if (!selectedBorrowedBook) {
            return;
        }

        try {
            const bb_id = selectedBorrowedBook.BorrowedBookID;
            const response = await BorrowedBooksService.returnBorrowedBook(bb_id);
            console.log("Book Returned:", response);

            if (typeof response === 'string') {
                alert(response);
                return;
            }

            setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book.BorrowedBookID !== bb_id));
            setIsReturnDialogOpen(false);
            setSelectedBorrowedBook(null);
        } catch (error) {
            console.error("Error returning book:", error);
            alert('Cannot mark book as returned. Outstanding fines must be paid first.');
        }
    };

    const columns = [
        { label: "ID", field: "BorrowedBookID" },
        { label: "Book Name", field: "BookName" },
        { label: "Borrower", field: "BorrowerFullName" },
        { label: "Email", field: "email" },
        { label: "Contact No", field: "contact_no" },
        { label: "Borrowed Date", field: "borrowed_date" },
        { label: "Due Date", field: "return_date" }
    ];

    const renderActions = (book) => (
        <button
            className="text-gray-500 hover:text-gray-900"
            onClick={() => handleReturnBookClick(book)}
        >
            <Icon name="CornerUpLeft" color="green" />
        </button>
    );

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = borrowedBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(borrowedBooks.length / booksPerPage);

    return (
        <div className="p-8 bg-gray-200 min-h-screen">
            <header className="flex justify-between items-center mb-6 mt-11">
                <div className="flex space-x-4">
                    <button
                        className={`text-3xl font-bold ${state.activeSection === "borrowed" ? "text-orange-600" : "text-gray-600"}`}
                        onClick={() => dispatch({ type: "SET_BORROWED_BOOKS" })}
                    >
                        Borrowed Books
                    </button>
                    <button
                        className={`text-3xl font-bold ${state.activeSection === "overdue" ? "text-orange-600" : "text-gray-600"}`}
                        onClick={() => dispatch({ type: "SET_OVERDUE_BOOKS" })}
                    >
                        Overdue Books
                    </button>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search by ID or Type"
                        className="border rounded-md p-2 w-64"
                    />
                </div>
            </header>

            {/* Display content based on the active section */}
            {state.activeSection === "borrowed" ? (
                <>
                    <Table columns={columns} data={currentBooks} renderActions={renderActions} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="text-center text-xl">No overdue books available.</div> // Placeholder for overdue books content
            )}

            <ReturnConfirmationDialog
                isOpen={isReturnDialogOpen}
                onClose={handleCloseReturnDialog}
                onConfirm={handleReturnConfirmation}
                type="book"
                bookName={selectedBorrowedBook ? selectedBorrowedBook.BookName : ''}
                borrowerName={selectedBorrowedBook ? selectedBorrowedBook.BorrowerFullName : ''}
            />
        </div>
    );
};

export default BorrowedBooks;
