import workspaceReducer, {
  setWorkspace,
  clearWorkspace,
} from "../workspaceSlice";
import { logout } from "../userSlice";

describe("workspace reducer", () => {
  const initialNullState = {
    workspaceInfo: null,
  };

  const initialLoadState = {
    workspaceInfo: {
      id: "01",
      name: "home-workspace",
      icon: "1F3C7",
      members: ["1"],
      pages: [
        {
          id: "2",
          reference: "notion-clone-project-2",
          path: null,
          icon: "1F575",
        },
      ],
    },
  };

  it("should handle initial state", () => {
    expect(workspaceReducer(undefined, { type: "unknown" })).toEqual({
      workspaceInfo: null,
    });
  });

  it("should handle setWorkspace", () => {
    const actual = workspaceReducer(
      initialNullState,
      setWorkspace({
        id: "01",
        name: "home-workspace",
        icon: "1F3C7",
        members: ["1"],
        pages: [
          {
            id: "2",
            reference: "notion-clone-project-2",
            path: null,
            icon: "1F575",
          },
        ],
      })
    );

    expect(actual.workspaceInfo?.id).toEqual("01");
  });

  it("should handle clear workspace", () => {
    const actual = workspaceReducer(initialLoadState, clearWorkspace());

    expect(actual.workspaceInfo).toBeNull();
  });

  it("should handle userLogout", () => {
    const removeItemMock = jest.fn();

    window.localStorage.removeItem = removeItemMock;

    const actual = workspaceReducer(initialLoadState, logout());

    expect(actual.workspaceInfo).toBeNull();
  });
});
