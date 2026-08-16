"use client";

import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  BalanceTransactionStatus,
  BalanceTransactionStatusLabel,
  type BalanceTransactionType,
} from "@/entities/balance";
import type { UserType } from "@/entities/user";
import { CheckModule, CheckModuleLabel, type Check } from "@/entities/check";
import { formatAmount, formatDate } from "@/shared/lib";
import {
  DashboardPageFrame,
  CopyText,
  Pagination,
  SearchField,
  SelectField,
  SmartTable,
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
} from "./api";

const PAGE_SIZE_OPTIONS = [10, 25, 50];
const ALL_STATUSES = "all";

type StatusFilter = BalanceTransactionStatus | typeof ALL_STATUSES;
type ModuleFilter = CheckModule | typeof ALL_STATUSES;

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: ALL_STATUSES, label: "Все статусы" },
  ...Object.values(BalanceTransactionStatus).map((status) => ({
    value: status,
    label: BalanceTransactionStatusLabel[status],
  })),
];

const moduleOptions: { value: ModuleFilter; label: string }[] = [
  { value: ALL_STATUSES, label: "Все модули" },
  ...Object.values(CheckModule).map((module) => ({
    value: module,
    label: CheckModuleLabel[module],
  })),
];

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
  const [amount, setAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [transactionSearchQuery, setTransactionSearchQuery] = useState("");
  const [transactionStatusFilter, setTransactionStatusFilter] =
    useState<StatusFilter>(ALL_STATUSES);
  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(50);
  const [checkSearchQuery, setCheckSearchQuery] = useState("");
  const [checkModuleFilter, setCheckModuleFilter] =
    useState<ModuleFilter>(ALL_STATUSES);
  const [checkPage, setCheckPage] = useState(1);
  const [checksPerPage, setChecksPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  const [isChecksLoading, setIsChecksLoading] = useState(false);

  async function loadUsers() {
    setIsLoading(true);
    try {
      const items = await getAdminUsers();
      setUsers(items);
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

  function closeBalanceModal() {
    if (isSaving) return;
    setBalanceUser(null);
    setAmount("");
  }

  async function openTransactions(user: UserType) {
    setTransactionsUser(user);
    setTransactions([]);
    setTransactionSearchQuery("");
    setTransactionStatusFilter(ALL_STATUSES);
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
    setCheckSearchQuery("");
    setCheckModuleFilter(ALL_STATUSES);
    setCheckPage(1);
    setIsChecksLoading(true);
    try {
      setChecks(await getAdminUserChecks(user.id));
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

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [users, searchQuery]
  );
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
          (transactionStatusFilter === ALL_STATUSES ||
            transaction.status === transactionStatusFilter)
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
      checks.filter(
        (check) =>
          (check.id.toLowerCase().includes(checkSearchQuery.toLowerCase()) ||
            check.subjectBodyText
              .toLowerCase()
              .includes(checkSearchQuery.toLowerCase())) &&
          (checkModuleFilter === ALL_STATUSES ||
            check.module === checkModuleFilter)
      ),
    [checks, checkSearchQuery, checkModuleFilter]
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
      className="relative min-h-full bg-white p-5 text-(--foreground) md:rounded-[70px_10px_70px_10px] md:border-4 md:border-[#d7e2ed] md:p-8"
    >
      <h1 className="text-2xl font-medium md:text-[32px]">Админ-панель</h1>
      <section className="mt-8">
        <h2 className="text-xl font-medium">Пользователи</h2>
        <div className="mt-4 w-full max-w-100">
          <SearchField
            id="admin-user-id-search"
            label="Поиск по ID пользователя"
            placeholder="Введите ID пользователя"
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="mt-4">
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
              <SelectField
                id="admin-transaction-status-filter"
                label="Статус"
                value={transactionStatusFilter}
                options={statusOptions}
                onChange={(value) => {
                  setTransactionStatusFilter(value as StatusFilter);
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
              <SelectField
                id="admin-check-module-filter"
                label="Модуль"
                value={checkModuleFilter}
                options={moduleOptions}
                onChange={(value) => {
                  setCheckModuleFilter(value as ModuleFilter);
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
