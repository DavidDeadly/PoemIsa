interface DBUser {
  id?: string;
  displayName?: string | null;
  email?: string;
  emailVerified: boolean;
  followers: number;
  followed: number;
  photoURL?: string | null;
}
