import { fireEvent, render, screen } from '@testing-library/react-native';
import { StatusBar, StyleSheet } from 'react-native';

import { PoetryQuotesFS } from '@/types/models/poetryQuotes';
import { Login } from '@/views/Login';
import { COLORS } from '@/constants';
import { SigInException } from '@/errors/SignInException';
import { ERRORS, ERRORS_MAP_TO_USER } from '@/constants/errors';

const loginStyles = StyleSheet.create({
  container: {
    display: 'flex',
    textAlign: 'center',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight
  },
  title: {
    fontSize: 60,
    marginTop: 60,
    fontFamily: 'MontserratAlternates-ExtraBoldItalic',
    flex: 1,
    fontWeight: '600',
    color: COLORS.main.primary
  },
  quoteContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 50
  },
  button: {
    flex: 1
  },
  buttonText: {
    color: '#fff'
  },
  image: {
    flex: 2,
    margin: 0,
    width: '80%',
    resizeMode: 'cover',
    borderRadius: 50,
    borderColor: COLORS.main.primary,
    borderWidth: 2,
    padding: 10,
    backgroundColor: COLORS.main.secondary,
    opacity: 0.5
  }
});

let mockLoginWithGoogle = jest.fn().mockResolvedValue(undefined);
let mockUser: Object | null = null;
jest.mock('@/hooks/useUser', () => {
  return {
    useUser: jest.fn(() => {
      return {
        user: mockUser,
        loginWithGoogle: mockLoginWithGoogle
      };
    })
  };
});

let mockRandomQuote: PoetryQuotesFS | null = null;
const mockFlipPoetry = jest.fn();
jest.mock('@/hooks/useFlipQuoteEffects', () => {
  return {
    useFlipQuoteEffects: jest.fn(() => {
      return {
        randomQuote: mockRandomQuote,
        flipPoetry: mockFlipPoetry,
        animatedStyle: null
      };
    })
  };
});

const mockToastShow = jest.fn();
jest.mock('react-native-toast-notifications', () => {
  return {
    useToast: () => ({
      show: mockToastShow
    })
  };
});

describe('Login', () => {
  beforeEach(() => {
    render(<Login />);
  });

  afterEach(() => {
    mockFlipPoetry.mockClear();
    mockLoginWithGoogle.mockClear();
    mockToastShow.mockClear();
    mockRandomQuote = null;
    mockUser = null;
    expect(screen.toJSON()).toMatchSnapshot();
  });

  describe('Render', () => {
    test('should render', () => {
      const login = screen.getAllByLabelText('login');
      expect(login).toBeDefined();
    });

    test('should render the aplicastion title "PoemIsa"', () => {
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
      const image = screen.getByRole('imagebutton');
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

  describe('Functionality', () => {
    test("should call loginWithGoogle when the user press the button 'Iniciar sesión'", () => {
      const button = screen.getByText('Iniciar sesión');

      fireEvent(button, 'press');

      expect(mockLoginWithGoogle).toBeCalled();
      expect(mockLoginWithGoogle).toBeCalledTimes(1);
    });

    test('should call fipPoetry when the user press the image', () => {
      mockRandomQuote = {
        id: '1',
        author: 'author',
        content: 'content'
      };
      render(<Login />);
      const image = screen.getByRole('imagebutton');

      fireEvent(image, 'press');

      expect(mockFlipPoetry).toBeCalled();
      expect(mockFlipPoetry).toBeCalledTimes(1);
    });

    test('should not call fipPoetry when the user press the image, if randomQuote is null', () => {
      render(<Login />);
      const image = screen.getByRole('imagebutton');
      fireEvent(image, 'press');

      expect(mockFlipPoetry).not.toBeCalled();
    });

    test('should not call loginWithGoogle when the user press the button "Iniciar sesión", if user is not null', () => {
      mockUser = {};
      render(<Login />);

      const button = screen.getByText('Iniciar sesión');
      fireEvent(button, 'press');

      expect(button).toBeDisabled();
      expect(mockLoginWithGoogle).not.toBeCalled();
    });
  });

  describe('Styles', () => {
    test("should have the style 'container'", () => {
      const container = screen.queryByLabelText('login');
      expect(container).toHaveStyle(loginStyles.container);
    });

    test("should have the style 'title'", () => {
      const title = screen.getByText('PoemIsa');
      expect(title).toHaveStyle(loginStyles.title);
    });

    test("should have the style 'quoteContainer'", () => {
      mockRandomQuote = {
        id: '1',
        author: 'author',
        content: 'content'
      };
      render(<Login />);
      const quote = screen.queryByLabelText('quote');
      expect(quote).not.toBeNull();
      expect(quote).toHaveStyle(loginStyles.quoteContainer);
    });

    test("should have the style 'button'", () => {
      render(<Login />);
      const button = screen.queryByLabelText('button');
      expect(button).toHaveStyle(loginStyles.button);
    });

    test("should have the style 'buttonText'", () => {
      const button = screen.getByText('Iniciar sesión');
      expect(button).toHaveStyle(loginStyles.buttonText);
    });

    test("should have the style 'image'", () => {
      const image = screen.getByRole('imagebutton');
      expect(image).toHaveStyle(loginStyles.image);
    });

    describe('Animations', () => {
      test("should have the animation 'entering' in the image", () => {
        const image = screen.getByRole('imagebutton');
        expect(image).toHaveProp('entering');
      });

      test("should have the animation 'entering' and 'layout' in the quoteContainer", () => {
        mockRandomQuote = {
          id: '1',
          author: 'author',
          content: 'content'
        };
        render(<Login />);
        const quote = screen.getByLabelText('quote');
        expect(quote).toHaveProp('entering');
      });

      test('should trigger the toast notification when the login succeed', async () => {
        const button = screen.getByText('Iniciar sesión');
        fireEvent(button, 'press');

        expect(mockLoginWithGoogle).toBeCalled();
        expect(mockLoginWithGoogle).toBeCalledTimes(1);
        await expect(mockLoginWithGoogle()).resolves.toBeUndefined();
        expect(mockToastShow).toBeCalled();
        expect(mockToastShow).toBeCalledTimes(1);
        expect(mockToastShow).toBeCalledWith('Inicio de sesión exitoso', {
          type: 'success'
        });
      });

      test('should trigger the toast notification when the login fails with an singIn exception', async () => {
        mockLoginWithGoogle = mockLoginWithGoogle.mockRejectedValue(
          new SigInException(ERRORS.SING_IN.NETWORK_ERROR)
        );
        render(<Login />);
        const button = screen.getByText('Iniciar sesión');
        fireEvent(button, 'press');

        expect(mockLoginWithGoogle).toBeCalled();
        expect(mockLoginWithGoogle).toBeCalledTimes(1);
        await expect(mockLoginWithGoogle()).rejects.toStrictEqual(
          new SigInException(ERRORS.SING_IN.NETWORK_ERROR)
        );
        expect(mockToastShow).toBeCalled();
        expect(mockToastShow).toBeCalledTimes(1);
        expect(mockToastShow).toBeCalledWith(
          ERRORS_MAP_TO_USER.get(ERRORS.SING_IN.NETWORK_ERROR),
          {
            type: 'danger'
          }
        );
      });

      test("should triger the toast notification when the login fails with an error that it's not a signIn exception", async () => {
        mockLoginWithGoogle = mockLoginWithGoogle.mockRejectedValue(
          new Error('Error para loggearse en los tests, no GUI!!!')
        );
        render(<Login />);
        const button = screen.getByText('Iniciar sesión');
        fireEvent(button, 'press');

        expect(mockLoginWithGoogle).toBeCalled();
        expect(mockLoginWithGoogle).toBeCalledTimes(1);
        await expect(mockLoginWithGoogle()).rejects.toStrictEqual(
          new Error('Error para loggearse en los tests, no GUI!!!')
        );
        expect(mockToastShow).toBeCalled();
        expect(mockToastShow).toBeCalledTimes(1);
        expect(mockToastShow).toBeCalledWith(
          ERRORS_MAP_TO_USER.get(ERRORS.UNEXPECTED),
          {
            type: 'danger'
          }
        );
      });
    });
  });
});
