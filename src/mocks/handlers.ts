import { rest } from "msw";

export const handlers = [
  rest.post(`http://localhost:5000/v1/register`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDg0OTQ4NjcxODgxNTQ4ZjdjMjY4YmIiLCJpYXQiOjE2ODY0MTAzNzR9.mZqq00B_xOxEusFzDksuLbr5MPVUaqEw7T1hD--BZ2E",
      })
    );
  }),
  rest.post(`http://localhost:5000/v1/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDg0OTQ4NjcxODgxNTQ4ZjdjMjY4YmIiLCJpYXQiOjE2ODY0MTAzNzR9.mZqq00B_xOxEusFzDksuLbr5MPVUaqEw7T1hD--BZ2E",
      })
    );
  }),
  rest.get(`http://localhost:5000/v1/users/:userId`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          _id: "6484948671881548f7c268bb",
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
