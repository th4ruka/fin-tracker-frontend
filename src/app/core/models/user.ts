export interface User {
  id: string;
  username: string | null;
  email: string | null;
  createdAt: Date;
  profilePicture?: string | null;
}
