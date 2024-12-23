DELIMITER $$

CREATE PROCEDURE sp_manage_overdue_fines()
BEGIN
    -- Insert new fines for overdue books not yet in the fines table
    INSERT INTO fines (bb_id, book_id, borrower_id, fine_amount, isPaid)
    SELECT 
        bb.bb_id, 
        bb.book_id, 
        bb.borrower_id, 
        DATEDIFF(CURDATE(), bb.return_date) * 20 AS fine_amount,
        false
    FROM borrowed_books bb
    WHERE 
        bb.return_date < CURDATE()
        AND NOT EXISTS ( -- Check if the fine already exists
            SELECT 1
            FROM fines f
            WHERE f.bb_id = bb.bb_id
        );

    -- Update existing fines if the book remains overdue and the fine is unpaid
    UPDATE fines f
    JOIN borrowed_books bb ON f.bb_id = bb.bb_id
    SET 
        f.fine_amount = DATEDIFF(CURDATE(), bb.return_date) * 20
    WHERE 
        bb.return_date < CURDATE()
        AND f.isPaid = false
        AND EXISTS ( -- Ensure the fine already exists
            SELECT 1
            FROM fines f1
            WHERE f1.bb_id = bb.bb_id
        );

END$$

DELIMITER ;
