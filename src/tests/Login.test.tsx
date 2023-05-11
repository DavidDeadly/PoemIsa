import { PoetryQuotesFS } from '@/types/models/poetryQuotes';
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

let mockRandomQuote: PoetryQuotesFS | null = null;
jest.mock('@/hooks/useFlipQuoteEffects', () => {
  return {
    useFlipQuoteEffects: jest.fn(() => {
      return {
        randomQuote: mockRandomQuote,
        flipPoetry: null,
        animatedStyle: null
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
      expect(title).toBeOnTheScreen();
    });

    test('should render the button with the text "Iniciar sesión"', () => {
      const button = screen.getByText('Iniciar sesión');
      expect(button).toBeDefined();
      expect(button).toBeOnTheScreen();
    });

    test("should render the image with the source 'login-picture.png'", () => {
      const image = screen.getByRole('image');
      const expectedSrcImage = require('@/assets/images/login-picture.png');
      expect(image).toBeDefined();
      expect(image).toBeOnTheScreen();
      expect(image).toHaveProp('source', expectedSrcImage);
    });

    test('should appear the loading instead of the quote, if randomQuote is null', () => {
      const quote = screen.queryByLabelText('quote');
      const loading = screen.getByLabelText('loading-spinner');

      expect(quote).toBeNull();
      expect(loading).toBeDefined();
      expect(loading).toBeOnTheScreen();
    });

    test('should appear the quote instead of the loading, if randomQuote is not null', () => {
      mockRandomQuote = {
        id: '1',
        author: 'author',
        content: 'content'
      };
      render(<Login />);
      const quote = screen.getByLabelText('quote');
      const loading = screen.queryByLabelText('loading-spinner');

      expect(quote).toBeDefined();
      expect(quote).toBeOnTheScreen();
      expect(loading).toBeNull();
    });
  });
});
