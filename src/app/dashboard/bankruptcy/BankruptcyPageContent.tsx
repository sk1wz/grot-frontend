"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import {
  getBankruptcyChecks,
  useBankruptcyChecksStore,
} from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function BankruptcyPageContent() {
  const { items, isLoading, isInitialized, setChecks } =
    useBankruptcyChecksStore();

  useEffect(() => {
    void getBankruptcyChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
  }, [setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/bank-figure.png">
      <CheckFormById configId="bankruptcy" />
      <ChecksHistory
        items={items}
        isLoading={isLoading}
        isInitialized={isInitialized}
      />
    </DashboardPageFrame>
  );
}
