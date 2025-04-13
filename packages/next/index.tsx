import {
  MelonyProvider,
  Widget,
  WidgetProps,
  RootLayout,
  SidebarItem,
  DataTableProps,
  DataTable,
  Stack,
  NavigationButton,
  Query,
} from "@melony/ui";

// root layout is for <html> and <body> in next
export function rootLayout({ appName }: { appName: string }) {
  return function Layout({ children }: { children: React.ReactNode }) {
    return (
      <RootLayout>
        <MelonyProvider appName={appName}>{children}</MelonyProvider>
      </RootLayout>
    );
  };
}

// layouts are some kind of wrapper components which have a children prop
export function sidebarLayout(config: { sidebarItems: SidebarItem[] }) {
  return function Layout({ children }: { children: React.ReactNode }) {
    return (
      <Stack className="w-full h-screen">
        <Stack direction="row" className="w-full h-12 border-b p-2">
          <NavigationButton label="Test" href="/" />
        </Stack>
        <Stack direction="row" className="w-full flex-1">
          <Stack direction="column" className="flex-1 p-2">
            {children}
          </Stack>
        </Stack>
      </Stack>
    );
  };
}

// in next, page is equivalent to widget
export function widget(config: WidgetProps) {
  return function Page() {
    return <Widget {...config} />;
  };
}

export function dataTableWidget(config: DataTableProps, query: QueryAction) {
  return async function DataTablePage() {
    return <Query query={query} Component={DataTable} />;
  };
}

type QueryAction = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => Promise<any>;

export function createQueryAction({ handler }: { handler: QueryAction }) {
  return handler;
}
