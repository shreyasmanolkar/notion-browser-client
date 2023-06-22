import { useMutation } from "react-query";
import { request } from "../lib/axios";
import { AxiosError } from "axios";

type updateWorkspaceNameType = {
  name: string;
  workspaceId: string;
};

export class useWorkspaceData {
  static updateWorkspaceName = async (data: updateWorkspaceNameType) => {
    const response = await request({
      url: `/workspaces/${data.workspaceId}`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static useUpdateWorkspaceNameData = () => {
    return useMutation(useWorkspaceData.updateWorkspaceName, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };
}
