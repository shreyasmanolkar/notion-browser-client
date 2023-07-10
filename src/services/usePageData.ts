import { useMutation } from "react-query";
import { request } from "../lib/axios";
import { AxiosError } from "axios";

type coverPictureDataType = {
  url: string;
};

type pageSettingsDataType = {
  font: string;
  smallText: boolean;
  fullWidth: boolean;
  lock: boolean;
};

type createPageDataType = {
  title: string;
  icon: string;
  coverPicture: coverPictureDataType;
  content: any;
  favorite: (string | undefined)[];
  pageSettings: pageSettingsDataType;
  path: null | string;
  workspaceId: string;
};

type addToFavorite = {
  pageId: string;
};

type updatePageIconType = {
  icon: string;
  pageId: string;
};

type updatePageTitleType = {
  title: string;
  pageId: string;
};

type updatePageContentType = {
  content: any;
  pageId: string;
};

export type updatePageSettingsData = {
  pageId: string;
  settings: {
    font: string;
    smallText: boolean;
    fullWidth: boolean;
    lock: boolean;
  };
};

export type updatePageCoverData = {
  pageId: string;
  url: string;
  verticalPosition: number;
};

type deletePageDataType = {
  pageId: string;
};

export class usePageData {
  static createPage = async (data: createPageDataType) => {
    const response = await request({
      url: "/pages",
      method: "post",
      data,
    });

    return response.data;
  };

  static addToFavorites = async (data: addToFavorite) => {
    const response = await request({
      url: `/pages/${data.pageId}/favorites`,
      method: "post",
    });

    return response.data;
  };

  static removeFromFavorites = async (data: addToFavorite) => {
    const response = await request({
      url: `/pages/${data.pageId}/favorites`,
      method: "delete",
    });

    return response.data;
  };

  static updatePageSettings = async (data: updatePageSettingsData) => {
    const response = await request({
      url: `/pages/${data.pageId}/settings`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static updatePageCover = async (data: updatePageCoverData) => {
    const response = await request({
      url: `/pages/${data.pageId}/cover`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static deletePage = async (data: deletePageDataType) => {
    const response = await request({
      url: `/pages/${data.pageId}`,
      method: "delete",
      data,
    });

    return response.data;
  };

  static updatePageIcon = async (data: updatePageIconType) => {
    const response = await request({
      url: `/pages/${data.pageId}/icon`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static updatePageTitle = async (data: updatePageTitleType) => {
    const response = await request({
      url: `/pages/${data.pageId}/title`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static updatePageContent = async (data: updatePageContentType) => {
    const response = await request({
      url: `/pages/${data.pageId}/content`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static useCreatePageData = () => {
    return useMutation(usePageData.createPage, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useAddToFavorites = () => {
    return useMutation(usePageData.addToFavorites, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useRemoveFromFavorites = () => {
    return useMutation(usePageData.removeFromFavorites, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUpdatePageSettings = () => {
    return useMutation(usePageData.updatePageSettings, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUpdatePageCover = () => {
    return useMutation(usePageData.updatePageCover, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useDeletePageData = () => {
    return useMutation(usePageData.deletePage, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUpdatePageIconData = () => {
    return useMutation(usePageData.updatePageIcon, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUpdatePageTitleData = () => {
    return useMutation(usePageData.updatePageTitle, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUpdatePageContentData = () => {
    return useMutation(usePageData.updatePageContent, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };
}
