export type PageSettingsType = {
  font: string;
  smallText: boolean;
  fullWidth: boolean;
  lock: boolean;
};

export type CoverPictureType = {
  url: string;
  verticalPosition: number;
};

export type ContentType = {
  type: string;
  content: unknown[];
};

export type PageType = {
  id: string;
  reference: string;
  title: string;
  icon: string;
  coverPicture: CoverPictureType;
  content: ContentType;
  favorite: string[];
  pageSettings: PageSettingsType;
  path: string | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt?: Date;
};
