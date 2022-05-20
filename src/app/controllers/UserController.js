const user = require('../models/User')
const user_information = require('../models/User_information')

class UserController {
    signup(req, res) {
        user.findOne({username: req.body.username})
        .then(data => {
            if (data) {
                res.redirect('/')
            } else {
                const newuser = user(req.body)
                const newuser_information = user_information({username: req.body.username})
                Promise.all([newuser.save(), newuser_information.save()])
                .then(() => res.redirect('/'))
            }
        })
    }

    login(req, res) {
        user.findOne(req.body)
        .then(user => {
            if(user) { 
                res.cookie('username', user.username);
                res.cookie('is_admin', user.is_admin)
                res.redirect('/')
        }
            else res.json('dang nhap that bai');
        })
    }

    logout(req, res) {
        res.clearCookie('username')
        res.clearCookie('is_admin')
        res.redirect('/')
    }
}

module.exports = new UserController