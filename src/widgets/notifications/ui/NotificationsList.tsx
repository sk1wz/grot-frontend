"use client";

import { BellOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getNotifications,
  makeReadAllNotifications,
  useNotificationsStore,
} from "@/entities/notification";
import { Pagination, Skeleton, Text } from "@/shared/ui";
import { NotificationItem } from "./NotificationItem";

const ITEMS_PER_PAGE = 5;

function NotificationsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-4 rounded-xl border border-(--border) bg-(--surface) p-4"
        >
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="mt-2 h-4 w-full max-w-xl" />
            <Skeleton className="mt-3 h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

function NotificationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-(--border) bg-(--field)/30 px-6 py-14 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-(--field) text-(--muted)">
        <BellOff className="size-6" />
      </div>
      <div className="flex flex-col gap-1">
        <Text className="text-sm font-medium text-(--foreground)">
          Уведомлений пока нет
        </Text>
        <Text className="max-w-sm text-sm text-(--muted)">
          Здесь будут появляться события по балансу, проверкам и другим
          операциям в аккаунте
        </Text>
      </div>
    </div>
  );
}

export function NotificationsList() {
  const items = useNotificationsStore((state) => state.items);
  const isLoading = useNotificationsStore((state) => state.isLoading);
  const isInitialized = useNotificationsStore((state) => state.isInitialized);
  const showSkeleton = !isInitialized || (isLoading && items.length === 0);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [items, safeCurrentPage]);

  useEffect(() => {
    const loadNotifications = async () => {
      const notifications = await getNotifications();
      if (!notifications) {
        return;
      }

      const hasUnread = notifications.some((item) => !item.isRead);
      if (hasUnread) {
        await makeReadAllNotifications();
      }

      useNotificationsStore
        .getState()
        .setNotifications(
          hasUnread
            ? notifications.map((item) => ({ ...item, isRead: true }))
            : notifications
        );
    };

    void loadNotifications();
  }, []);

  return (
    <section className="flex h-full w-full flex-col gap-4">
      <div className="border border-(--border) bg-(--surface) p-4">
        <div className="flex flex-col gap-4">
          {showSkeleton ? (
            <NotificationsSkeleton />
          ) : !items.length ? (
            <NotificationsEmptyState />
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedItems.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}

          {!showSkeleton && items.length > 0 ? (
            <Pagination
              total={totalItems}
              limit={ITEMS_PER_PAGE}
              page={safeCurrentPage}
              onPageChange={setCurrentPage}
              summaryText="Всего уведомлений"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
