import { useMutationContext } from "./mutation-provider";

export const MutationConsumer = ({
  render,
}: {
  render: (mutation: any) => React.ReactNode;
}) => {
  const mutation = useMutationContext();

  return <>{render(mutation)}</>;
};
