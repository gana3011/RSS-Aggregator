Skipping Insert (DO NOTHING):

INSERT INTO videos (video_id, title, link)
VALUES ('123', 'Sample Title', 'http://example.com')
ON CONFLICT (video_id) DO NOTHING;

    If video_id '123' already exists, the row is skipped, and the operation continues without error.

Updating Existing Row (DO UPDATE):

    INSERT INTO videos (video_id, title, link)
    VALUES ('123', 'New Title', 'http://example.com')
    ON CONFLICT (video_id) DO UPDATE SET title = EXCLUDED.title, link = EXCLUDED.link;

        If video_id '123' already exists, the title and link are updated with the new values.

Implications:

    DO NOTHING: Ensures no duplicates but doesn't update any existing data. It's useful when you want to ensure uniqueness without modifying existing entries.
    DO UPDATE: Allows for updating existing records when a conflict arises, enabling you to keep data fresh or corrected without manual intervention.

Choosing the Right Strategy:

    Avoiding Duplicates: Use DO NOTHING if you only want to insert new rows and skip duplicates.
    Keeping Data Up-to-date: Use DO UPDATE if you want to update existing records with new information when a conflict is detected.

For your application:

    If you want to ensure that only unique videos are stored and don't need to update existing records, DO NOTHING is appropriate.
    If you want to update the information for existing videos (e.g., updating the title or view count), DO UPDATE is more suitable.

Additional Example with DO UPDATE:

INSERT INTO videos (video_id, title, link, views)
VALUES ('123', 'New Video Title', 'http://example.com', 1000)
ON CONFLICT (video_id) DO UPDATE
SET title = EXCLUDED.title, views = EXCLUDED.views;