import { Login } from '@/views/Login';
import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

const mockLoginWithGoogle = jest.fn();

jest.mock('@/hooks/useUser', () => {
  return {
    useUser: jest.fn(() => {
      return {
        user: null,
        loginWithGoogle: mockLoginWithGoogle
      };
    })
  };
});

jest.mock('@/hooks/useRandomQuote', () => {
  return {
    useRandomQuote: jest.fn(() => {
      return {
        randomQoute: null
      };
    })
  };
});

describe('Login', () => {
  beforeEach(() => {
    render(
      <View testID="login">
        <Login />
      </View>
    );
  });

  describe('Render', () => {
    test('should render', () => {
      const login = screen.getByTestId('login');
      expect(login).toBeDefined();
    });

    test('should render the title', () => {
      const title = screen.getByText('PoemIsa');
      expect(title).toBeDefined();
    });

    test('should render the button with the text "Iniciar sesión"', () => {
      const button = screen.getByText('Iniciar sesión');
      expect(button).toBeDefined();
    });

    test("shoudl render the image with the source 'login-picture.png'", () => {
      const image = screen.getByTestId('login-image');
      expect(image).toBeDefined();
    });
  });
});
