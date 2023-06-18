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
  rest.get(
    `http://localhost:5000/v1/workspaces/:workspaceId`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            _id: "64811962d5cbcacf7249a722",
            name: "home-workspace",
            icon: "1F3C7",
            members: ["6484948671881548f7c268bb"],
            pages: [
              {
                id: "6482b59a7b2a3394719a72f0",
                reference:
                  "notion-clone-project-fb73ff5a35052ac8e7db7555f9293188f541afddd4cc2ff02dc8b5b937bb5980",
                path: null,
                icon: "1F575",
              },
            ],
            createdAt: "2023-06-09T05:16:10.450+0000",
          },
        ])
      );
    }
  ),
  rest.post(`http://localhost:5000/v1/workspaces`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        workspaceId: "64811962d5cbcacf7249a722",
      })
    );
  }),
];
