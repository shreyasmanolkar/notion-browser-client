import userReducer, { setUser, logout } from "../userSlice";

describe("user reducer", () => {
  const initialNullState = {
    userInfo: null,
  };

  const initialLoadState = {
    userInfo: {
      id: "1",
      name: "john doe",
      email: "johnDoe@gmail.com",
      isDarkMode: true,
      profilePicture: {
        url: "http://sample-profile-picture",
      },
      workspaces: [
        {
          workspaceId: "01",
          favorites: [],
        },
      ],
    },
  };

  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual({
      userInfo: null,
    });
  });

  it("should handle setUser", () => {
    const actual = userReducer(
      initialNullState,
      setUser({
        id: "1",
        name: "john doe",
        email: "johnDoe@gmail.com",
        isDarkMode: true,
        profilePicture: {
          url: "http://sample-profile-picture",
        },
        workspaces: [
          {
            workspaceId: "01",
            favorites: [],
          },
        ],
      })
    );

    expect(actual.userInfo?.id).toEqual("1");
  });

  it("should handle logout", () => {
    const actual = userReducer(initialLoadState, logout());

    expect(actual.userInfo).toBeNull();
  });
});
