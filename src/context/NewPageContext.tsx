import { createContext, useState } from "react";

export const NewPageContext = createContext<any>({
  coverPicture: {
    url: "",
    verticalPosition: 0,
  },
  content: {
    type: "doc",
    content: [
      {
        type: "dBlock",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
      {
        type: "dBlock",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
    ],
  },
  pageSettings: {
    font: "san-serif",
    smallText: false,
    fullWidth: true,
    lock: false,
  },
});

export const NewPageContextProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [coverPicture, setCoverPicture] = useState({
    url: "",
    verticalPosition: 0,
  });
  const [content, setContent] = useState({
    type: "doc",
    content: [
      {
        type: "dBlock",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
    ],
  });
  const [pageSettings, setPageSettings] = useState({
    font: "san-serif",
    smallText: false,
    fullWidth: true,
    lock: false,
  });

  return (
    <NewPageContext.Provider
      value={{
        coverPicture,
        setCoverPicture,
        content,
        setContent,
        pageSettings,
        setPageSettings,
      }}
    >
      {children}
    </NewPageContext.Provider>
  );
};
