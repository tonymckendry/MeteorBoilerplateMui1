import React from 'react'
import { Page } from 'react-layout-components'
import { observer } from 'mobx-react'
import { OnResize } from 'react-window-mixins'

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'

import { theme } from './theme/theme'
import Login from './login/login'
import Header from './header/header'
import Profile from './profile/profile'

import { UserState, GeneralState } from '../directory/singletons'

export const Main = observer(
    React.createClass({
        displayName: 'Main',
        mixins: [OnResize],

        render() {
            let appTheme = createMuiTheme(theme)
            let component
            if (UserState.authenticated && UserState.currentUser && UserState.currentUser.profile) {
                let content
                switch (GeneralState.appFunction) {
                    case 'Profile':
                        content = <Profile />
                        break
                }
                component = (
                    <Page>
                        <Header />
                        {content}
                    </Page>
                )
            } else {
                component = <Login />
            }
            return <MuiThemeProvider theme={appTheme}>{component}</MuiThemeProvider>
        }
    })
)
