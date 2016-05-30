import requireDir from 'require-dir';

/**
 * Global state of bootstrap to manage simply whole bootstrap process
 */
let state = {};

/**
 * Set global state - expose promise and methods to operate on it.
 */
const init = () => {

    const deferred = new Promise((resolve, reject) => {

        state = {
            resolve,
            reject,
        };
    });

    /* expose promise to attach `then` callback on it */
    state.deferred = deferred;
};

/**
 * This is actual bootstrap method.
 *
 * This works like waterfall - before executing next module,
 * we are waiting for successfull resolution of previous executed module.
 *
 * Thanks to this approach we can manage modules which depends on each other,
 * along with handling asynchronous initialisation of some of them.
 *
 * @param  {Object} app     Express.js function object application instance
 * @param  {Array} modules  Sorted array of modules to be executed
 */
const bootstrap = (app, modules) => {

    /**
     * If there is no modules to run,
     * it means that we went through bootstrap process
     */
    if(!modules.length) {
        state.resolve(app);
    }

    let moduleDefinition = modules.shift();

    app.log(
        'info',
        '[ bootstrap ] { name: %s, priority: %s }',
        moduleDefinition.name, moduleDefinition.priority
    );

    moduleDefinition.callback(app)
        /* bootstrap next module if previous one is finished */
        .then(() => { bootstrap(app, modules); })

        /* stop whole process with `reject` in case of any fail */
        .catch((error) => { state.reject(error); });
};

export default (app) => {

    /* initialise global bootstrap state */
    init();

    /* grab modules available for bootstrap */
    const modules = requireDir();

    /* get modules which should be enabled actually */
    const modulesEnabled = app.locals.get('bootstrap');

    /* get promises for all features which will run during app bootstrap  */
    modulesEnabled
        /* sort them by priority */
        .sort((a, b) => a.priority - b.priority)

        /* attach module as callback to module definition (name, priority) */
        .forEach((moduleDefinition) => {
            moduleDefinition.callback = modules[moduleDefinition.name].default;
        });

    state.deferred.then(() => {
        app.log('info', '[ message ] Bootstrap completed');
    });

    /* run actual bootstrap of application modules */
    bootstrap(app, modulesEnabled);

    return state.deferred;
};
