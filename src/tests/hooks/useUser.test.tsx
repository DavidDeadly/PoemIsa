import { renderHook } from '@testing-library/react-native';
import { FC, PropsWithChildren } from 'react';

import { UserContext } from '@/context/UserContext';
import { useUser } from '@/hooks/useUser';
import { User } from '@/types/models/user';
import auth from '@/services/auth';

let mockUser: string | null = null;
jest.mock('@/services/auth', () => {
  return {
    loginWithGoogle: jest.fn().mockResolvedValue('UserDavid'),
    signOut: jest.fn()
  };
});

const ContextProviderMock: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UserContext.Provider value={mockUser as User}>
      {children}
    </UserContext.Provider>
  );
};

describe('useUser', () => {
  afterEach(() => {
    mockUser = null;
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
    mockUser = 'UserDavid';
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
    const sypLogin = jest.spyOn(auth, 'loginWithGoogle');
    const { result } = renderHook(() => useUser(), {
      wrapper: ContextProviderMock
    });

    const user = await result.current.loginWithGoogle();

    expect(user).toBe('UserDavid');
    expect(sypLogin).toHaveBeenCalled();
    expect(sypLogin).toHaveBeenCalledTimes(1);
  });

  test('should call signOut function', async () => {
    const sypSignOut = jest.spyOn(auth, 'signOut');
    const { result } = renderHook(() => useUser(), {
      wrapper: ContextProviderMock
    });

    result.current.signOut();

    expect(sypSignOut).toHaveBeenCalled();
    expect(sypSignOut).toHaveBeenCalledTimes(1);
  });
});
