import getFixtures from '../fixtures';
import waterlineFixtures from 'waterline-fixtures';

export default (app) => {
    let config = app.config.get('fixtures');
    let fixtures = getFixtures();

    let deferred;

    return new Promise((resolve, reject) => {

        /* internal promise to handle internal async operations */
        deferred = new Promise((resolveInternal, rejectInternal) => {

            /* if true, drop all collections listed in fixtures */
            if(config.reset) {
                fixtures.forEach((fixture) => {
                    app.models[fixture.model].drop((err) => {
                        if(err) {
                            /* this will be propagated to main promise anyway */
                            rejectInternal(err);
                        } else {
                            resolveInternal();
                        }
                    });
                });
            } else {
                /* resolve immediately if not resetting collections */
                resolveInternal();
            }
        });

        deferred
            .then(() => {
                waterlineFixtures.init({
                      collections: app.models,
                      fixtures: fixtures,
                  }, (error) => {
                      if(error) {
                          reject(error);
                      } else {
                          resolve(app);
                      }
                  });
            })
            .catch((err) => {
                reject(err);
            });
    });
};
