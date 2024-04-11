export function Container({ children }: { children: React.ReactNode }) {
  return <div className="container max-w-[2000px] p-8">{children}</div>;
}