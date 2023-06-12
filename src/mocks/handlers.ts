import { rest } from "msw";

export const handlers = [
  rest.get(`http://localhost:5000/v1/users/123`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          _id: "64811962d5cbcacf7249a724",
          name: "user-name",
          email: "user@email.com",
          password:
            "$2b$10$f4t.nlhnHY.GwVPQG3TX.e0/nv7hCCN40Vf61mMAvz90yb.JfmWiq",
          isDarkMode: true,
          profilePicture: {
            url: "sample-url",
          },
          workspaces: [
            {
              workspaceId: "64811962d5cbcacf7249a722",
              favorites: [],
            },
          ],
          createdAt: "2023-06-07T23:57:22.240+0000",
        },
      ])
    );
  }),
];
