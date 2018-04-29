import { computed, observable, action, autorun } from 'mobx'
import { Meteor } from 'meteor/meteor'
import _ from 'lodash'

import SubscriptionState from './subscriptions'

class GeneralState {
    //**options**:
    //Store
    //Wish List
    //Profile
    //Clients
    //Admin
    @observable appFunction = 'Profile'
    @observable drawerOpen = false
    @observable drawerOpen = false

    @action
    changeAppFunction = appFunc => {
        this.appFunction = appFunc
        this.drawerOpen = false
    }

    @action
    toggleDrawer = () => {
        this.drawerOpen = !this.drawerOpen
    }

    @action
    clear = () => {
        this.appFunction = 'Profile'
        this.drawerOpen = false
    }
}

const singleton = new GeneralState()
export default singleton
