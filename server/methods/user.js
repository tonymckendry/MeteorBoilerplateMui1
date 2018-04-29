import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
    handleResetPassword: function(email) {
        check(email, String)
        let user = Meteor.users.findOne({ 'emails.address': { $regex: new RegExp('^' + email, 'i') } })
        if (!_.isUndefined(user)) {
            console.log('user found')
            Accounts.sendResetPasswordEmail(user._id)
        }
    }
})
