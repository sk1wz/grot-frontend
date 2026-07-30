"use client";

import { useMemo } from "react";
import type { BalanceTransactionType } from "@/entities/balance";
import { formatAmount } from "@/shared/lib";
import { Text } from "@/shared/ui";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { buildTransactionStats } from "../lib/build-transaction-stats";

type DepositHistoryStatsProps = {
  items: BalanceTransactionType[];
};

function SummaryCard({
  label,
  value,
  accentClassName,
}: {
  label: string;
  value: string;
  accentClassName: string;
}) {
  return (
    <div className="rounded-xl bg-(--surface) p-4">
      <Text className="text-xs font-medium uppercase tracking-wide text-(--foreground)">
        {label}
      </Text>
      <p className={`mt-2 text-xl font-semibold ${accentClassName}`}>{value}</p>
    </div>
  );
}

function ChartEmptyState() {
  return (
    <div className="flex h-full items-center justify-center">
      <Text className="text-sm text-(--foreground)">Нет данных</Text>
    </div>
  );
}

export function DepositHistoryStats({ items }: DepositHistoryStatsProps) {
  const stats = useMemo(() => buildTransactionStats(items), [items]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Пополнения" value={formatAmount(stats.summary.totalTopup)} accentClassName="text-emerald-700" />
        <SummaryCard label="Списания" value={formatAmount(stats.summary.totalPurchase)} accentClassName="text-rose-700" />
        <SummaryCard label="Возвраты" value={formatAmount(stats.summary.totalRefund)} accentClassName="text-sky-700" />
        <SummaryCard label="Чистое изменение" value={formatAmount(stats.summary.netChange)} accentClassName={stats.summary.netChange >= 0 ? "text-emerald-700" : "text-rose-700"} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-(--surface) p-4">
          <Text className="text-sm font-medium text-(--foreground)">Распределение по типам</Text>
          <div className="mt-4 h-64">
            {stats.byType.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.byType} dataKey="count" nameKey="label" cx="50%" cy="50%" innerRadius={52} outerRadius={88} paddingAngle={2}>
                    {stats.byType.map((entry) => <Cell key={entry.status} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value, _name, item) => [`${value} шт. · ${formatAmount(item.payload.amount)}`, item.payload.label]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : <ChartEmptyState />}
          </div>
        </div>

        <div className="rounded-xl bg-(--surface) p-4">
          <Text className="text-sm font-medium text-(--foreground)">Динамика по месяцам</Text>
          <div className="mt-4 h-64">
            {stats.byMonth.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.byMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthLabel" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--foreground)", fontSize: 12 }} />
                  <Tooltip formatter={(value) => formatAmount(typeof value === "number" ? value : Number(value) || 0)} labelFormatter={(label) => String(label)} />
                  <Legend />
                  <Bar dataKey="topup" name="Пополнения" fill="#338830" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="purchase" name="Списания" fill="#e11d48" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="refund" name="Возвраты" fill="#0284c7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <ChartEmptyState />}
          </div>
        </div>
      </div>
    </div>
  );
}
