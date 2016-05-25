import routes from '../routes';

export default (app) => {
    return new Promise((resolve, reject) => {
       routes(app);
       resolve(app);
    });
}
