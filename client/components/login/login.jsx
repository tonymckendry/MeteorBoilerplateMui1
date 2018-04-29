import React from 'react'
import { Page, Center, VBox } from 'react-layout-components'
import { observer } from 'mobx-react'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Collapse from 'material-ui/transitions/Collapse'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import PasswordField from 'material-ui-password-field'

import SignUp from '../signUp/signUp'
import ResetPassword from './resetPassword'
import { theme } from '../theme/theme'
import UserState from '../../state/singletons/users'
import LoginState from '../../state/singletons/login'

const Login = () => {
    if (LoginState.showPasswordResetOnly) {
        let content = (
            <Paper style={{ width: 300, paddingTop: 10, paddingBottom: 10 }}>
                <Typography style={{ marginLeft: '5%' }}>Enter a new password</Typography>
                <Center column>
                    <PasswordField
                        style={{ width: '90%' }}
                        label="New Password"
                        onChange={e => {
                            LoginState.setNewPassword(e.target.value)
                        }}
                    />
                    <Button style={{ backgroundColor: theme.palette.primary.main, marginTop: 20 }} onClick={LoginState.handleSetNewPassword}>
                        Submit
                    </Button>
                </Center>
            </Paper>
        )
        if (LoginState.resetPasswordLoading) {
            content = (
                <Paper style={{ width: 300, paddingTop: 10, paddingBottom: 10 }}>
                    <Center column>
                        <Typography style={{ marginLeft: '5%' }}>Submitting new password...</Typography>
                        <CircularProgress />
                    </Center>
                </Paper>
            )
        }
        //Not sure if we are going to need this as the app automatically log us in when we reset the password
        //Later on, no one should be able to access the app via a browser
        //I'm going to deal with this once we actually have the app deployed later on
        // if (LoginState.success) {
        //     content = (
        //         <Paper style={{ width: 300, paddingTop: 10, paddingBottom: 10 }}>
        //             <Center column>
        //                 <Typography style={{ marginLeft: '5%' }}>Password successfully reset.</Typography>
        //             </Center>
        //         </Paper>
        //     )
        // }
        return (
            <Page>
                <Center style={{ height: '100%' }}>{content}</Center>
            </Page>
        )
    }
    if (UserState.loading) {
        return (
            <Page>
                <Center column height="100%">
                    <h3
                        style={{
                            textAlign: 'center',
                            fontSize: '1.5em',
                            fontWeight: 'bold'
                        }}>
                        Loading User Profile
                    </h3>
                    <CircularProgress mode="indeterminate" />
                </Center>
            </Page>
        )
    }
    let paperContent = (
        <form onSubmit={handleLogin}>
            <Center column style={{ height: 250 }} justifyContent="space-around">
                <TextField onChange={handleEmailChange} label="EMAIL" style={{ width: '90%' }} />
                <TextField onChange={handlePasswordChange} label="PASSWORD" type="password" style={{ width: '90%' }} />
                <Button variant="flat" type="submit" style={{ width: '90%', marginTop: 20 }} color="primary">
                    Sign in
                </Button>
                <Button variant="flat" color="secondary" onClick={LoginState.signUp} style={{ width: '90%', marginTop: 10 }}>
                    Sign up
                </Button>
                <Button variant="flat" onClick={LoginState.forgotPassword} style={{ fontSize: 12, width: '90%', marginTop: 10 }}>
                    Forgot Password
                </Button>
            </Center>
        </form>
    )
    if (LoginState.showSignUp) {
        paperContent = <SignUp />
    }
    if (LoginState.showResetPassword) {
        paperContent = <ResetPassword />
    }
    return (
        <Page>
            <Center column height="100%">
                <div style={{ padding: 10, width: 300 }}>
                    <Collapse collapsedHeight="250" in={LoginState.showSignUp || LoginState.showResetPassword}>
                        {paperContent}
                    </Collapse>
                </div>
            </Center>
        </Page>
    )
}

export default observer(Login)

const handleEmailChange = e => {
    UserState.setEmail(e.target.value.trim())
}

const handlePasswordChange = e => {
    UserState.setPassword(e.target.value)
}

const handleLogin = e => {
    e.preventDefault()
    if (!UserState.email.length || !UserState.password.length) {
        return
    }
    UserState.auth()
}
