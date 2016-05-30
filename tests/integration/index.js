import Mocha from 'mocha';
import glob from 'glob';

import app from '../../app';

/**
 * Waith for application full bootstrap, then setup tests to avoid unnecessary
 * setup when application leveraging failing.
 */
app.then((instance) => {

    let mocha = new Mocha();
    let { path, ignore } = instance.locals.get('tests.integration');

    /**
     * Read through all files in dir and add them programatically to mocha instance
     */
    glob.sync(path, { ignore }).forEach((file) => {
        mocha.addFile(file);
    });

    /**
     * Hack for sharing instance of Node.js server across tests
     * @type {Object}
     */
    process._server = instance.server;

    mocha.run(function (failures) {
        process.exit(failures);
    });
}).catch((error) => {
    console.log(error, 'error');
});
