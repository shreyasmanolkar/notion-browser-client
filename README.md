
# Notion-Clone Browser Client

The Notion-Clone Frontend is a TypeScript-based React application that complements the robust backend API. It offers a user interface and experience similar to the popular note-taking and collaboration application, Notion. This frontend is designed to work seamlessly with the [backend API](https://github.com/shreyasmanolkar/notion-api), handling user authentication and authorization, while providing a wide range of functionalities for creating, managing, and collaborating on various types of content, such as supercharged tables, multimedia, lists etc.

By adhering to best practices in frontend development, the Notion-Clone application employs TypeScript to ensure type safety and improve code quality. The React framework enables building interactive and responsive user interfaces, enhancing the overall user experience.  

## Detail Blog:
https://shreyasmanolkar.hashnode.dev/building-notion-clone-part-2-crafting-the-front-end-experience

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

![Screenshot 2023-07-22 163216](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/699733f5-d381-4255-a777-9f94db702eac)

![Screenshot 2023-07-22 163816](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/3c937df6-279a-48b2-97bd-5b76caf6bb5f)

![Screenshot 2023-07-22 163708](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/a3c05a32-8943-4443-ae4b-c0c50ea68712)


New Workspace:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/2beecc0e-c14d-4d1d-90fe-699a7ff47414

![Screenshot 2023-07-22 162343](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/5c023451-6641-48e6-9772-bccbac25a553)

![Screenshot 2023-07-22 162412](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/1fd0c26a-47dc-40a4-b0ff-f931995694e2)

Settings Panel:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/1a144902-18c9-449c-b8eb-f9a694d80c3d

![Screenshot 2023-07-22 165846](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/1464d29d-d318-4664-9a10-7f8d131b5784)

![Screenshot 2023-07-22 165859](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/54209a0a-7779-4e6e-a739-57d047ecfda1)

![Screenshot 2023-07-22 165912](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/bee220a3-db86-4586-88c7-13ee7dc45c50)

![Screenshot 2023-07-22 165931](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/b60b9317-c38b-49ae-a86b-e93654aeb5a8)

![Screenshot 2023-07-22 165947](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/e19ddf19-9ddc-44c8-984c-4a368aa481c1)

![Screenshot 2023-07-22 170006](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/5aef883d-4fa9-492f-83ca-3f37e2905174)

![Screenshot 2023-07-22 170057](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/faafc19e-3137-4764-b802-93ea6c54f3a3)


Favorites: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/241f5587-f6f4-435a-8228-69194e44039e

![Screenshot 2023-07-22 162008](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/9628a92c-051c-4bcc-8bdf-64a5f0555be6)

![Screenshot 2023-07-22 162115](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/ad94b146-e020-4456-afcd-2a246312fd83)


Custom Text Editor:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/a9a69e4c-baf4-490a-92e5-4d6ee26eca27

![Screenshot 2023-07-22 164004](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/7f98f6e6-5479-404f-9b96-c113a0649562)

![Screenshot 2023-07-22 164033](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/e736df71-571f-4e22-9144-d28497141623)

![Screenshot 2023-07-22 164150](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/5c8a0b3e-f490-4c1a-8a44-c4c3bfa0ef04)

![Screenshot 2023-07-22 164305](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/d8120929-3315-474b-8dc5-88fcd2f7da77)

![Screenshot 2023-07-22 164350](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/b3409472-df66-4c5b-90f3-1a17a3b93b6c)

![Screenshot 2023-07-22 164534](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/7193d239-cbd7-4051-b841-5268022f1714)

![Screenshot 2023-07-22 164556](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/b66e2ba5-16ff-46ff-b49b-9aa888fd0535)

![Screenshot 2023-07-22 165007](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/e95abbf0-0409-47a9-9aa1-2612d1cbfce0)

![Screenshot 2023-07-22 165033](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/2bfba6d4-beec-4880-860b-55487f99b3b0)

![Screenshot 2023-07-22 165110](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/fc167aea-0bd5-4829-a601-9b3844e60554)

![Screenshot 2023-07-22 165122](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/ffefc42d-67a2-4b27-8399-ad2458d10658)

![Screenshot 2023-07-22 165205](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/b7fcd1b8-9d13-40eb-9e0f-6795932d5b64)

![Screenshot 2023-07-22 165413](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/fbb0e5f9-1282-442a-acf0-b032a431060d)

Workspace Switch:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/4afcfd63-b8db-4ad8-aaf5-9377382cbba9

![Screenshot 2023-07-22 162642](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/5843c75a-4a6a-4245-a9ea-bad7b71de255)

![Screenshot 2023-07-22 162623](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/87b4e1e5-cc0c-49ef-8301-243e6a5fc08e)


New Page: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/8fa1ce4f-8acb-4480-866c-4966d71a5cfa

![Screenshot 2023-07-22 165537](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/cafe5cf6-534a-47f3-9264-e2778568ae7c)

![Screenshot 2023-07-22 165551](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/4b9eef70-d10d-46c1-bee2-d20d22d5c985)

![Screenshot 2023-07-22 165615](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/892afe68-69e7-4ee6-9d97-88a100973301)

![Screenshot 2023-07-22 165625](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/862925a9-b0ce-4ed3-a7ac-850f7dacd411)

Search: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/b9d242b6-dfb4-4154-b62d-6bc494c007d6

![Screenshot 2023-07-22 162828](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/e789983f-be35-4f4d-b278-d705649402b6)

![Screenshot 2023-07-22 163006](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/1af3ea6b-0374-4b4e-bb79-f2e1ee711034)

![Screenshot 2023-07-22 163016](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/36fb2e68-b815-4909-9a81-1e197c3f98a8)

unsplash API: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/bb4e929b-e957-4cec-b41b-80072edbdaf2

![Screenshot 2023-07-22 163816](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/0b7a43f0-cec4-4c26-83c2-d9500a659e28)

![Screenshot 2023-07-22 175504](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/c4942121-9171-4607-b9a6-467a5762013c)


Upload: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/0241b2fb-83de-43a8-bf19-adc38e89838a

Profile Picture:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/274e3a47-e2ad-4ff1-a898-7575d5ba1d5f

Theme: 

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/1fbd9e58-a9ef-46dd-aadf-0c42402f8e6c

![Screenshot 2023-07-22 172454](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/193aab74-f1e2-4abd-b4b9-c7c767eb902d)

![Screenshot 2023-07-22 172516](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/7125f320-1cfd-47d3-ac46-de014e2f10c2)

![Screenshot 2023-07-22 171820](https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/23db61c5-d350-4dfa-b87e-de72c5081ecb)


Responsive Design:

https://github.com/shreyasmanolkar/notion-browser-client/assets/80336980/4873010a-d362-4270-8692-93364f7fca39

## License

This project is under the MIT [license](https://github.com/shreyasmanolkar/notion-browser-client/blob/main/LICENSE)
. See the LICENSE for more information.
