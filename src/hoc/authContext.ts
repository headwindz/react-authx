import { createContext } from 'react'

export default createContext({
  authList: [],
})

export interface IAuthConfig {
  authList: string[]
}
