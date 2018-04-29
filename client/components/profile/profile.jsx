import React from 'react'
import { observer } from 'mobx-react'

import { ScrollView } from 'react-layout-components'

import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List'

import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew'
import Person from 'material-ui-icons/Person'

import WindowSize from '../windowSize'
import UserState from '../../state/singletons/users'

import { theme } from '../theme/theme'

const Profile = props => {
    return (
        <ScrollView style={{ height: props.innerHeight - 48 }}>
            <List>
                <ListItem
                    onClick={() => {
                        UserState.logout()
                    }}>
                    <ListItemIcon style={{ color: theme.palette.primary.main }}>
                        <PowerSettingsNew />
                    </ListItemIcon>
                    <ListItemText primary={<span style={{ color: theme.palette.primary.main }}>Sign Out</span>} />
                </ListItem>
            </List>
        </ScrollView>
    )
}

export default WindowSize(observer(Profile))
