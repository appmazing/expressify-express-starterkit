import config from 'config';

export default () => {

    let { get } = config;

    config.get = function () {
        /**
         * Babel6 is changing way imports works to meet ES2015 specification.
         *
         * `node-config` is handling `export default {}` is retrieving whole
         * object, handling `default` as config property, this is temporary,
         * dirty fix to always set given properties as `default` object properties.
         */
        arguments[0] = 'default.' + arguments[0];
        return get.apply(config, arguments);
    };

    return config;
};
