import { useQueryContext } from "./query-provider";

export const QueryConsumer = ({
  render,
}: {
  render: (query: any) => React.ReactNode;
}) => {
  const query = useQueryContext();

  return <>{render(query)}</>;
};
