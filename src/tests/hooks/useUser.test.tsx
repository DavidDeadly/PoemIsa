import { renderHook } from '@testing-library/react-native';
import { FC, PropsWithChildren } from 'react';

import { UserContext } from '@/components/context';
import { useUser } from '@/hooks';
import { Auth } from '@/services';
import { UserContextType } from '@/types/components';

let mockUserContext: {
  user: string | null;
  loadingUser: boolean;
} = {
  user: 'UserDavid',
  loadingUser: true
};
jest.mock('@/services/auth', () => {
  return {
    loginWithGoogle: jest.fn().mockResolvedValue('UserDavid'),
    signOut: jest.fn()
  };
});

const ContextProviderMock: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UserContext.Provider value={mockUserContext as UserContextType}>
      {children}
    </UserContext.Provider>
  );
};

describe('useUser', () => {
  afterEach(() => {
    mockUserContext = {
      user: null,
      loadingUser: true
    };
  });

  test('should be a function', () => {
    expect(useUser).toBeInstanceOf(Function);
  });

  test('should return a user initial value (null)', () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: ContextProviderMock
    });

    expect(result.current.user).toBeNull();
  });

  test("should return a user value 'UserDavid'", () => {
    mockUserContext.user = 'UserDavid';
    const { result } = renderHook(() => useUser(), {
      wrapper: ContextProviderMock
    });

    expect(result.current.user).toBe('UserDavid');
  });

  test('should return a loginWithGoogle function', () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: ContextProviderMock
    });

    expect(result.current.loginWithGoogle).toBeInstanceOf(Function);
  });

  test('should return a signOut function', () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: ContextProviderMock
    });

    expect(result.current.signOut).toBeInstanceOf(Function);
  });

  test('should call loginWithGoogle function', async () => {
    const sypLogin = jest.spyOn(Auth, 'loginWithGoogle');
    const { result } = renderHook(() => useUser(), {
      wrapper: ContextProviderMock
    });

    const user = await result.current.loginWithGoogle();

    expect(user).toBe('UserDavid');
    expect(sypLogin).toHaveBeenCalled();
    expect(sypLogin).toHaveBeenCalledTimes(1);
  });

  test('should call signOut function', async () => {
    const sypSignOut = jest.spyOn(Auth, 'signOut');
    const { result } = renderHook(() => useUser(), {
      wrapper: ContextProviderMock
    });

    result.current.signOut();

    expect(sypSignOut).toHaveBeenCalled();
    expect(sypSignOut).toHaveBeenCalledTimes(1);
  });
});
