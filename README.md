# PowerLog — Two Home Edition

PowerLog tracks electricity readings for **two homes**. Each home has its own readings, history, statistics, tariffs, and currency. The app runs in a web browser and can be installed as a Progressive Web App (PWA).

## Deploy to GitHub Pages

Upload these items to the repository:

- `index.html`
- `manifest.json`
- `sw.js`
- The `assets` folder, including both background images

Enable GitHub Pages for the repository and open the site over HTTPS. Google sign-in and Drive sync require HTTPS; opening the app directly as a `file://` page is not supported.

## Set up the two homes

Use the **Current home** selector to switch between Home 1 and Home 2. In **Settings → Your two homes**, rename them to match your properties.

Your existing single-home PowerLog data is assigned to **Home 1** when the updated app first loads. **Home 2** starts empty, with a zero-rate tariff. Add Home 2’s actual electricity tariff in Settings before relying on its cost totals.

Keep the app updated on every device before syncing. Older versions may combine readings from both homes.

## Readings, tariffs, and CSV files

Readings and tariffs are kept separate for the selected home. Summary cards, history, charts, and statistics show that home’s data.

- **CSV import** replaces readings for the selected home only.
- **CSV export** exports readings for the selected home only.
- Each home has its own tariff periods and currency.

## Full backup and restore

Use **Settings → Data → Full backup** to download a versioned JSON file containing both homes, readings, tariffs, currencies, home names, and deletion history. The backup does not include Google credentials, Drive connection state, or appearance preferences.

To restore, choose a backup file and review its date and contents before confirming. Restore replaces both homes’ local data.

If Drive sync is connected, it pauses after a restore. Choose one of these options before syncing again:

- **Use restored backup on Drive** makes the backup the source for both homes. Data missing from the backup is marked deleted in Drive.
- **Merge existing Drive data** merges Drive data with the restored backup. Drive-only records may return.
- Leave the choice pending to keep the restored data on this device with Drive sync paused.

## Google Drive sync

To enable sync:

1. In Google Cloud, enable the Google Drive API and create an OAuth client ID for a Web application.
2. Add the site’s HTTPS origin to the OAuth client’s authorized JavaScript origins. Use the origin only, without a page path.
3. In PowerLog, open **Settings → Google Drive Sync**, enter the client ID, and connect the Google account.
4. Connect the same Google account in PowerLog on your other devices.

PowerLog creates a separate `PowerLog-sync-…csv` file for each device and merges those files when devices sync. Keep these files in Drive; do not rename or edit them manually. An older `PowerLog.csv` is read as Home 1 during migration, but the updated app no longer rewrites it.

PowerLog requests the `drive.file` scope. Store only the OAuth client ID in the app; never add a client secret or service-account key.

## Local data and offline use

PowerLog keeps data in the browser’s local storage and caches the app shell for offline use. Local browser data is separate for each browser profile and device. Use the full backup feature when you need a portable copy.
