export type PageType = {
  id: string;
  reference: string;
  path: string | null;
  icon: string;
  title: string;
};

export type WorkspaceType = {
  id: string;
  name: string;
  icon: string;
  members: string[];
  pages: PageType[];
  createdAt: Date;
  updatedAt?: Date;
};
