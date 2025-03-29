DELIMITER $$

CREATE EVENT evt_manage_overdue_fines
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    CALL sp_manage_overdue_fines();
END$$

DELIMITER ;

drop event evt_manage_overdue_fines;