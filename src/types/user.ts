export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
}

// Import Post type to avoid circular dependency
import { Post } from "./post";
