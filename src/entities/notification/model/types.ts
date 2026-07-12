import z from "zod";

export const NotificationSchema = z.object({
  id: z.uuid(),
  userId: z.uuid().optional(),
  title: z.string(),
  message: z.string(),
  payload: z.unknown().optional(),
  isRead: z.boolean(),
  createdAt: z.string(),
});

export const NotificationsResponseSchema = z.array(NotificationSchema);

export type Notification = z.infer<typeof NotificationSchema>;

export type NotificationsStore = {
  items: Notification[];
  isLoading: boolean;
  isInitialized: boolean;
  setNotifications: (items: Notification[]) => void;
  upsertNotification: (notification: Notification) => void;
  markAllRead: () => void;
  setLoading: (isLoading: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
};
