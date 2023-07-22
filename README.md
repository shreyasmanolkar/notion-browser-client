
# Notion-Clone Browser Client

The Notion-Clone Frontend is a TypeScript-based React application that complements the robust backend API. It offers a user interface and experience similar to the popular note-taking and collaboration application, Notion. This frontend is designed to work seamlessly with the [backend API](https://github.com/shreyasmanolkar/notion-api), handling user authentication and authorization, while providing a wide range of functionalities for creating, managing, and collaborating on various types of content, such as supercharged tables, multimedia, lists etc.

By adhering to best practices in frontend development, the Notion-Clone application employs TypeScript to ensure type safety and improve code quality. The React framework enables building interactive and responsive user interfaces, enhancing the overall user experience.  
## Features

- User Authentication: Secure user registration and login processes with hashed passwords and token-based authentication.
- Authentication using HTTP only cookies.
- Content Creation and Management: Create, update, and delete various content types, including notes, lists, media, superchared tables, task lists etc.
- Collaboration: Enable users to collaborate on shared content, providing granular access control and permissions.
- Rich Text Support: Allow users to create and edit content with rich text formatting options.
- Security: Ensure data security and privacy with robust authentication and authorization mechanisms.
- upload images for profile picture, cover photo and in text editor.
- slash menu
- bubble menu
- light / dark mode
- unsplash api integration
## Notion Like Text Editor

This repository hosts a custom text editor that draws inspiration from Notion's rich editing capabilities. The editor enables users to effortlessly create and organize diverse types of content, such as paragraphs, headings, lists, tables, images, videos, toggles, and more, with an intuitive drag-and-drop functionality.

### ProseMirror Library:

The heart of this text editor is powered by ProseMirror, a collection of open-source JavaScript libraries specifically designed for handling rich text editing within web browsers. ProseMirror abstracts away browser inconsistencies, particularly those related to the contenteditable attribute, which browsers rely on for text editing. This ensures a consistent and smooth editing experience across various browsers, even in modern ones like Google Chrome.

ProseMirror provides a set of straightforward primitives to work with, including:

#### Document: 
Represented by a node, the main document contains one or more children, each of which can have their own children and attributes.

#### Selection:
Represented by a selection class, it handles interpreting input events like paste, key presses, and selections consistently across different browsers.

#### Transforms and Transactions: 
Represent changes to the document, making it easy to apply and track modifications.

The library introduces a node-based approach to represent various elements, such as paragraphs, headings, images, and more. These elements can have associated features like sizes, placeholders, and draggability. For instance, paragraph nodes contain a flat sequence of inline elements, each with its own set of styles. This allows ProseMirror to track each node's position based on character offsets, making it easy to select, find, and work with specific elements.

### Tiptap Extension:

To simplify the usage of ProseMirror and accelerate development, our text editor leverages Tiptap, an extension framework built on top of ProseMirror. Tiptap provides a high-level abstraction that streamlines common editor tasks, such as managing the editor's state, handling commands, and rendering content in the DOM.

By combining ProseMirror with Tiptap, we enhance the text editor's usability and development experience. Tiptap offers a wealth of pre-built features and extensions that make it straightforward to incorporate modern functionalities like multimedia support, tables, to-do lists, and markdown formatting.

With Tiptap's intuitive interface and seamless integration with ProseMirror, it was efficient to focus on building a robust and user-friendly text editor while minimizing the complexities of working directly with the underlying ProseMirror library.

this Notion-like text editor is, powered by the ProseMirror library and enriched with the simplicity and power of Tiptap extensions. Experience a seamless and feature-rich text editing experience that takes inspiration from Notion's innovative content organization and collaboration capabilities.
## Run Locally

Clone the project

```bash
  git clone git@github.com:shreyasmanolkar/notion-browser-client.git
```

Go to the project directory

```bash
  cd notion-borwser-client
```

Install dependencies

```bash
  npm install
```
Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

To run test coverage report, run the following command

```bash
  npm run coverage
```

### Demo

Cover Photo:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/bb58e0ca-18c5-49e2-9d2d-3a6c17faee0f
 
New Workspace:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/2beecc0e-c14d-4d1d-90fe-699a7ff47414

Settings Panel:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/1a144902-18c9-449c-b8eb-f9a694d80c3d

Favorites: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/241f5587-f6f4-435a-8228-69194e44039e

Custom Text Editor:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/a9a69e4c-baf4-490a-92e5-4d6ee26eca27

Workspace Switch:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/4afcfd63-b8db-4ad8-aaf5-9377382cbba9

New Page: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/8fa1ce4f-8acb-4480-866c-4966d71a5cfa

Search: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/b9d242b6-dfb4-4154-b62d-6bc494c007d6

unsplash API: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/bb4e929b-e957-4cec-b41b-80072edbdaf2

Upload: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/0241b2fb-83de-43a8-bf19-adc38e89838a

Profile Picture:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/274e3a47-e2ad-4ff1-a898-7575d5ba1d5f

Theme: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/1fbd9e58-a9ef-46dd-aadf-0c42402f8e6c

Responsive Design:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/4873010a-d362-4270-8692-93364f7fca39

## License

This project is under the MIT [license](https://github.com/shreyasmanolkar/notion-browser-client/blob/main/LICENSE)
. See the LICENSE for more information.
