import middleware from '../middleware';

export default (app) => {
    return Promise.resolve(middleware(app));
};
