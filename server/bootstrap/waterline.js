/**
 * Models are shared with client
 */
import models from '../models';

export default (app) => {
    return new Promise((resolve, reject) => {
        /**
         * Models have to be initialized before routing is invoked
         */
        models.waterline.initialize(app.config.get('waterline'), (error, models) => {

            if(error) {
                reject(error);
            }

            /**
             * Expose Waterline `collections` and `connections` for app object
             */
        	app.models = models.collections;
        	app.connections = models.connections;

            resolve(app);
        });
    });
}
