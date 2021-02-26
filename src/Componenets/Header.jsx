import React, { useContext, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { AppBar, IconButton, makeStyles, Toolbar, fade, Avatar, Menu, MenuItem } from '@material-ui/core'
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import MoreIcon from '@material-ui/icons/MoreVert';
import { storeContext } from './../Context/store_context'
const useStyle = makeStyles((theme) => {
    return {
        root: {
            flexDirection: 'row',
            alignItems: 'center',

        },
        atag: {
            textDecoration: 'none',
            color: 'inherit'

        },
        title: {
            flexGrow: 1,
        },
        search: {
            position: 'relative',

            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }
})
function Header() {
    const classes = useStyle()
    const history = useHistory();
    const { state, methods } = useContext(storeContext)
    const [searchText, setSearchText] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const user = localStorage.getItem('user') || state.user

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const gotoSearchURL = () => {
        let url = `/search/?q=${searchText}`;
        history.replace(url)
    }

    const Logout = () => {
        methods.signOut()
        handleClose()
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
    }

    const toggleTheme = () => {
        handleClose()
        methods.toggleTheme()
    }

    const search = (e) => {

        e.preventDefault()
        gotoSearchURL()

    }

    return (
        <div>


            <AppBar className={classes.root} position="static" color="primary" >
                <Toolbar>
                    <Link className={classes.atag} to="/">
                        <IconButton color={classes.btn} color="inherit">
                            <AppsRoundedIcon />
                        </IconButton>
                    </Link>

                </Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    SASTI DUKAN
                </Typography>
                <form onSubmit={search}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </form>
                <div />
                <Link to="/categories/electronics" className={classes.atag} >
                    Departments
                </Link>
                <div style={{ paddingRight: '15px' }}>
                    <Link to="/cart" className={classes.atag}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={state.cartProducts.length} color="secondary">
                                <ShoppingCartRoundedIcon />
                            </Badge>

                        </IconButton>
                    </Link>


                    {user ? <> <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        aria-controls="menu-appbar"
                        onClick={handleMenu}
                        color="secondary"
                    >
                        <Avatar style={{ backgroundColor: "red", color: 'white' }} >
                            <b> {user[0].toUpperCase()}</b>
                        </Avatar>
                    </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={Logout}>Logout</MenuItem>
                            <MenuItem onClick={toggleTheme}>Toggle Theme</MenuItem>
                        </Menu>


                    </>

                        : <> <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                            aria-controls="menu-appbar2"
                            color="inherit"
                            onClick={handleMenu}
                        >
                            <MoreIcon />
                        </IconButton>

                            <Menu
                                id="menu-appbar2"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <Link className={classes.atag} to="/signin" > <MenuItem onClick={handleClose}> Login</MenuItem></Link>
                                <MenuItem onClick={toggleTheme}>Toggle Theme  </MenuItem>
                            </Menu>
                        </>
                    }
                </div>
            </AppBar>


        </div>
    )
}

export default Header



