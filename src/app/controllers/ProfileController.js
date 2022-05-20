const profile = require('../models/User_information')
const user = require('../models/User')
const { mongooseToObject } = require('../../util/mongoose')

class ProfileController {
    info(req, res) {
        user.findOne({ username: req.cookies.username })
            .then(data => {
                if (data) {
                    const user_data = user.findOne({ username: req.cookies.username })
                    const profile_data = profile.findOne({ username: req.params.username })
                    Promise.all([user_data, profile_data])
                        .then(([user, profile]) => {
                            res.render('profile', {
                                user: mongooseToObject(user),
                                profile: mongooseToObject(profile)
                            })
                        })
                } else {
                    res.redirect('/')
                }
            })
    }

    update(req, res) {
        user.findOne({ username: req.cookies.username })
            .then(data => {
                if (data) {
                    profile.updateOne({ username: req.params.username }, req.body).
                        then(() => {
                            const link = '/profile/' + req.params.username
                            res.redirect(link)
                        })
                } else {
                    res.redirect('/')
                }
            })
    }
}

module.exports = new ProfileController