import { computed, observable, action, autorun } from 'mobx'
import { Meteor } from 'meteor/meteor'
import _ from 'lodash'

import GeneralState from './general'

class UserState {
    @observable allUsers = []
    @observable loginError = false
    @observable loading = true
    @observable authenticated = false
    @observable currentUser = {}

    @observable email = ''
    @observable password = ''

    @computed
    get currentUserPrototype() {
        return this.allUsers.filter(user => {
            return user._user._id === this.currentUser._id
        })[0]
    }

    @computed
    get stylists() {
        return this.allUsers.filter(user => {
            return user.takingClients
        })
    }

    @action
    setEmail = email => {
        this.email = email
    }
    @action
    setPassword = password => {
        this.password = password
    }

    @action
    setUser = user => {
        this.currentUser = user
    }

    @action
    auth() {
        this.loading = true
        Meteor.loginWithPassword(this.email, this.password, error => {
            if (error) {
                console.log(error)
                this.loginError(true)
                this.loading = false
            } else {
                this.allGood()
            }
        })
    }

    @action
    allGood() {
        this.authenticated = true
        this.loading = false
        this.error = false
        this.clear()
    }

    @action
    isAuthenticated(bool) {
        if (bool) {
            this.setUser(Meteor.user())
        } else {
            this.loading = false
        }
        this.authenticated = bool
    }

    @action
    clear() {
        this.loading = false
        this.email = ''
        this.password = ''
    }

    @action
    logout = () => {
        Meteor.logout()
        this.clear()
        GeneralState.clear()
    }
}

const singleton = new UserState()
export default singleton
