/* eslint-disable react/jsx-pascal-case */
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ThemeToggler from './components/ThemeToggler';
import { useStyles } from './NavBarStyles';
import { SideBarContext } from '../../App';
import { PropTypes } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Snackbar from 'components/Home_MUI/Snackbar';

function NavBar({ toggleTheme, checked }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { openSidebar, toggleSideBar } = useContext(SideBarContext);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [notifier, setNotifier] = useState(false);
  const History = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // const handleSideBarToggle = () => {
  //   openSideBar = !openSideBar;
  // };
  const handleMenuProfile = () => {
    History.push(`/profile`);
    handleMenuClose();
  };

  const handleMenuHome = () => {
    History.push(`/`);
    handleMenuClose();
  };
  const handleMenuLogout = () => {
    History.push(`/`);
    handleMenuClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    History.push('/catalogue');
    document.getElementById('Search').value = '';
    setNotifier(true);
  };

  const handleClose = () => {
    setNotifier(false);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      position="fixed"
    >
      <MenuItem onClick={handleMenuProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      position="fixed"
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon onClick={() => toggleSideBar()} />
          </IconButton>
          <Link to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              Quiz App
            </Typography>
          </Link>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </Button>
            <InputBase
            id='Search'
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton>
              <ThemeToggler toggleTheme={toggleTheme} checked={checked} />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Snackbar
        open={notifier}
        onClose={handleClose}
        message="No hay cursos relacionados a la busqueda."
      />
    </div>
  );
}

export default NavBar;

NavBar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  checked: PropTypes.string.isRequired,
};
