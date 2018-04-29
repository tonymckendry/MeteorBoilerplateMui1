import React from 'react'
import { observer } from 'mobx-react'

import { Center, Box } from 'react-layout-components'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import { CircularProgress } from 'material-ui/Progress'

import { LoginState } from '../../directory/singletons'
import { theme } from '../theme/theme'

const ResetPassword = () => {
    if (LoginState.resetPasswordLoading) {
        return (
            <Center style={{ height: 250 }} column justifyContent="space-around">
                <Typography style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>Please wait...</Typography>
                <CircularProgress />
            </Center>
        )
    }
    return (
        <Center column style={{ height: 250 }}>
            <Typography style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>Forgot Username or Password</Typography>
            <p style={{ textAlign: 'center', marginBottom: 10 }}>If your email is found in our system you will be sent a reset password link.</p>
            <TextField
                label="Email"
                style={{ width: '90%' }}
                onChange={e => {
                    LoginState.setResetEmail(e.target.value)
                }}
            />
            <Box style={{ width: '100%', marginTop: 20 }} justifyContent="space-around">
                <Button variant="flat" onClick={LoginState.reset}>
                    Cancel
                </Button>
                <Button variant="flat" onClick={LoginState.handlePasswordReset} style={{ backgroundColor: theme.palette.primary.main }}>
                    Submit
                </Button>
            </Box>
        </Center>
    )
}

export default observer(ResetPassword)
