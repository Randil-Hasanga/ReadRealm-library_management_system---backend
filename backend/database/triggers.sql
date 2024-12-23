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


DELIMITER $$

CREATE TRIGGER trg_check_fines_before_return
BEFORE UPDATE ON borrowed_books
FOR EACH ROW
BEGIN
    DECLARE fine_unpaid_count INT;

    -- Check if there are unpaid fines for the borrowed book
    SELECT COUNT(*)
    INTO fine_unpaid_count
    FROM fines
    WHERE bb_id = NEW.bb_id AND isPaid = false;

    -- Prevent returning the book if there are unpaid fines
    IF fine_unpaid_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot mark book as returned. Outstanding fines must be paid first.';
    END IF;
END$$

DELIMITER ;


