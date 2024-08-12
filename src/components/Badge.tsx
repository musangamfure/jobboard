interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

export default function Badge({ className, children }: BadgeProps) {
  return (
    <span className="border rounded px-2 py-0.5 text-sm font-medium text-muted-foreground bg-muted">
      {children}
    </span>
  );
}
