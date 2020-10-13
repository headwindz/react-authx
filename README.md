# react-authx 

## Install

`npm install react-authx --save`

## API

- AuthProvider

  Params：

  ```
  value(object) : {
    authList: [], // permission code list
  }
  ```

- AuthConsumer

  Params：

  - authKey:string - permission code, seperated with `,` if there are multiple

- AuthWrapper

  hoc wrapper, inject `authList` into the component

- hasAuth

  (authList: string, authKey: string) => boolean

- setCustomeValidator

  (authList, authKey, otherProps: T) => boolean

## Example

### Provider

```jsx
import React from 'react'
import { AuthProvider } from 'react-authx'

const authList = ['user-edit', 'user-list', 'user-enable,user-disable']
const App = () => {
  return (
    <AuthProvider value={{ authList }}>
      ...
    </AuthProvider>
  )
}
```

### Consumer

```jsx
import React from 'react'
import { AuthConsumer } from 'react-authx'

const Component = () => {
  return (
    <AuthConsumer authKey="user-edit">
      <div> shown when has auth for key: user-edit</div>
    </AuthConsumer>

    <AuthConsumer authKey="user-list">
    {
      hasAuth => (
      hasAuth
        ? <div> shown when has auth for key: user-list </div>
        : <div> shown when does not have auth for key: user-list </div>
      }
      )
    }
    </AuthConsumer>
  )
}
```

### AuthWrapper

```jsx
import React from 'react'
import { AuthWrapper, hasAuth } from 'react-authx'
import { Input } from 'antd'

@AuthWrapper
const Component = (props) => {
  return <Input disable={hasAuth(props.authList, 'user-enable,user-disable')} />
}
```
