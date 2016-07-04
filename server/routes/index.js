/* require whole directory */
import requireDir from 'require-dir';

/* set routes map to use same method for initializing all route namespaces */
const routes = requireDir('.');

export default function (app) {

    /* iterate through all namespaces like `api` (based on directory name) */
    Object.keys(routes).forEach((route) => {

            let { factory } = routes[route];

            if(factory) {
                app.use(factory(app));
                app.log('info', '[ load:route ]: { name: %s }', route);
            }
    });

    return app;
}
