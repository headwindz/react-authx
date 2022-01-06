import React from 'react';
import { hasAuth, AuthProvider, AuthWrapper } from '../../src';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const authList = ['code1', 'code2', 'code3'];

describe('AuthWrapper should work', () => {
  test('should pass in authList into base component', () => {
    const _Input = (props: { authList: string[] }) => {
      return (
        <>
          <input data-testid="disabled" disabled={hasAuth(props.authList, 'code1')} />
          <input data-testid="normal" disabled={hasAuth(props.authList, 'code100')} />
        </>
      );
    };

    const Input = AuthWrapper(_Input);
    render(
      <AuthProvider value={{ authList }}>
        <Input />
      </AuthProvider>,
    );
    expect(screen.getByTestId('disabled')).toBeDisabled();
    expect(screen.getByTestId('normal')).toBeEnabled();
  });
});
