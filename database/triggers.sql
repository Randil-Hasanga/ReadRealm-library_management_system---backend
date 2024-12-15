DELIMITER $$

CREATE TRIGGER trg_books_to_archive
AFTER DELETE ON books
FOR EACH ROW
BEGIN
    INSERT INTO books_archive (
        book_id, 
        book_name, 
        ISBN, 
        author_id, 
        quantity, 
        available_qty, 
        isActive, 
        createdAt, 
        updatedAt, 
        deletedAt
    )
    VALUES (
        OLD.book_id, 
        OLD.book_name, 
        OLD.ISBN, 
        OLD.author_id, 
        OLD.quantity, 
        OLD.available_qty, 
        OLD.isActive, 
        OLD.createdAt, 
        OLD.updatedAt, 
        NOW()
    );
END$$

DELIMITER ;
