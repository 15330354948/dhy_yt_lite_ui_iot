define([
        './Check',
        './defined',
        './deprecationWarning',
        './Resource'
    ], function(
        Check,
        defined,
        deprecationWarning,
        Resource) {
    'use strict';

    /**
     * Asynchronously loads the given URL as raw binary data.  Returns a promise that will resolve to
     * an ArrayBuffer once loaded, or reject if the URL failed to load.  The data is loaded
     * using XMLHttpRequest, which means that in order to make requests to another origin,
     * the server must have Cross-Origin Resource Sharing (CORS) headers enabled.
     *
     * @exports loadArrayBuffer
     *
     * @param {Resource|String} urlOrResource The URL of the binary data.
     * @param {Object} [headers] HTTP headers to send with the requests.
     * @param {Request} [request] The request object. Intended for internal use only.
     * @returns {Promise.<ArrayBuffer>|undefined} a promise that will resolve to the requested data when loaded. Returns undefined if <code>request.throttle</code> is true and the request does not have high enough priority.
     *
     * @example
     * // load a single URL asynchronously
     * Libras.loadArrayBuffer('some/url').then(function(arrayBuffer) {
     *     // use the data
     * }).otherwise(function(error) {
     *     // an error occurred
     * });
     *
     * @see {@link http://www.w3.org/TR/cors/|Cross-Origin Resource Sharing}
     * @see {@link http://wiki.commonjs.org/wiki/Promises/A|CommonJS Promises/A}
     *
     * @deprecated
     */
    function loadArrayBuffer(urlOrResource, headers, request) {
        //>>includeStart('debug', pragmas.debug);
        Check.defined('urlOrResource', urlOrResource);
        //>>includeEnd('debug');

        deprecationWarning('loadArrayBuffer', 'loadArrayBuffer is deprecated and will be removed in Libras 1.44. Please use Resource.fetchArrayBuffer instead.');

        var resource = Resource.createIfNeeded(urlOrResource, {
            headers: headers,
            request: request
        });

        return resource.fetchArrayBuffer();
    }

    return loadArrayBuffer;
});
