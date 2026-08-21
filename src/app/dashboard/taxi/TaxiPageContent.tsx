"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { getTaxiChecks, useTaxiChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function TaxiPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useTaxiChecksStore();

  useEffect(() => {
    void getTaxiChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
  }, [setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/gibdd-figure.png">
      <CheckFormById configId="taxi" />
      <ChecksHistory
        items={items}
        isLoading={isLoading}
        isInitialized={isInitialized}
      />
    </DashboardPageFrame>
  );
}
