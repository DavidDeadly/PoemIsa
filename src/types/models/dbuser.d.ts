interface DBUser {
  displayName?: string;
  email?: string;
  emailVerified: boolean;
  followers: number;
  followed: number;
  photoURL?: string;
}
