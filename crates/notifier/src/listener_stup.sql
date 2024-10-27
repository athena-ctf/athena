CREATE OR REPLACE FUNCTION table_update_notify() RETURNS trigger AS $$
DECLARE
    data json;
    notification json;
BEGIN
    data = row_to_json(NEW);
    notification = json_build_object('data', data);

    PERFORM pg_notify('users_notification_change',notification::text);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER users_notification_change ON notification;
CREATE TRIGGER users_notification_change AFTER INSERT OR UPDATE ON notifications FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
