import requireDir from 'require-dir';

const bootstrap = (app, modules) => {
    return new Promise((resolve, reject) => {
        if(modules.length)  {
            let moduleDefinition = modules.shift();

            app.log(
                'info',
                '[ bootstrap ] { name: %s, priority: %s }',
                moduleDefinition.name, moduleDefinition.priority
            );

            moduleDefinition.callback(app)
                .then(() => {
                    bootstrap(app, modules);
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            resolve();
        }
    });
}

export default (app) => {

    const modules = requireDir();
    const modulesEnabled = app.config.get('bootstrap');

    /* get promises for all features which will run during app bootstrap  */
    let modulesSorted = modulesEnabled
        .sort((a, b) => a.priority - b.priority)
        .map((moduleDefinition) => {
            moduleDefinition.callback = modules[moduleDefinition.name];
            return moduleDefinition;
        });

    return bootstrap(app, modulesSorted);
};
