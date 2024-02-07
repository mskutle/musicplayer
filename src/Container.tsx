export const Container = ({ children }: { children: React.ReactNode }) => (
  <div
    className="grow grid gap-2 p-2 h-full"
    style={{
      gridTemplateColumns: "minmax(12rem, 12rem) repeat(11, 1fr)",
      gridTemplateRows: "repeat(11, 1fr) 5rem",
    }}
  >
    {children}
  </div>
);
