import { observable, computed, action } from 'mobx'
import isUndefined from 'lodash.isundefined'

import UserState from '../singletons/users'

class User {
    constructor(id, user) {
        this._user = user
    }

    @observable _user

    @action
    updateState = user => {
        this._user = user
    }

    @computed
    get fullName() {
        return this._user.profile.firstName + ' ' + this._user.profile.lastName
    }
}

export default User
