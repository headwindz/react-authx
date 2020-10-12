import React, { ComponentType } from 'react'
import AuthContext from './authContext'

export const AuthWrapper = (Component: ComponentType<any>) => <T extends any>(
  props: T
) => (
  <AuthContext.Consumer>
    {(config) => <Component {...props} authList={config.authList} />}
  </AuthContext.Consumer>
)
