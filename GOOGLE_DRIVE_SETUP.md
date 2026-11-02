# Google Drive sync setup

PowerLog stores shared readings, tariff periods, and currency in a visible `PowerLog.csv` file in the connected Google Drive account. Each browser keeps a local cache. The CSV is the shared data source.

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
4. Start on the device that currently has the readings you want to keep. If no PowerLog file exists, the app creates it from that browser’s data. On another device, connect the same Google account; the app loads the Drive copy into that browser.

If a Drive file already exists and the browser also has readings, PowerLog asks what to do. **OK** loads the Drive copy and replaces the browser’s readings and tariffs. **Cancel** keeps the browser copy and uploads it over the Drive file. Export a backup first if you need both copies. Local edits are uploaded automatically after a short pause. **Sync now** uploads unsaved local changes, or reloads the Drive copy when there are no unsaved changes. Reconnect after a page reload or when Google’s short-lived access token expires.

The app requests the `drive.file` scope, which lets it work with the PowerLog file it creates rather than requesting access to all Drive files. The OAuth client ID is public configuration and is saved in that browser; enter it on each device. Never add a client secret or service account key to this static app.

The Drive CSV has columns for record type, reading date/time/value/notes, tariff rate and effective dates, and currency. Keep its header and record types intact if editing it manually. PowerLog writes the whole CSV when it syncs, so avoid editing it simultaneously from two devices: the last completed write can replace the other device’s changes. Export a backup regularly. The regular **Export Readings** button remains a separate, readings-only CSV export.
