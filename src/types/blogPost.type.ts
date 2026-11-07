export interface blogPost {
  id: string;
  title: string;
  content: string;
  thumbnail?: string | null;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED" | "PENDING"| "ARCHIVED"
  tags: string[];
  views: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    comments: number;
  };
}
