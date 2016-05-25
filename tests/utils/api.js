/* eslint generator-star-spacing: 0 */

import supertest from 'supertest';

/**
 * Retrieve shared instance of Express.js application
 * @type {Object}
 */
const server = process._server;

/**
 * Run request with `supertest` & provided headers and params then return promise
 * @param  {Object} config Contains `params`, `headers`, `method` and `path`
 * @return {Promise}        Promise resolved with supertest response
 */
export async function request(config) {

    let { method, path, params = {}, headers = {} } = config;

    return new Promise((resolve, reject) => {

        let test = supertest(server);

        test[method](path)
            .set(headers)
            .send(params)

            .end((error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });

    }).catch(error => console.error(error));
}

/* export interface for async communication with `request` */
const methods = ['get', 'post', 'put', 'delete'];
const api = {};

methods.forEach((method) => {
    api[method] = (config) => {
        config.method = method;

        return request(config);
    };
});

export default api;
