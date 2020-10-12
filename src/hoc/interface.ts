import { ReactNode } from 'react';

export interface IAuthConsumerProps {
  authKey: string
  children?: ReactNode | ((hasAuth: boolean, props: any) => ReactNode)
  [key: string]: any
}

export type validatorType = (
  authList: string[],
  authKey: string,
  otherProps: any
) => boolean
