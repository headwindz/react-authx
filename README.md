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

### AuthList

```javascript
const authList = ['user-edit', 'user-list', 'user-enable,user-disable']
```

### Provider

```javascript
import React from 'react'
import { AuthProvider } from 'react-authx'

class App extends React.Component {
  render() {
    return (
      <AuthProvider value={{ authList }}>
        ...
      </AuthProvider>
    )
  }
}
```

### Consumer

```javascript
import React from 'react'
import { AuthConsumer } from 'react-authx'

class Component extends React.Component {
  render () {
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
}
```

### AuthWrapper

```javascript
import React from 'react'
import { AuthWrapper, hasAuth } from 'react-authx'
import { Input } from 'antd'

@AuthWrapper
class Component extends React.Component {
  render() {
    return <Input disable={hasAuth(this.props.authList, 'user-enable,user-disable')} />
  }
}
```