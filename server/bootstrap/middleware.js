import middleware from '../middleware';

export default (app) => {
    return new Promise((resolve, reject) => {
       middleware(app);
       resolve(app);
    });
}
