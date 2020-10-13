import React from 'react'
import { hasAuth, setCustomValidator } from 'react-authx'
//  (authList: string[], authKey: string) => _hasAuth(authList, { authKey });

const authList = ['code1', 'code2', 'code3']
const SPECIFIC_KEY = 'specificKey'

describe('hasAuth should work without custom setting', () => {
  // test('should throw error if no authKey', () => {
  //   expect(hasAuth(authList, undefined)).toThrowError()
  // });

  test('should work if authKey matches', () => {
    expect(hasAuth(authList, 'code1')).toBeTruthy()
  })

  test('should work for multiple auth keys', () => {
    expect(hasAuth(authList, 'code1,code100')).toBeTruthy()
  })

  test('should work if no authKey matches', () => {
    expect(hasAuth(authList, 'code100')).toBeFalsy()
  })

  test('should work for multiple auth keys', () => {
    expect(hasAuth(authList, 'code100,code200')).toBeFalsy()
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
    expect(hasAuth(authList, SPECIFIC_KEY)).toBeTruthy()
    expect(hasAuth(authList, 'code1')).toBeTruthy()
    expect(hasAuth(authList, 'code100')).toBeFalsy()
  })
})
