import { FlowRouter } from 'meteor/kadira:flow-router'

import { LoginState } from '../client/directory/singletons'

FlowRouter.wait()
FlowRouter.initialize({ hashbang: true })

FlowRouter.route('/#/reset-password/:token', {
    action: function(params) {
        LoginState.setResetToken(params.token)
    }
})
