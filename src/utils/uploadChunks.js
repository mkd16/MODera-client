import { uploadChunkToS3 } from "../api/uploadApi"

export const uploadChunksInBatch = async (file, urlBatch, partSize) => {
    const results = []

    // loop over the batch urls and extract the chunk as per the index
    for (const item of urlBatch) {
        const partNumber = item.partNumber - 1
        const chunk = extractChunk(file, partNumber, partSize)

        // then create an http request to put that chunk on the url
        const response = await uploadChunkToS3(item.url, chunk)

        // recieve the response and extract the etag from it
        results.push({
            partNumber: item.partNumber,
            response
        })
    }
    return results
}

const extractChunk = (file, partNumber, partSize) => {
    partSize = partSize * 1024 * 1024
    const start = (partNumber)*partSize
    const end = Math.min(((partNumber)*partSize) + partSize, file.size)
    return file.slice(start, end)
}
