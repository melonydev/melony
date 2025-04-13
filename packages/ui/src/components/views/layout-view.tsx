interface LayoutViewProps {
  children: React.ReactNode;
}

export const LayoutView = ({ children }: LayoutViewProps) => {
  return <div className="flex flex-col h-screen p-2">{children}</div>;
};
