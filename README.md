# Melony

## About

Melony is a powerful and flexible admin panel generator designed exclusively for Next.js applications. It empowers backend developers to create sophisticated, beautiful, and consistent internal tools without writing a single line of frontend code.

![melony](https://melony.dev/_next/static/media/screen_sm.1bd0bc98.jpg)

## Key Features

- **Next.js Optimized**: Built from the ground up for Next.js, utilizing its API routes and server-side rendering capabilities.
- **Zero Frontend Code**: Create full-fledged admin panels using only backend configurations.
- **Beautiful UI**: Crafted to make your internal tools visually appealing out of the box.
- **Consistent Design**: Ensures a uniform look and feel across all your admin interfaces.
- **Dynamic View Generation**: Easily create list, detail, and form views with simple configuration.
- **Flexible Context Handling**: Support for asynchronous context loading in views and tabs.
- **Customizable Components**: Extensible set of UI components that maintain design consistency.
- **Type-Safe**: Built with TypeScript for robust type checking and enhanced developer experience.
- **Responsive Design**: Mobile-friendly interface that adapts to various screen sizes.
- **Role-Based Access Control**: Built-in support for managing user permissions.

## Our Goal

At Melony, our mission is to revolutionize the creation of internal tools for Next.js applications. We believe that backend developers should be able to create beautiful, consistent, and functional admin interfaces without the need to dive into frontend code. Our goal is to make the process of building internal tools as efficient and enjoyable as possible, while ensuring that the end result is visually appealing and user-friendly.

## Quick Start

1. Install Melony in your Next.js project:

   ```
   npm install melony
   ```

2. Define your views in your Next.js API routes:

   ```typescript
   // pages/api/admin/views/projects.ts
   import { View } from "melony/config";
   import { listProjectsAction } from "../actions/projects";
   import { projectFields } from "../fields/projects";

   export const projectsListView: View = {
   	type: "list",
   	title: "Projects",
   	fields: projectFields,
   	action: listProjectsAction,
   	headerButtons: [{ label: "Create Project", viewId: "projectCreateView" }],
   	itemButtons: [{ label: "Edit", viewId: "projectEditView" }],
   	onItemClick: { viewId: "projectDetailedView" },
   	showInNavigation: true,
   };

   export default projectsListView;
   ```

3. Set up your admin panel in a Next.js page:

   ```typescript
   // pages/admin/[[...path]].tsx
   import { MelonyProvider, AdminPanel } from 'melony';
   import projectsListView from '../api/admin/views/projects';

   const AdminPage = () => (
     <MelonyProvider views={[projectsListView]}>
       <AdminPanel />
     </MelonyProvider>
   );

   export default AdminPage;
   ```

And that's it! Your beautiful, consistent admin panel is now ready to use, without writing a single line of frontend code.

## Documentation

For detailed documentation, please visit our [Wiki](link-to-your-wiki).

## Examples

Check out our [examples directory](link-to-examples) for more sample configurations and usage scenarios.

## Contributing

We welcome contributions to make Melony even better! Please see our [Contributing Guide](link-to-contributing-guide) for more details.

## License

Melony is [MIT licensed](link-to-license).
