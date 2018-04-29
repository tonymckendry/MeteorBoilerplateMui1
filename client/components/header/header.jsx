import React from 'react'
import { observer } from 'mobx-react'
import { Center, VBox } from 'react-layout-components'
import isUndefined from 'lodash.isundefined'

import AppBar from 'material-ui/AppBar'
import Checkbox from 'material-ui/Checkbox'
import Toolbar from 'material-ui/Toolbar'
import Avatar from 'material-ui/Avatar'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'

import Lightning from 'material-ui-icons/FlashOn'
import ShoppingCart from 'material-ui-icons/ShoppingCart'
import ListIcon from 'material-ui-icons/ViewList'
import People from 'material-ui-icons/People'
import Face from 'material-ui-icons/Face'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import MenuIcon from 'material-ui-icons/Menu'
import FilterIcon from 'material-ui-icons/FilterList'

import { HeaderState, GeneralState, UserState, HelperState } from '../../directory/singletons'
import { theme } from '../theme/theme'

const Header = () => {
    return (
        <div>
            <AppBar position="static" style={{ height: 48, boxShadow: '0px 2px 5px rgba(0,0,0,.3)', backgroundColor: theme.palette.primary.main }} color="primary">
                <Toolbar>
                    {HeaderState.showBack ? (
                        <IconButton style={{ marginTop: -8 }} onClick={HeaderState.goBack}>
                            <KeyboardArrowLeft />
                        </IconButton>
                    ) : (
                        <IconButton style={{ marginTop: -17 }} onClick={GeneralState.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="title" color="inherit" style={{ marginTop: -17, marginLeft: 10 }}>
                        {GeneralState.appFunction}
                    </Typography>
                    {HeaderState.showFilterButton ? (
                        <IconButton style={{ position: 'absolute', right: 10, top: -2 }} onClick={HeaderState.toggleFilter}>
                            <FilterIcon />
                        </IconButton>
                    ) : null}
                </Toolbar>
            </AppBar>
            {renderNavigationDrawer()}
            {renderFilterDrawer()}
        </div>
    )
}

export default observer(Header)

const renderNavigationDrawer = () => {
    return (
        <Drawer
            open={GeneralState.drawerOpen}
            docked={false}
            onClose={() => {
                GeneralState.toggleDrawer(false)
            }}>
            <div style={{ height: '100vh' }}>
                <Paper style={{ paddingTop: 20, paddingBottom: 20, backgroundColor: theme.palette.primary.main, width: 250 }}>
                    <Center column style={{ textAlign: 'center', width: 250 }}>
                        <Avatar size={50} backgroundColor="rgba(108, 100, 99, .6)">
                            <span>
                                {UserState.currentUser.profile.firstName[0]}
                                {UserState.currentUser.profile.lastName[0]}
                            </span>
                        </Avatar>
                        <VBox style={{ fontSize: '.9em', marginTop: 10 }}>
                            <Typography style={{ fontSize: '1.5em' }}>{UserState.currentUser.profile.firstName}</Typography>
                            <Typography style={{ fontSize: '1.5em' }}>{UserState.currentUser.profile.lastName}</Typography>
                        </VBox>
                    </Center>
                </Paper>
                <List style={{ fontWeight: 'bold' }}>
                    <ListItem
                        button
                        onClick={() => {
                            GeneralState.changeAppFunction('Profile')
                        }}
                        style={{ backgroundColor: GeneralState.appFunction === 'Profile' ? 'white' : null }}>
                        <ListItemIcon style={{ color: getNavListItemColor('Profile') }}>
                            <Face />
                        </ListItemIcon>
                        <ListItemText primary={<span style={{ color: getNavListItemColor('Profile') }}>Profile</span>} />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}

const getNavListItemColor = item => {
    if (GeneralState.appFunction === item) {
        return theme.palette.primary.main
    } else {
        return 'secondary'
    }
}

const renderFilterDrawer = () => {
    let drawerContent = (
        <List style={{ fontWeight: 'bold' }}>
            <ListItem
                button
                onClick={() => {
                    HeaderState.openFilterList('Class')
                }}
                style={{ backgroundColor: getFilterListItemColor('Class') == 'primary' ? 'white' : null }}>
                <ListItemText primary={<span style={{ color: getFilterListItemColor('Class') }}>Class</span>} color={getFilterListItemColor('Class')} />
                <ListItemIcon>
                    <KeyboardArrowRight />
                </ListItemIcon>
            </ListItem>
        </List>
    )

    if (HeaderState.filterListType) {
        drawerContent = (
            <List>
                {HelperState.classes.map(helper => {
                    return (
                        <ListItem
                            key={helper}
                            button
                            onClick={() => {
                                HeaderState.addRemoveFilter(helper)
                            }}>
                            <Checkbox disableRipple checked={HeaderState.filter.class.indexOf(helper) > -1} />
                            <ListItemText primary={helper} />
                        </ListItem>
                    )
                })}
            </List>
        )
    }
    return (
        <Drawer
            open={HeaderState.filterOpen}
            docked={false}
            anchor="right"
            onClose={() => {
                HeaderState.toggleFilter()
            }}>
            <div style={{ height: '100vh', minWidth: 200 }}>
                <AppBar position="static" style={{ height: 48, boxShadow: '0px 2px 5px rgba(0,0,0,.3)', backgroundColor: theme.palette.primary.main }}>
                    <Toolbar>
                        <IconButton
                            onClick={HeaderState.closeFilterList}
                            style={{ opacity: HeaderState.filterListType ? 1 : 0, marginTop: -8, marginLeft: -10 }}
                            disabled={isUndefined(HeaderState.filterListType)}>
                            <KeyboardArrowLeft />
                        </IconButton>
                        <Typography variant="title" style={{ marginTop: -8 }}>
                            Filter
                        </Typography>
                    </Toolbar>
                </AppBar>
                {drawerContent}
            </div>
        </Drawer>
    )
}

const getFilterListItemColor = item => {
    if (GeneralState.appFunction === item) {
        return 'primary'
    } else {
        return 'secondary'
    }
}
