# Melony

Melony is a framework for backend developers to build internal tools without touching frontend code.

![melony](https://melony.dev/_next/static/media/code-preview.a510de6d.png)

Getting started with Melony is quick and easy. The fastest way to begin is by cloning our starter repository, which provides a pre-configured environment with all the necessary dependencies.

## Quick Start

1. Clone the Melony starter repository:

```bash
git clone https://github.com/melonydev/melony-starter.git
cd melony-starter
```

2. Install Dependencies

```bash
npm install
```

3. Run the Development Server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see your Melony application in action.

## Creating Your First View

Melony makes it incredibly easy to create views for your internal tools. Here's a simple example of how to define a view:

```ts
import { listView } from "melony";
import { listUsersAction } from "./actions/user";

export const usersListView = listView({
	action: listUsersAction,
});
```

This example creates a table component for users with filterable fields, header and item buttons, and navigation settings. The `listUsersAction` is a server action that fetches the user data.

With just this simple definition, Melony will generate a fully functional user interface for listing users, complete with filtering, pagination, and navigation to other views.

## Documentation

For detailed documentation, please visit our [Website](https://melony.dev).

## Contributing

We welcome contributions to make Melony even better! Please see our [Contributing Guide](link-to-contributing-guide) for more details.

## License

Melony is [MIT licensed](link-to-license).
