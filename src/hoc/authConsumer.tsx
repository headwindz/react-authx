import React from 'react'
import AuthContext, { IAuthConfig } from './authContext'
import { is, difference, isEmpty, length, pipe, equals, not } from 'ramda'
import { IAuthConsumerProps, validatorType } from './interface'

const AuthConsumer = (props: IAuthConsumerProps) => {
  const _render = (authConfig: IAuthConfig, props: IAuthConsumerProps) => {
    const { children, authKey, ...otherProps } = props
    const { authList } = authConfig
    const hasAuth = _hasAuth(authList, props)
    if (is(Function, children)) {
      return (children as any)(hasAuth, otherProps)
    }
    return hasAuth ? children : null
  }

  return (
    <AuthContext.Consumer>
      {(config: IAuthConfig) => {
        return _render(config, props)
      }}
    </AuthContext.Consumer>
  )
}

let customValidator: validatorType
const setCustomValidator = (fn: validatorType) => {
  customValidator = fn
}

function _hasAuth(authList: string[], props: IAuthConsumerProps) {
  const { authKey, ...otherProps } = props
  if (authKey == null || typeof authKey !== 'string') {
    throw new Error('You have to specific auth key for using AuthConsumer')
  }
  const keys = authKey.split(',')
  if (is(Function, customValidator)) {
    return customValidator(authList, authKey, otherProps)
  }
  return pipe(difference(keys), length, equals(keys.length), not)(authList)
}

const hasAuth = (authList: string[], authKey: string) =>
  _hasAuth(authList, { authKey })

export default AuthConsumer
export { hasAuth, setCustomValidator }
