# Google Drive sync setup

PowerLog keeps local data in each browser and syncs through Drive. It creates a small `PowerLog-sync-…csv` file for each device and merges the device files when syncing. Keep these files in Drive; do not rename or edit them manually.

The updated app also supports two homes. Each home has separate readings, tariffs, currency, and history.

## Google Cloud setup

1. Create or select a project in the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Drive API** for the project.
3. Configure the OAuth consent screen. While the app is in Testing, add the Google account you will use as a test user.
4. Create an OAuth client ID with application type **Web application**.
5. Add every address where you will run PowerLog under **Authorized JavaScript origins**. Examples:
   - `https://ngangom01.github.io` for GitHub Pages (enter only the origin, without `/New_Powerlog/`).
   - `http://localhost:8000` for local development.
6. Copy the OAuth client ID. Do not create or put a client secret in the app.

## Connect PowerLog

1. Open PowerLog over HTTPS or from a localhost web server. A `file://` address is not supported by Google sign-in.
2. Open **Settings → Google Drive Sync**, paste the OAuth client ID, and select **Connect Google Drive**.
3. Sign in to the Google account that should own the data and approve the Drive access request.
4. Connect the same Google account in PowerLog on each device.

Update PowerLog on every device before syncing so older versions do not mix the two homes’ readings.

When connecting, PowerLog reads existing PowerLog sync files, merges readings by ID and update time, and applies deletion markers. It then creates or updates that browser’s own sync file. Local edits are uploaded automatically after a short pause; **Sync now** downloads and merges the latest available files.

An older `PowerLog.csv` is still read during migration and its data is assigned to **Home 1**. The updated app does not rewrite that legacy file. The new `PowerLog-sync-…csv` files are the ongoing sync files; keep them in Drive.

The app requests the `drive.file` scope, which lets it work with files it creates rather than requesting access to all Drive files. The OAuth client ID is public configuration saved in that browser; enter it on each device. Never add a client secret or service-account key to this static app.

## Full backup and restore

Use **Settings → Data → Full backup** to download a JSON backup containing both homes, readings, tariffs, currencies, home names, and deletion history. Google credentials and appearance preferences are not included.

To restore, choose the backup, review its date and contents, and confirm. Restoring replaces both homes’ local data. If Drive is connected, sync pauses until you choose how to proceed:

- **Use restored backup on Drive** makes the backup the source for both homes. Items missing from the backup are marked deleted across the synced data.
- **Merge existing Drive data** combines the backup with existing Drive data; records missing from the backup may return.
- Leave the choice pending to keep the restored data local and Drive sync paused.

The regular **Export Readings** button remains a separate, readings-only CSV export for the selected home.
