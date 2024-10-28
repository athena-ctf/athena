CREATE OR REPLACE FUNCTION table_update_notify() RETURNS trigger AS $$
DECLARE
    data json;
    notification json;
BEGIN
    data = row_to_json(NEW);
    PERFORM pg_notify('users_notification_change', data::text);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER users_notification_change ON notification;
CREATE TRIGGER users_notification_change AFTER INSERT ON notifications FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
