import requireDir from 'require-dir';

const fixtures = requireDir();

export default () => {
    return Object.keys(fixtures).map((name) => {
        return {
            model: name,
            items: fixtures[name],
        };
    });
};
