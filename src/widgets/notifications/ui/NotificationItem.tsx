import { Bell, BellRing } from "lucide-react";
import type { Notification } from "@/entities/notification";
import { formatDate } from "@/shared/lib";
import { Badge } from "@/shared/ui";

export type NotificationItemProps = {
  notification: Notification;
};

export function NotificationItem({ notification }: NotificationItemProps) {
  const isUnread = !notification.isRead;
  const Icon = isUnread ? BellRing : Bell;

  return (
    <article
      className={[
        "group relative flex gap-4 rounded-xl border p-4 transition-all",
        isUnread
          ? "border-sky-200 bg-sky-50/60 shadow-sm dark:border-sky-900/50 dark:bg-sky-950/20"
          : "border-(--border) bg-(--surface) hover:border-(--accent-border)/40 hover:bg-(--field)/40",
      ].join(" ")}
    >
      {isUnread ? (
        <span
          aria-hidden
          className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-sky-500"
        />
      ) : null}

      <div
        className={[
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          isUnread
            ? "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300"
            : "bg-(--field) text-(--muted)",
        ].join(" ")}
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-(--foreground)">
            {notification.title}
          </h3>
          {isUnread ? <Badge variant="info">Новое</Badge> : null}
        </div>

        <p className="mt-1.5 text-sm leading-relaxed text-(--foreground)/90">
          {notification.message}
        </p>

        <time
          dateTime={notification.createdAt}
          className="mt-3 inline-block text-xs text-(--muted)"
        >
          {formatDate(notification.createdAt)}
        </time>
      </div>
    </article>
  );
}
