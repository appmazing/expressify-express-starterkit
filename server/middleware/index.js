/* require whole directory except current file */
import requireDir from 'require-dir';

const middleware = requireDir();

export default function (app) {

    let enabled = app.config.get('middleware');

    /* Check if all middleware listed in config are present */
    let missing = enabled.filter((config) => {
        return (typeof middleware[config.name] === 'undefined');
    });

    /* Throw exception if not */
    if(missing.length) {
        let error = ('Missing middleware modules: ' + missing.join(', '));
        throw error;
    }

    /* Sort by priority */
    enabled.sort((a, b) => (a.priority - b.priority));

    /* Iterate through enabled middleware's */
    enabled.forEach((config) => {

            let { name, priority } = config;
            let { callback, path } = middleware[name];

            /* register middleware for given `app` instance */
            callback(app);

            app.log(
                'info',
                '[ load:middleware ] { name: %s, path: %s, priority: %s }',
                name, path, priority
            );
    });
}
