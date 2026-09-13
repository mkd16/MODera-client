/**
 * Helper for files coming out of an <input type="file">.
 *
 * The problem this exists for:
 *
 * A `File` from an <input> is not the file's data. It is a reference to something on
 * disk, plus a snapshot of its size and last-modified time. The bytes get read later —
 * when we preview or upload — and at that moment Chrome re-checks the snapshot against
 * the file on disk. If anything drifted it refuses to read, and the request dies with
 * ERR_UPLOAD_FILE_CHANGED.
 *
 * On Chrome for Android that refusal is near-guaranteed for anything chosen through the
 * system photo picker. That picker does not hand over a real path — it hands over a
 * content:// URI, so Chrome copies the data into a short-lived cache file and points the
 * File at the copy. The copy's timestamp never matches, and Android may clear it at any
 * moment. Open Chromium bug since March 2020:
 *   https://issues.chromium.org/issues/40123366
 * Firefox for Android is unaffected; tus and Uppy have the same unresolved reports.
 *
 * Which picker opens is decided by the input's `accept` attribute. When every accepted
 * type is an image or video type, Chrome opens the photo picker and we get the broken
 * copy. Listing one non-media type opens the document picker instead, which hands over
 * the real file. Measured on Android 10 / Chrome 137: photo-picker handles were dead
 * within 5 seconds, document-picker handles were still readable after 20.
 *
 * So every file input here lists a non-media type in `accept`, and calls assertReadable
 * on selection so a bad handle is caught immediately instead of mid-upload.
 */

const PROBE_BYTES = 64 * 1024;

/**
 * Throws if the file cannot actually be read.
 *
 * Probes with slice() rather than reading the whole file, for two reasons: it costs one
 * 64 KB read no matter how large the file is, and it tests the exact operation the
 * chunked upload depends on. A whole-file read is not a valid test — on a photo-picker
 * handle it can succeed while slice() still fails.
 *
 * Note it never touches file.size. Reading .size before reading any bytes is itself
 * enough to invalidate the handle, so the probe has to come first. slice() clamps to the
 * end of the file on its own, so the size is not needed here.
 */
export async function assertReadable(file) {
    await file.slice(0, PROBE_BYTES).arrayBuffer();
}
