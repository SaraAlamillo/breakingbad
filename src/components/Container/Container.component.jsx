import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  useTheme,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Container as MaterialContainer,
  LinearProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { containerStyles } from "./Container.style";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export const Container = ({ menuItems, children, loading, ...props }) => {
  const classes = containerStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MaterialContainer className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open the left menu"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            {process.env.REACT_APP_TITLE}
          </Typography>
        </Toolbar>

        <LinearProgress className={clsx(!loading && classes.hide)} />
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.id}>
              <Link to={item.route} className={classes.linkMenu}>
                <ListItemText primary={item.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </MaterialContainer>
  );
};

Container.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Container.defaultProps = {};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({});

export const ContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
