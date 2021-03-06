import stream from 'stream';

/**
 * Simple writable buffer stream
 * @docs: https://nodejs.org/api/stream.html#stream_writable_streams
 */
class WritableBufferStream extends stream.Writable {
    constructor(options) {
        super(options);
        this._chunks = [];
    }

    _write (chunk, encoding, callback) {
        this._chunks.push(chunk);
        return callback(null);
    }

    _destroy(err, encoding, callback) {
        this._chunks = null;
        return callback(null);
    }

    toBuffer() {
        return Buffer.concat(this._chunks);
    }
}

export default WritableBufferStream;