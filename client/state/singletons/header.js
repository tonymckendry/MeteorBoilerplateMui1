import { observable, computed, action } from 'mobx'
import isUndefined from 'lodash.isundefined'

import GeneralState from './general'
import SubscriptionState from './subscriptions'

class HeaderState {
    @observable filterOpen = false
    @observable filterListType
    @observable
    filter = {
        class: []
    }

    @action
    toggleFilter = () => {
        if (this.filterOpen) {
            //the filter is open and we need to be sure to reset the filter list type
            this.filterListType = undefined
        }
        this.filterOpen = !this.filterOpen
    }

    @action
    openFilterList = type => {
        this.filterListType = type
    }

    @action
    closeFilterList = () => {
        this.filterListType = undefined
    }

    @computed
    get showFilterButton() {
        if (GeneralState.appFunction === 'Store') {
            return true
        }
        return false
    }

    @computed
    get showBack() {
        return false
    }

    @action goBack = () => {}
}

const singleton = new HeaderState()

export default singleton
