import { observable, action, computed } from 'mobx'

import UserState from './users'
import resetPassword from '../../components/login/resetPassword'

class LoginState {
    @observable showSignUp = false
    @observable showResetPassword = false
    @observable resetPasswordLoading = false

    @observable resetEmail = ''
    @observable resetToken
    @observable showPasswordResetOnly = false
    @observable newPassword = ''

    @observable
    signUpForm = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirm: ''
    }

    @observable
    formErrors = {
        firstNameBlank: false,
        lastNameBlank: false,
        emailBlank: false,
        emailInvalid: false,
        phoneBlank: false,
        passwordBlank: false,
        confirmBlank: false,
        passwordMismatch: false
    }

    @computed
    get emailError() {
        if (this.formErrors.emailBlank) {
            return 'Email is required'
        }
        if (this.formErrors.emailInvalid) {
            return 'Email is invalid'
        }
    }

    @computed
    get passwordError() {
        if (this.formErrors.passwordBlank) {
            return 'Password is required'
        }
        if (this.formErrors.passwordMismatch) {
            return 'Passwords must match'
        }
    }

    @computed
    get confirmError() {
        if (this.formErrors.confirmBlank) {
            return 'Password is required'
        }
        if (this.formErrors.passwordMismatch) {
            return 'Passwords must match'
        }
    }

    @action
    setResetEmail = email => {
        this.resetEmail = email
    }

    @action
    forgotPassword = () => {
        this.showResetPassword = true
    }

    @action
    handlePasswordReset = () => {
        this.resetPasswordLoading = true
        Meteor.call('handleResetPassword', this.resetEmail, err => {
            if (err) {
                console.log(err)
            }
            this.resetPasswordLoading = false
        })
    }

    @action
    handleSetNewPassword = () => {
        this.resetPasswordLoading = true
        Accounts.resetPassword(this.resetToken, this.newPassword, err => {
            if (err) {
                console.log(err)
            }
            this.resetPasswordLoading = false
        })
    }

    @action
    setResetToken = token => {
        this.resetToken = token
        this.showPasswordResetOnly = true
    }

    @action
    setNewPassword = password => {
        this.newPassword = password
    }

    @action
    signUp = () => {
        this.showSignUp = true
    }

    @action
    reset = () => {
        this.showSignUp = false
        this.showResetPassword = false
        UserState.setEmail('')
        UserState.setPassword('')
    }

    @action
    updateFormField = (field, val) => {
        this.signUpForm[field] = val
    }

    @action
    handleSignUp = e => {
        e.preventDefault()
        this.formErrors = {
            firstNameBlank: false,
            lastNameBlank: false,
            emailBlank: false,
            emailInvalid: false,
            phoneBlank: false,
            passwordBlank: false,
            confirmBlank: false,
            passwordMismatch: false
        }
        let error = false
        if (!this.signUpForm.firstName.length) {
            this.formErrors.firstNameBlank = true
            error = true
        }
        if (!this.signUpForm.lastName.length) {
            this.formErrors.lastNameBlank = true
            error = true
        }
        if (!this.signUpForm.email.length) {
            this.formErrors.emailBlank = true
            error = true
        }
        if (this.signUpForm.email.indexOf('@') == -1 || this.signUpForm.email.indexOf('.') == -1) {
            this.formErrors.emailInvalid = true
            error = true
        }
        if (!this.signUpForm.phone.length) {
            this.formErrors.phoneBlank = true
            error = true
        }
        if (!this.signUpForm.password.length) {
            this.formErrors.passwordBlank = true
            error = true
        }
        if (!this.signUpForm.confirm.length) {
            this.formErrors.confirmBlank = true
            error = true
        }
        if (this.signUpForm.password !== this.signUpForm.confirm) {
            this.formErrors.passwordMismatch = true
            error = true
        }
        if (error) {
            return
        }
        UserState.loading = true
        let profile = {}
        profile.firstName = this.signUpForm.firstName
        profile.lastName = this.signUpForm.lastName
        let options = {
            email: this.signUpForm.email,
            password: this.signUpForm.password,
            profile: profile
        }

        Accounts.createUser(options, function(err) {
            console.log('CREATING USER')
            if (err) {
                throw new Meteor.Error('User creation failed')
                console.log(err)
            } else {
                Meteor.loginWithPassword(options.email, options.password, function(error) {
                    if (error) {
                        console.log(error)
                    }
                    this.showSignUp = false
                    UserState.loading = false
                })
            }
        })
    }
}

const singleton = new LoginState()

export default singleton
