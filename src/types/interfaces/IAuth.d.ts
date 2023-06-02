interface IAuth {
  signOut: () => void;
  loginWithGoogle: () => Promise<void | FirebaseAuthTypes.UserCredential>;
}
