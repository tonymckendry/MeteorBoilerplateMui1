import { Meteor } from 'meteor/meteor'

class SubscriptionState {
    handles = {
        users: {}
    }

    trackers = {}
}

const singleton = new SubscriptionState()
export default singleton

if (Meteor.isClient) {
    Meteor.startup(() => {})
}
