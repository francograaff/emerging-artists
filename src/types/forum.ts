export interface ForumPost {
  id: string;
  name: string;
  title: string;
  body: string;
  timestamp: Date;
}

export interface Reply {
  id: string;
  postId: string;
  name: string;
  body: string;
  timestamp: Date;
} 