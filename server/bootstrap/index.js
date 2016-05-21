import requireDir from 'require-dir';

export default (app) => {

    const modules = requireDir();
    const config = app.config.get('bootstrap');

    /* get promises for all features which will run during app bootstrap  */
    let promises = config
        .sort((a, b) => a.priority - b.priority)
        .map((module) => {
            app.log(
                'info',
                '[ bootstrap ] { name: %s, priority: %s }',
                module.name, module.priority
            );

            return modules[module.name](app);
        });

    return Promise.all(promises);
};
