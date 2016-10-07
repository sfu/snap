import {default as React, PropTypes} from 'react'

import {Header} from 'components/Header'
import {NavBar} from 'components/NavBar'

import 'normalize.css/normalize.css'
import 'styles/global.css'
import styles from './App.css'


export const App = ({children}) => {
  const childProps = children.props.routerProps || children.props
  const { fullScreen } = childProps.route
  return (
    <div>
      <div className={styles.app}>
        { fullScreen ? null : <Header title={childProps.route.title} /> }
        <div className={fullScreen ? '' : styles.widgets}>
          {children}
        </div>
      </div>
      { fullScreen ? null : <NavBar /> }
    </div>
  )
}

App.propTypes = {
  children: PropTypes.object.isRequired
}
