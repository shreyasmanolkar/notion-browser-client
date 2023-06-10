export type ProfilePictureType = {
  url: string;
};

export type WorkspaceType = {
  workspaceId: string;
  favorites: string[];
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  isDarkMode: boolean;
  profilePicture: ProfilePictureType;
  workspaces: WorkspaceType[];
  createdAt: Date;
  updatedAt?: Date;
};
