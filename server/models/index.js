import requireDir from 'require-dir';
import Waterline from 'waterline';

const models = requireDir();
const waterline = new Waterline();

Object.keys(models).forEach((name) => {
    waterline.loadCollection(models[name].default);
});

export default {
    waterline,
};
