export default (app) => {
    return new Promise((resolve, reject) => {
         app.models.user.findOne({ roles: ['superadmin']}, (err, user) => {
             if (err) {
                 app.log('info', err.toString());

                 /* stop execution anyway */
                 reject(err);
             }

             if(typeof user === 'undefined') {
                 app.models.user
                     .create(app.config.superadmin)
                     .exec((err, user) => {
                         if (err) {
                             app.log('info', err.toString());

                             /* stop execution anyway */
                             reject(err);
                         }
                         else {
                             app.log(
                                 'info',
                                 'Created superadmin account %s',
                                 JSON.stringify(user, null, 4)
                             );

                             resolve();     
                         }
                 });
             } else {
                 app.log(
                     'info',
                     'Existing superadmin account %s',
                     JSON.stringify(user, null, 4)
                 );

                 /**
                  * We are not returning user to keep consistency
                  * with case when we are not running `superadmin` feature
                  **/
                 resolve();
             }
         });
    });
};
