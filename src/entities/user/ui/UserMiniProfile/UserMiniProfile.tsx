import { Avatar, Skeleton } from "@/shared/ui";
import { UserType } from "../../model";

export type UserMiniProfileProps = {
  className?: string;
  user?: UserType | null;
};

export function UserMiniProfile({
  className = "",
  user,
}: UserMiniProfileProps) {
  if (!user) {
    return (
      <div className={`flex min-w-0 items-center gap-4 ${className}`}>
        <Skeleton className="h-10 w-10 rounded-full!" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <Avatar
        alt={user.email}
        fallbackLabel={user.email}
        size="md"
        src={user.picture || undefined}
      />
      <p className="truncate text-sm font-medium text-(--foreground)">
        {user.email}
      </p>
    </div>
  );
}
