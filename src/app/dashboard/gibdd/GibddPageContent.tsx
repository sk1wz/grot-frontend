"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { getGibddChecks, useGibddChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function GibddPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useGibddChecksStore();

  useEffect(() => {
    void getGibddChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
  }, [setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/gibdd-figure.png">
      <CheckFormById configId="gibdd" />
      <ChecksHistory
        items={items}
        isLoading={isLoading}
        isInitialized={isInitialized}
      />
    </DashboardPageFrame>
  );
}
