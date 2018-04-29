import React from 'react'
import { observer } from 'mobx-react'

import { Center, Box } from 'react-layout-components'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import LoginState from '../../state/singletons/login'
import { theme } from '../theme/theme'

const textStyle = {
    width: '90%',
    marginTop: 7
}

const SignUp = () => {
    return (
        <Center column>
            <TextField
                style={textStyle}
                label="First Name"
                onChange={e => {
                    handleFormChange('firstName', e.target.value)
                }}
                error={LoginState.formErrors.firstNameBlank}
                helperText={LoginState.formErrors.firstNameBlank ? 'First name is required' : null}
            />
            <TextField
                style={textStyle}
                label="Last Name"
                onChange={e => {
                    handleFormChange('lastName', e.target.value)
                }}
                error={LoginState.formErrors.lastNameBlank}
                helperText={LoginState.formErrors.lastNameBlank ? 'Last name is required' : null}
            />
            <TextField
                style={textStyle}
                label="Email"
                onChange={e => {
                    handleFormChange('email', e.target.value)
                }}
                error={LoginState.emailError}
                helperText={LoginState.emailError}
            />
            <TextField
                style={textStyle}
                label="Phone Number"
                onChange={e => {
                    handleFormChange('phone', e.target.value)
                }}
                error={LoginState.formErrors.phoneBlank}
                helperText={LoginState.formErrors.phoneBlank ? 'Phone Number is required' : null}
            />
            <TextField
                style={textStyle}
                type="password"
                label="Password"
                onChange={e => {
                    handleFormChange('password', e.target.value)
                }}
                error={LoginState.passwordError}
                helperText={LoginState.passwordError}
            />
            <TextField
                style={textStyle}
                type="password"
                label="Confirm Password"
                onChange={e => {
                    handleFormChange('confirm', e.target.value)
                }}
                error={LoginState.confirmError}
                helperText={LoginState.confirmError}
            />
            <Box style={{ width: '100%', marginTop: 10 }} justifyContent="space-around">
                <Button variant="flat" onClick={LoginState.reset}>
                    Cancel
                </Button>
                <Button variant="flat" onClick={LoginState.handleSignUp} style={{ backgroundColor: theme.palette.primary.main }}>
                    Submit
                </Button>
            </Box>
        </Center>
    )
}

export default observer(SignUp)

const handleFormChange = (field, val) => {
    LoginState.updateFormField(field, val)
}
