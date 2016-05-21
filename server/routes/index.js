/* require whole directory */
import requireDir from 'require-dir';

/* set routes map to use same method for initializing all route namespaces */
const routes = requireDir('.', { recurse: true });

export default function (app) {

    /* iterate through all namespaces like `api` (based on directory name) */
    Object.keys(routes).forEach((route) => {

        /* iterate through all endpoints for given namespaces like `users` */
        Object.keys(routes[route]).forEach((endpoint) => {

            let { factory, api, name } = routes[route][endpoint];

            /* create `path` for route registration, like `/api/users` */
            let path = ['', route, api, name]
                .filter(val => (typeof val !== 'undefined'))
                .join('/');

            /**
             * initialize route with path and handler returned from factory
             * for given app instance
             **/
            app.use(path, factory(app));

            app.log('info', 'Registred [ route ]: { path: %s }', path);
        });
    });
}
