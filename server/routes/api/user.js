import express from 'express';

export const api = 'v1';

/* optionally handle plurar endings in REST routing */
export const name = '[user|users]+';

const router = express.Router();

export const factory = function(app) {

    const { models } = app;

    router.route('/')

        /**
         * Get all users
         * @param  {Object} req
         * @param  {Object} res
         * @return {Object} err or users list
         */
        .get((req, res) => {
            models.user.find({}, (err, users) => {
                if (err) {
                    return res.json(err);
                }
                res.json(users);
            });
        })

        /**
         * Add a user
         * @param  {Object} req
         * @param  {Object} res
         * @return {Object} err or user
         */
        .post((req, res) => {
            models.user
                .create(req.body)
                .exec((err, user) => {
                    let errors = err.originalError;

                    if (err) {
                        return res
                            .status(422)
                            .json(errors);
                    }
                    res.json(user);
            });
        });

    router.route('/:id')

        /**
         * Get a single user with the id given in param
         * @param  {Object} req
         * @param  {Object} res
         * @return {Object} err or user
         */
        .get((req, res) => {
            models.user.findById(req.params.id, (err, user) => {
                if (err) {
                    return res.json(err)
                }

                res.json(user)
            });
        })

        /**
         * Edit a single user with the id given in param
         * @param  {Object} req
         * @param  {Object} res
         * @return {Object} err or beer
         */
        .put((req, res) => {
            models.user
                .update({id: req.params.id}, req.body)
                .exec((err, user) => {
                    if (err) {
                        return res
                            .status(422)
                            .json(err);
                    }
                    res.json(user[0]);
                })
        })

        /**
         * Delete a single user with the id given in param
         * @param  {Object} req
         * @param  {Object} res
         * @return {Object} err or empty object
         */
        .delete((req, res) => {
            models.user
                .destroy({id: req.params.id})
                .exec(err => {
                    if (err) {
                        return res.json(err);
                    }
                    res.json();
                })
        });

    return router;
}
