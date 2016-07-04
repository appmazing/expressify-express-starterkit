import routes from '../routes';

export default (app) => {
    return Promise.resolve(routes(app));
};
