import React, { ReactNode } from 'react'
import {
  AuthProvider,
  AuthConsumer,
  hasAuth,
  setCustomValidator,
} from 'react-authx'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

const authList = ['code1', 'code2', 'code3']
const SPECIFIC_KEY = 'specificKey'
const TEXT = 'hasAuth'
const NO_AUTH_TEXT = 'noAuth'

const dumpElement = (children: ReactNode) => {
  return <AuthProvider value={{ authList }}>{children}</AuthProvider>
}

const div = <div>{TEXT}</div>
const noAuthDiv = <div>{NO_AUTH_TEXT}</div>

describe('AuthConsumer should work with children node', () => {
  test('should work if authKey matches', () => {
    const element = dumpElement(
      <AuthConsumer authKey="code1">{div}</AuthConsumer>
    )
    render(element)
    expect(screen.queryByText(TEXT)).not.toBeNull()
  })

  test('should work for multiple auth keys', () => {
    const element = dumpElement(
      <AuthConsumer authKey="abc,code1">{div}</AuthConsumer>
    )
    render(element)
    expect(screen.queryByText(TEXT)).not.toBeNull()
  })

  test('should work if no authKey matches', () => {
    const element = dumpElement(
      <AuthConsumer authKey="code100">{div}</AuthConsumer>
    )
    render(element)
    expect(screen.queryByText(TEXT)).toBeNull()
  })

  test('should work for multiple auth keys', () => {
    const element = dumpElement(
      <AuthConsumer authKey="code10,code200">{div}</AuthConsumer>
    )
    render(element)
    expect(screen.queryByText(TEXT)).toBeNull()
  })
})

describe('AuthConsumer should work with children render props', () => {
  test('should work if authKey matches', () => {
    const element = dumpElement(
      <AuthConsumer authKey="code1">
        {(hasAuth) => (hasAuth ? div : noAuthDiv)}
      </AuthConsumer>
    )
    render(element)
    expect(screen.queryByText(TEXT)).not.toBeNull()
    expect(screen.queryByText(NO_AUTH_TEXT)).toBeNull()
  })

  test('should work if authKey does NOT match', () => {
    const element = dumpElement(
      <AuthConsumer authKey="code100">
        {(hasAuth) => (hasAuth ? div : noAuthDiv)}
      </AuthConsumer>
    )
    render(element)
    expect(screen.queryByText(TEXT)).toBeNull()
    expect(screen.queryByText(NO_AUTH_TEXT)).not.toBeNull()
  })
})

describe('hasAuth should work with custom setting', () => {
  beforeAll(() => {
    setCustomValidator((authList: string[], authKey: string) => {
      if (authKey === SPECIFIC_KEY) {
        return true
      }
      return authList.includes(authKey)
    })
  })

  afterAll(() => {
    setCustomValidator(null)
  })

  test('should work with custom validator', () => {
    const element = dumpElement(
      <AuthConsumer authKey={SPECIFIC_KEY}>{div}</AuthConsumer>
    )
    render(element)
    expect(screen.queryByText(TEXT)).not.toBeNull()
  })
})
