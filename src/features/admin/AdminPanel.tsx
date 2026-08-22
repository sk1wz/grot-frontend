"use client";

import Image from "next/image";
import { CreditCard, FileText, ReceiptText, ShieldCheck, Trash2, Users, WalletCards, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  BalanceTransactionStatus,
  BalanceTransactionStatusLabel,
  type BalanceTransactionType,
} from "@/entities/balance";
import { type UserType, UserRole } from "@/entities/user";
import {
  CheckModule,
  CheckModuleLabel,
  type BatchCheck,
  type Check,
} from "@/entities/check";
import { formatAmount, formatDate } from "@/shared/lib";
import {
  DashboardPageFrame,
  CopyText,
  MultiSelectField,
  Pagination,
  SearchField,
  SmartTable,
  Tabs,
  type TableColumn,
} from "@/shared/ui";
import { toast } from "react-toastify";
import { transactionColumns } from "@/widgets/deposit-history/lib/transaction-columns";
import { checkColumns } from "@/widgets/checks-history/lib/check-history-column";
import {
  changeAdminBalance,
  deleteAdminUser,
  getAdminUsers,
  getAdminUserTransactions,
  getAdminUserChecks,
  getAdminUserBatchChecks,
  deleteAdminFeedback,
  FeedbackStatus,
  getAdminFeedback,
  getAdminFeedbackAttachmentUrl,
  type FeedbackRequest,
  updateAdminFeedbackStatus,
} from "./api";

const PAGE_SIZE_OPTIONS = [10, 25, 50];
const feedbackStatusOptions: { value: FeedbackStatus; label: string; className: string }[] = [
  { value: FeedbackStatus.NEW, label: "Новые", className: "bg-[#e7f0ff] text-[#416a9f]" },
  { value: FeedbackStatus.IN_REVIEW, label: "В работе", className: "bg-[#fff1d8] text-[#9a6824]" },
  { value: FeedbackStatus.COMPLETED, label: "Завершённые", className: "bg-[#e1f3e8] text-[#347254]" },
  { value: FeedbackStatus.REJECTED, label: "Отклонённые", className: "bg-[#fbe6e6] text-[#a34d4d]" },
  { value: FeedbackStatus.ARCHIVED, label: "В архиве", className: "bg-[#edeaf3] text-[#6d5d83]" },
];
const transactionStatusOptions = Object.values(BalanceTransactionStatus).map(
  (status) => ({
    value: status,
    label: BalanceTransactionStatusLabel[status],
  })
);

const moduleIcons: Record<CheckModule, string> = {
  [CheckModule.GIBDD]: "/images/tariff-icons/Icongibdd.svg",
  [CheckModule.GISTORGI]: "/images/tariff-icons/Icontorgi.svg",
  [CheckModule.LIMITATION]: "/images/tariff-icons/Iconlocks.svg",
  [CheckModule.FSSP]: "/images/tariff-icons/Iconfssp.svg",
  [CheckModule.BANKRUPTCY]: "/images/tariff-icons/Iconbankcrupcy.svg",
  [CheckModule.INN]: "/images/tariff-icons/Iconinn.svg",
  [CheckModule.TAXI]: "/images/tariff-icons/Icontaxi.svg",
};

const moduleOptions = Object.values(CheckModule).map((module) => ({
  value: module,
  label: CheckModuleLabel[module],
  icon: (
    <Image
      src={moduleIcons[module]}
      width={24}
      height={24}
      alt=""
      className="size-6 shrink-0"
    />
  ),
}));

export function AdminPanel() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [balanceUser, setBalanceUser] = useState<UserType | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);
  const [transactionsUser, setTransactionsUser] = useState<UserType | null>(
    null
  );
  const [transactions, setTransactions] = useState<BalanceTransactionType[]>(
    []
  );
  const [checksUser, setChecksUser] = useState<UserType | null>(null);
  const [checks, setChecks] = useState<Check[]>([]);
  const [batchChecks, setBatchChecks] = useState<BatchCheck[]>([]);
  const [feedback, setFeedback] = useState<FeedbackRequest[]>([]);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(true);
  const [feedbackQuery, setFeedbackQuery] = useState("");
  const [feedbackStatuses, setFeedbackStatuses] = useState<FeedbackStatus[]>([]);
  const [feedbackPage, setFeedbackPage] = useState(1);
  const [checksView, setChecksView] = useState<"single" | "batch">("single");
  const [amount, setAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [transactionSearchQuery, setTransactionSearchQuery] = useState("");
  const [transactionStatusFilter, setTransactionStatusFilter] = useState<
    BalanceTransactionStatus[]
  >([]);
  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(50);
  const [checkSearchQuery, setCheckSearchQuery] = useState("");
  const [checkModuleFilter, setCheckModuleFilter] = useState<CheckModule[]>([]);
  const [checkPage, setCheckPage] = useState(1);
  const [checksPerPage, setChecksPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  const [isChecksLoading, setIsChecksLoading] = useState(false);
  const [totalChecks, setTotalChecks] = useState<number | null>(null);
  const [moduleUsage, setModuleUsage] = useState<Record<CheckModule, number>>(
    () => Object.fromEntries(Object.values(CheckModule).map((module) => [module, 0])) as Record<CheckModule, number>,
  );

  async function loadUsers() {
    setIsLoading(true);
    try {
      const items = await getAdminUsers();
      setUsers(items);
      void Promise.all(items.map(async (user) => {
        const [single, batch] = await Promise.all([
          getAdminUserChecks(user.id),
          getAdminUserBatchChecks(user.id),
        ]);
        return [...single, ...batch];
      }))
        .then((groups) => {
          const allChecks = groups.flat();
          setTotalChecks(allChecks.length);
          setModuleUsage(allChecks.reduce((usage, check) => {
            usage[check.module] += 1;
            return usage;
          }, Object.fromEntries(Object.values(CheckModule).map((module) => [module, 0])) as Record<CheckModule, number>));
        })
        .catch(() => setTotalChecks(null));
      setBalanceUser((current) =>
        current ? items.find((user) => user.id === current.id) ?? null : null
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Не удалось загрузить пользователей"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadUsers();
  }, []);

  useEffect(() => {
    void getAdminFeedback()
      .then(setFeedback)
      .catch(() => toast.error("Не удалось загрузить обращения"))
      .finally(() => setIsFeedbackLoading(false));
  }, []);

  async function changeFeedbackStatus(id: string, status: FeedbackStatus) {
    try {
      const updated = await updateAdminFeedbackStatus(id, status);
      setFeedback((items) => items.map((item) => item.id === id ? updated as FeedbackRequest : item));
    } catch { toast.error("Не удалось обновить статус обращения"); }
  }
  async function removeFeedback(id: string) {
    try {
      await deleteAdminFeedback(id);
      setFeedback((items) => items.filter((item) => item.id !== id));
    } catch { toast.error("Не удалось удалить обращение"); }
  }

  function closeBalanceModal() {
    if (isSaving) return;
    setBalanceUser(null);
    setAmount("");
  }

  async function openTransactions(user: UserType) {
    setTransactionsUser(user);
    setTransactions([]);
    setTransactionSearchQuery("");
    setTransactionStatusFilter([]);
    setTransactionPage(1);
    setIsTransactionsLoading(true);
    try {
      const result = await getAdminUserTransactions(user.id);
      setTransactions(result.items);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Не удалось загрузить транзакции"
      );
    } finally {
      setIsTransactionsLoading(false);
    }
  }

  async function openChecks(user: UserType) {
    setChecksUser(user);
    setChecks([]);
    setBatchChecks([]);
    setChecksView("single");
    setCheckSearchQuery("");
    setCheckModuleFilter([]);
    setCheckPage(1);
    setIsChecksLoading(true);
    try {
      const [singleChecks, batches] = await Promise.all([
        getAdminUserChecks(user.id),
        getAdminUserBatchChecks(user.id),
      ]);
      setChecks(singleChecks);
      setBatchChecks(batches);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Не удалось загрузить проверки"
      );
    } finally {
      setIsChecksLoading(false);
    }
  }

  async function updateBalance(operation: "credit" | "debit") {
    if (!balanceUser) return;
    const numericAmount = Number(amount.replace(",", "."));
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      toast.error("Введите сумму больше нуля");
      return;
    }

    setIsSaving(true);
    try {
      await changeAdminBalance(operation, balanceUser.id, numericAmount);
      toast.success(
        operation === "credit" ? "Баланс начислен" : "Средства списаны"
      );
      setBalanceUser(null);
      setAmount("");
      await loadUsers();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Не удалось изменить баланс"
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteUser() {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      await deleteAdminUser(userToDelete.id);
      setUserToDelete(null);
      toast.success("Пользователь удалён");
      await loadUsers();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Не удалось удалить пользователя"
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return users.filter(
      (user) =>
        user.id.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);
  const userStats = useMemo(
    () => ({
      total: users.length,
      regular: users.filter((user) => user.role === UserRole.REGULAR).length,
      admins: users.filter((user) => user.role === UserRole.ADMIN).length,
      balance: users.reduce((sum, user) => sum + user.balance, 0),
    }),
    [users],
  );
  const popularModules = useMemo(
    () => Object.entries(moduleUsage)
      .sort(([, left], [, right]) => right - left)
      .filter(([, count]) => count > 0)
      .map(([module, count]) => ({ module: module as CheckModule, count })),
    [moduleUsage],
  );
  const filteredFeedback = useMemo(() => {
    const query = feedbackQuery.trim().toLowerCase();
    return feedback.filter((item) =>
      (!query || [item.name, item.companyName, item.email, item.phone, item.message]
        .some((value) => value.toLowerCase().includes(query))) &&
      (feedbackStatuses.length === 0 || feedbackStatuses.includes(item.status)),
    );
  }, [feedback, feedbackQuery, feedbackStatuses]);
  const feedbackPerPage = 10;
  const feedbackTotalPages = Math.ceil(filteredFeedback.length / feedbackPerPage);
  const safeFeedbackPage = feedbackTotalPages
    ? Math.min(feedbackPage, feedbackTotalPages)
    : 1;
  const paginatedFeedback = useMemo(() => {
    const start = (safeFeedbackPage - 1) * feedbackPerPage;
    return filteredFeedback.slice(start, start + feedbackPerPage);
  }, [filteredFeedback, safeFeedbackPage]);
  const feedbackStatusMeta = (status: FeedbackStatus) =>
    feedbackStatusOptions.find((option) => option.value === status) ?? feedbackStatusOptions[0];
  const toggleFeedbackStatus = (status: FeedbackStatus) => {
    setFeedbackPage(1);
    setFeedbackStatuses((current) =>
      current.includes(status)
        ? current.filter((value) => value !== status)
        : [...current, status],
    );
  };
  const renderFeedbackCard = (item: FeedbackRequest) => {
    const status = feedbackStatusMeta(item.status);
    return (
      <article key={item.id} className="rounded-[24px] border border-[#eef0f3] bg-white p-5 shadow-[0_12px_32px_rgba(90,111,130,0.1)]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-(--foreground)">Имя: {item.name}</p>
            <p className="mt-1 text-sm text-[#718096]">{formatDate(item.createdAt)}</p>
          </div>
          <select value={item.status} onChange={(event) => void changeFeedbackStatus(item.id, event.target.value as FeedbackStatus)} className={`shrink-0 cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold ${status.className}`} aria-label="Статус обращения">
            {feedbackStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div className="mt-4 grid gap-2 text-sm text-[#526173] sm:grid-cols-2">
          <p><span className="font-semibold text-(--foreground)">Компания:</span> {item.companyName}</p>
          <p><span className="font-semibold text-(--foreground)">Телефон:</span> <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a></p>
          <p className="min-w-0 truncate"><span className="font-semibold text-(--foreground)">Почта:</span> <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a></p>
          <p><span className="font-semibold text-(--foreground)">Документ:</span> {item.attachment ? <a href={getAdminFeedbackAttachmentUrl(item.id)} className="font-medium text-[#4f6f9c] hover:underline">{item.attachment.name}</a> : "не прикреплён"}</p>
        </div>
        <p className="mt-4 whitespace-pre-wrap rounded-2xl bg-(--surface) px-4 py-3 text-sm leading-6 text-[#4a5568]">{item.message}</p>
        <div className="mt-4 flex justify-end"><button type="button" onClick={() => void removeFeedback(item.id)} className="text-xs font-semibold text-[#b14b4b] hover:underline">Удалить обращение</button></div>
      </article>
    );
  };
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const safeCurrentPage = totalPages ? Math.min(currentPage, totalPages) : 1;
  const paginatedUsers = useMemo(() => {
    const start = (safeCurrentPage - 1) * usersPerPage;
    return filteredUsers.slice(start, start + usersPerPage);
  }, [filteredUsers, safeCurrentPage, usersPerPage]);
  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        (transaction) =>
          transaction.id
            .toLowerCase()
            .includes(transactionSearchQuery.toLowerCase()) &&
          (transactionStatusFilter.length === 0 ||
            transactionStatusFilter.includes(transaction.status))
      ),
    [transactions, transactionSearchQuery, transactionStatusFilter]
  );
  const transactionTotalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );
  const safeTransactionPage = transactionTotalPages
    ? Math.min(transactionPage, transactionTotalPages)
    : 1;
  const paginatedTransactions = useMemo(() => {
    const start = (safeTransactionPage - 1) * transactionsPerPage;
    return filteredTransactions.slice(start, start + transactionsPerPage);
  }, [filteredTransactions, safeTransactionPage, transactionsPerPage]);
  const filteredChecks = useMemo(
    () =>
      (checksView === "single" ? checks : batchChecks).filter(
        (check) =>
          (check.id.toLowerCase().includes(checkSearchQuery.toLowerCase()) ||
            check.subjectBodyText
              .toLowerCase()
              .includes(checkSearchQuery.toLowerCase())) &&
          (checkModuleFilter.length === 0 ||
            checkModuleFilter.includes(check.module))
      ),
    [batchChecks, checks, checkSearchQuery, checkModuleFilter, checksView]
  );
  const checkTotalPages = Math.ceil(filteredChecks.length / checksPerPage);
  const safeCheckPage = checkTotalPages
    ? Math.min(checkPage, checkTotalPages)
    : 1;
  const paginatedChecks = useMemo(() => {
    const start = (safeCheckPage - 1) * checksPerPage;
    return filteredChecks.slice(start, start + checksPerPage);
  }, [filteredChecks, safeCheckPage, checksPerPage]);

  const userColumns: TableColumn<UserType>[] = [
    {
      key: "email",
      title: "Почта",
      width: "15%",
      render: (user) => user.email,
    },
    {
      key: "id",
      title: "ID",
      width: "25%",
      className: "truncate font-mono text-xs",
      render: (user) => (
        <CopyText
          value={user.id}
          title="Скопировать ID пользователя"
          className="max-w-full text-xs text-(--foreground)"
        >
          {user.id}
        </CopyText>
      ),
    },
    {
      key: "balance",
      title: "Баланс",
      width: "15%",
      className: "font-semibold whitespace-nowrap",
      render: (user) => formatAmount(user.balance),
    },
    {
      key: "createdAt",
      title: "Дата регистрации",
      width: "18%",
      render: (user) => formatDate(user.createdAt),
    },
    {
      key: "actions",
      title: "Действия",
      width: "35%",
      className: "whitespace-nowrap",
      render: (user) => (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setBalanceUser(user)}
            className="rounded-[12px] cursor-pointer bg-[#c8ddd5] px-3 py-2 text-xs font-bold"
          >
            Баланс
          </button>
          <button
            type="button"
            onClick={() => void openTransactions(user)}
            className="rounded-[12px] cursor-pointer bg-[#dce7f2] px-3 py-2 text-xs font-bold"
          >
            Транзакции
          </button>
          <button
            type="button"
            onClick={() => void openChecks(user)}
            className="rounded-[12px] cursor-pointer bg-[#eee4d4] px-3 py-2 text-xs font-bold"
          >
            Проверки
          </button>
          <button
            type="button"
            onClick={() => setUserToDelete(user)}
            className="rounded-[12px] cursor-pointer bg-[#f6d4d4] px-3 py-2 text-xs font-bold"
          >
            Удалить
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardPageFrame
      figureSrc="/images/about-figure.png"
      wrapperClassName="relative min-h-full overflow-hidden"
      className="relative min-h-full bg-(--surface) p-4 text-(--foreground) md:p-8"
    >
      <div className="rounded-[28px] border border-white/90 bg-white p-5 shadow-[0_18px_45px_rgba(90,111,130,0.12)] md:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a8797]">Управление платформой</p>
        <h1 className="mt-2 text-2xl font-medium md:text-[32px]">Админ-панель</h1>
      </div>
      <section className="mt-5 space-y-6">
        <h2 className="text-xl font-medium">Статистика</h2>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#718096]">Пользователи</h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="relative overflow-hidden rounded-[26px] bg-white p-5 shadow-[0_15px_35px_rgba(90,111,130,0.12)]"><Users className="absolute -right-2 -top-2 size-20 text-white/45" /><p className="text-sm font-medium text-[#617087]">Всего пользователей</p><p className="mt-3 text-3xl font-semibold text-[#334155]">{userStats.total}</p><p className="mt-2 text-xs text-[#718096]">На платформе</p></article>
        <article className="relative overflow-hidden rounded-[26px] bg-white p-5 shadow-[0_15px_35px_rgba(90,111,130,0.12)]"><Users className="absolute -right-2 -top-2 size-20 text-white/50" /><p className="text-sm font-medium text-[#567263]">Обычные пользователи</p><p className="mt-3 text-3xl font-semibold text-[#305843]">{userStats.regular}</p><p className="mt-2 text-xs text-[#668574]">Аккаунты клиентов</p></article>
        <article className="relative overflow-hidden rounded-[26px] bg-white p-5 shadow-[0_15px_35px_rgba(90,111,130,0.12)]"><ShieldCheck className="absolute -right-2 -top-2 size-20 text-white/55" /><p className="text-sm font-medium text-[#826a49]">Администраторы</p><p className="mt-3 text-3xl font-semibold text-[#685234]">{userStats.admins}</p><p className="mt-2 text-xs text-[#927959]">Доступ к управлению</p></article>
        <article className="relative overflow-hidden rounded-[26px] bg-white p-5 shadow-[0_15px_35px_rgba(90,111,130,0.12)]"><WalletCards className="absolute -right-2 -top-2 size-20 text-white/55" /><p className="text-sm font-medium text-[#756188]">Суммарный баланс</p><p className="mt-3 text-3xl font-semibold text-[#56456a]">{formatAmount(userStats.balance)}</p><p className="mt-2 text-xs text-[#82708f]">По всем аккаунтам</p></article>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#718096]">Проверки</h3>
          <div className="grid gap-3 sm:grid-cols-2">
        <article className="relative overflow-hidden rounded-[26px] bg-white p-5 shadow-[0_15px_35px_rgba(90,111,130,0.12)]"><FileText className="absolute -right-2 -top-2 size-20 text-white/55" /><p className="text-sm font-medium text-[#52757a]">Всего проверок</p><p className="mt-3 text-3xl font-semibold text-[#38585d]">{totalChecks ?? "—"}</p><p className="mt-2 text-xs text-[#66858a]">Одиночные и пакетные</p></article>
        <article className="rounded-[26px] bg-white p-5 shadow-[0_15px_35px_rgba(90,111,130,0.12)]"><p className="text-sm font-medium text-[#52757a]">По модулям</p><div className="mt-3 flex flex-wrap gap-2">{popularModules.length ? popularModules.map(({ module, count }) => <span key={module} className="rounded-full bg-(--surface) px-3 py-1 text-xs font-semibold text-[#38585d]">{CheckModuleLabel[module]} · {count}</span>) : <span className="text-sm text-[#718096]">Нет данных</span>}</div></article>
          </div>
        </div>
      </section>
      <section className="mt-8 rounded-[28px] border border-white/80 bg-white/70 p-4 shadow-[0_18px_45px_rgba(90,111,130,0.1)] backdrop-blur md:p-6">
        <h2 className="text-xl font-medium">Пользователи</h2>
        <div className="mt-4 w-full max-w-100">
          <SearchField
            id="admin-user-search"
            label="Поиск по ID или email"
            placeholder="Введите ID или email"
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <div className="rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(90,111,130,0.1)]">Загрузка пользователей…</div>
          ) : paginatedUsers.length ? (
            paginatedUsers.map((user) => (
              <article key={user.id} className="rounded-[24px] border border-white bg-white p-4 shadow-[0_12px_32px_rgba(90,111,130,0.12)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0"><p className="truncate font-semibold">{user.email}</p><CopyText value={user.id} title="Скопировать ID" className="mt-1 max-w-full text-xs text-[#718096]" /><p className="mt-2 text-sm font-semibold text-(--foreground)">Баланс: {formatAmount(user.balance)}</p></div>
                </div>
                <p className="mt-3 text-xs text-[#718096]">Регистрация: {formatDate(user.createdAt)}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setBalanceUser(user)} className="flex items-center justify-center gap-2 rounded-xl bg-[#dbeee6] px-3 py-2 text-xs font-bold"><CreditCard className="size-4" />Баланс</button>
                  <button type="button" onClick={() => void openTransactions(user)} className="flex items-center justify-center gap-2 rounded-xl bg-[#e4edf6] px-3 py-2 text-xs font-bold"><ReceiptText className="size-4" />Операции</button>
                  <button type="button" onClick={() => void openChecks(user)} className="flex items-center justify-center gap-2 rounded-xl bg-[#f5ead9] px-3 py-2 text-xs font-bold"><FileText className="size-4" />Проверки</button>
                  <button type="button" onClick={() => setUserToDelete(user)} className="flex items-center justify-center gap-2 rounded-xl bg-[#f9e2e2] px-3 py-2 text-xs font-bold text-[#9c3c3c]"><Trash2 className="size-4" />Удалить</button>
                </div>
              </article>
            ))
          ) : <p className="rounded-[24px] bg-white p-5 text-center text-sm text-[#718096]">Пользователи не найдены</p>}
        </div>
        <Pagination
          className="mt-4"
          total={filteredUsers.length}
          limit={usersPerPage}
          page={safeCurrentPage}
          onPageChange={setCurrentPage}
          summaryText="Пользователей"
        />
        <div className="mt-4 hidden">
          <SmartTable
            items={paginatedUsers}
            columns={userColumns}
            getRowKey={(user) => user.id}
            isLoading={isLoading}
            isInitialized={!isLoading}
            emptyMessage="Пользователи не найдены"
            minWidth="1100px"
          />
          <div className="mt-4">
            <Pagination
              total={filteredUsers.length}
              limit={usersPerPage}
              page={safeCurrentPage}
              onPageChange={setCurrentPage}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onLimitChange={(limit) => {
                setUsersPerPage(limit);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-white/80 bg-white/70 p-4 shadow-[0_18px_45px_rgba(90,111,130,0.1)] backdrop-blur md:p-6">
        <div className="flex items-center justify-between gap-3">
          <div><h2 className="text-xl font-medium">Обращения пользователей</h2><p className="mt-1 text-sm text-[#718096]">Заявки с формы обратной связи</p></div>
          <span className="rounded-full bg-[#e8f1fb] px-3 py-1 text-sm font-semibold">{feedback.length}</span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <SearchField
            id="admin-feedback-search"
            label="Поиск обращений"
            placeholder="Имя, компания, почта, телефон или текст обращения"
            value={feedbackQuery}
            onChange={(value) => { setFeedbackQuery(value); setFeedbackPage(1); }}
          />
          <button type="button" onClick={() => { setFeedbackQuery(""); setFeedbackStatuses([]); setFeedbackPage(1); }} className="mb-0 h-fit cursor-pointer rounded-xl px-3 py-2 text-sm text-[#718096] hover:bg-white hover:text-(--foreground)">Сбросить</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => { setFeedbackStatuses([]); setFeedbackPage(1); }} className={`cursor-pointer rounded-full px-3 py-2 text-xs font-semibold transition ${feedbackStatuses.length === 0 ? "bg-(--foreground) text-white" : "bg-white text-[#65748a] shadow-sm"}`}>Все</button>
          {feedbackStatusOptions.map((option) => <button key={option.value} type="button" onClick={() => toggleFeedbackStatus(option.value)} className={`cursor-pointer rounded-full px-3 py-2 text-xs font-semibold transition ${feedbackStatuses.includes(option.value) ? option.className : "bg-white text-[#65748a] shadow-sm"}`}>{option.label}</button>)}
        </div>
        {isFeedbackLoading ? <p className="mt-5 rounded-3xl bg-white p-5 text-sm text-[#718096]">Загрузка обращений…</p> : paginatedFeedback.length ? (
          <div className="mt-6 grid gap-3 lg:grid-cols-2">{paginatedFeedback.map(renderFeedbackCard)}</div>
        ) : <p className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm text-[#718096]">Обращения не найдены</p>}
        {!isFeedbackLoading && <Pagination
          className="mt-5"
          total={filteredFeedback.length}
          limit={feedbackPerPage}
          page={safeFeedbackPage}
          onPageChange={setFeedbackPage}
          summaryText="Обращений"
        />}
      </section>

      {balanceUser && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#3e3c4b]/35 p-3 sm:p-4"
          onClick={closeBalanceModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="balance-modal-title"
        >
          <div
            className="relative w-full max-w-105 rounded-[20px] bg-white p-4 text-(--foreground) shadow-[0_12px_40px_rgba(62,60,75,0.3)] sm:rounded-[24px] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeBalanceModal}
              disabled={isSaving}
              aria-label="Закрыть"
              className="absolute top-3 right-3 grid size-10 place-items-center rounded-full text-(--foreground) hover:bg-(--field) disabled:opacity-50"
            >
              <X size={22} />
            </button>
            <h2
              id="balance-modal-title"
              className="pr-10 text-lg font-medium sm:text-xl"
            >
              Изменение баланса
            </h2>
            <p className="mt-2 text-sm text-[#868a85]">{balanceUser.email}</p>
            <p className="mt-1 text-sm">
              Текущий баланс:{" "}
              <strong>{formatAmount(balanceUser.balance)}</strong>
            </p>
            <label className="mt-6 block text-sm font-semibold">
              Сумма
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                inputMode="decimal"
                autoFocus
                placeholder="0"
                className="mt-2 w-full rounded-[14px] border border-(--border) bg-white px-4 py-3 text-(--foreground) outline-none"
              />
            </label>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => void updateBalance("credit")}
                className="min-h-10 cursor-pointer rounded-[20px] bg-[#c5ddd5] p-6 text-xs font-bold uppercase text-[#1f2937] shadow-(--shadow-1) transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Начислить
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => void updateBalance("debit")}
                className="min-h-10 cursor-pointer rounded-[20px] bg-[#c8ced5] p-6 text-xs font-bold uppercase text-[#1f2937] shadow-(--shadow-1) transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Списать
              </button>
            </div>
          </div>
        </div>
      )}

      {userToDelete && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#3e3c4b]/35 p-3 sm:p-4"
          onClick={() => !isDeleting && setUserToDelete(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          <div
            className="relative w-full max-w-105 rounded-[20px] bg-white p-4 text-(--foreground) shadow-[0_12px_40px_rgba(62,60,75,0.3)] sm:rounded-[24px] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setUserToDelete(null)}
              aria-label="Закрыть"
              className="absolute top-3 right-3 grid size-10 place-items-center rounded-full hover:bg-(--field) disabled:opacity-50"
            >
              <X size={22} />
            </button>
            <h2
              id="delete-modal-title"
              className="pr-10 text-lg font-medium sm:text-xl"
            >
              Удалить пользователя?
            </h2>
            <p className="mt-3 text-sm">
              Пользователь: <strong>{userToDelete.email}</strong>
            </p>
            <p className="mt-2 text-sm text-[#868a85]">
              Действие нельзя отменить.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => void deleteUser()}
                className="min-h-10 cursor-pointer rounded-[20px] bg-[#c5ddd5] p-6 text-xs font-bold uppercase text-[#1f2937] shadow-(--shadow-1) transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Подтвердить
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setUserToDelete(null)}
                className="min-h-10 cursor-pointer rounded-[20px] bg-[#c8ced5] p-6 text-xs font-bold uppercase text-[#1f2937] shadow-(--shadow-1) transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {transactionsUser && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#3e3c4b]/35 p-3 sm:p-4"
          onClick={() => setTransactionsUser(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="transactions-modal-title"
        >
          <div
            className="relative flex max-h-[calc(100vh-1.5rem)] w-full max-w-300 flex-col overflow-y-auto rounded-[20px] bg-white p-4 text-(--foreground) shadow-[0_12px_40px_rgba(62,60,75,0.3)] sm:max-h-[85vh] sm:rounded-[24px] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setTransactionsUser(null)}
              aria-label="Закрыть"
              className="absolute top-3 right-3 grid size-10 place-items-center rounded-full hover:bg-(--field)"
            >
              <X size={22} />
            </button>
            <h2
              id="transactions-modal-title"
              className="pr-10 text-lg font-medium sm:text-xl"
            >
              Транзакции пользователя
            </h2>
            <p className="mt-2 text-sm text-[#868a85]">
              {transactionsUser.email}
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <SearchField
                id="admin-transaction-id-search"
                label="Поиск по ID"
                placeholder="Введите ID транзакции"
                value={transactionSearchQuery}
                onChange={(value) => {
                  setTransactionSearchQuery(value);
                  setTransactionPage(1);
                }}
              />
              <MultiSelectField
                id="admin-transaction-status-filter"
                label="Статус"
                value={transactionStatusFilter}
                options={transactionStatusOptions}
                allLabel="Все операции"
                onChange={(value) => {
                  setTransactionStatusFilter(value);
                  setTransactionPage(1);
                }}
              />
            </div>
            <div className="mt-5 min-h-0 overflow-y-auto">
              <SmartTable
                items={paginatedTransactions}
                columns={transactionColumns}
                getRowKey={(transaction) => transaction.id}
                isLoading={isTransactionsLoading}
                isInitialized={!isTransactionsLoading}
                emptyMessage="Транзакции не найдены"
                minWidth="720px"
                className="max-h-[45vh] overflow-y-auto"
                stickyHeader={true}
              />
            </div>
            <div className="mt-4">
              <Pagination
                total={filteredTransactions.length}
                limit={transactionsPerPage}
                page={safeTransactionPage}
                onPageChange={setTransactionPage}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onLimitChange={(limit) => {
                  setTransactionsPerPage(limit);
                  setTransactionPage(1);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {checksUser && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#3e3c4b]/35 p-3 sm:p-4"
          onClick={() => setChecksUser(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="checks-modal-title"
        >
          <div
            className="relative flex max-h-[calc(100vh-1.5rem)] w-full max-w-300 flex-col overflow-y-auto rounded-[20px] bg-white p-4 text-(--foreground) shadow-[0_12px_40px_rgba(62,60,75,0.3)] sm:max-h-[85vh] sm:rounded-[24px] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setChecksUser(null)}
              aria-label="Закрыть"
              className="absolute top-3 right-3 grid size-10 place-items-center rounded-full hover:bg-(--field)"
            >
              <X size={22} />
            </button>
            <h2
              id="checks-modal-title"
              className="pr-10 text-lg font-medium sm:text-xl"
            >
              Проверки пользователя
            </h2>
            <p className="mt-2 text-sm text-[#868a85]">{checksUser.email}</p>
            <Tabs
              className="mt-5"
              value={checksView}
              options={[
                { value: "single", label: "Одиночные" },
                { value: "batch", label: "Пакетные" },
              ] as const}
              onChange={(value) => {
                setChecksView(value);
                setCheckPage(1);
              }}
            />
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <SearchField
                id="admin-check-search"
                label="Поиск"
                placeholder="ID или текст запроса"
                value={checkSearchQuery}
                onChange={(value) => {
                  setCheckSearchQuery(value);
                  setCheckPage(1);
                }}
              />
              <MultiSelectField
                id="admin-check-module-filter"
                label="Модуль"
                value={checkModuleFilter}
                options={moduleOptions}
                allLabel="Все модули"
                onChange={(value) => {
                  setCheckModuleFilter(value);
                  setCheckPage(1);
                }}
              />
            </div>
            <div className="mt-5 min-h-0 overflow-y-auto">
              <SmartTable
                items={paginatedChecks}
                columns={checkColumns}
                getRowKey={(check) => check.id}
                isLoading={isChecksLoading}
                isInitialized={!isChecksLoading}
                emptyMessage="Проверки не найдены"
                minWidth="900px"
                className="max-h-[45vh] overflow-y-auto"
                stickyHeader={true}
              />
            </div>
            <div className="mt-4">
              <Pagination
                total={filteredChecks.length}
                limit={checksPerPage}
                page={safeCheckPage}
                onPageChange={setCheckPage}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onLimitChange={(limit) => {
                  setChecksPerPage(limit);
                  setCheckPage(1);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardPageFrame>
  );
}
