import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import HeaderNavGrid from 'components/HeaderNavGrid';
import LogoutButton from 'components/LogoutButton';
import Collapse from 'react-collapse';
import { presets } from 'react-motion';
import snapLogo from '!url!images/logo/snap_logo_white.svg';
import Menu from './menu.svg';
import styles from './Header.css';
import cx from 'classnames';
import { toggleHeaderNav } from 'actions/header';

const mapStateToProps = (state) => {
  return {
    showNav: state.header.showNav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHeaderNav: () => {
      dispatch(toggleHeaderNav());
    },
  };
};

const Header = ({ title, showNav, toggleHeaderNav }) => {
  const menuToggleClassNames = showNav
    ? cx(styles.navToggle, styles.navToggleActive)
    : styles.navToggle;
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <img
          className={styles.snapLogo}
          alt="SFU Snap Logo"
          src={snapLogo}
          height={50}
          width={50}
        />
        <button className={menuToggleClassNames} onClick={toggleHeaderNav}>
          <h1 className={styles.title}>{title}</h1>
        </button>
        <button
          type="button"
          aria-label="Toggle Menu"
          name="Toggle Menu"
          className={menuToggleClassNames}
          onClick={toggleHeaderNav}
        >
          <Menu />
        </button>
      </header>

      <Collapse isOpened={showNav} springConfig={presets.stiff}>
        <HeaderNavGrid />
        <LogoutButton />
      </Collapse>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showNav: PropTypes.bool.isRequired,
  toggleHeaderNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
