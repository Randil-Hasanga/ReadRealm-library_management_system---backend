import Table from "../components/Table";
import BorrowedBooksService from "../services/BorrowedBooksService";
import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import ReturnConfirmationDialog from "../components/ReturnConfirmationDialog";

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBorrowedBook, setSelectedBorrowedBook] = useState(null);
    const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);

    const fine_error = "Cannot mark book as returned. Outstanding fines must be paid first.";

    // Fetch books from the API on initial load
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await BorrowedBooksService.getBorrowedBooks();
                setBorrowedBooks(data);
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
    }

    const handleReturnConfirmation = async () => {
        if (!selectedBorrowedBook) {
            return;
        }

        try {
            const bb_id = selectedBorrowedBook.BorrowedBookID;
            const response = await BorrowedBooksService.returnBorrowedBook(bb_id);
            console.log("Book Returned:", response);

            if (typeof (response) === 'string') {
                // Display the error message if there are outstanding fines
                alert(response); // Or use a more user-friendly notification (e.g., a modal or toast)
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
        { label: "Borrower", field: "BorrowerFullName" }, // TODO: concat kranna first name and last name
        { label: "Email", field: "email" },
        { label: "Contact No", field: "contact_no" },
        { label: "Borrowed Date", field: "borrowed_date" },
        { label: "Due Date", field: "return_date" }
    ];

    const renderActions = (book) => (
        <>
            <button
                className="text-gray-500 hover:text-gray-900"
                onClick={() => handleReturnBookClick(book)}
            >
                <Icon name="CornerUpLeft" color="green" />
            </button>
        </>
    );

    return (
        <div className="p-8 bg-gray-200 min-h-screen">

            <header className="flex justify-between items-center mb-6 mt-11">
                <h1 className="text-3xl font-bold text-orange-600">Borrowed Books</h1>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search by ID or Type"
                        className="border rounded-md p-2 w-64"
                    />
                </div>
            </header>

            <Table columns={columns} data={borrowedBooks} renderActions={renderActions} />
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