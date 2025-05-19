export interface Post {
  id: string;
  title: string;
  content: string;
  topImage?: string;
  published: boolean;
  author?: {
    name: string;
  };
  authorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PostCardProps = {
  post: Post;
};
