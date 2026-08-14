"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { getInnChecks, useInnChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function InnByPassportPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useInnChecksStore();

  useEffect(() => {
    void getInnChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
  }, [setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/inn-figure.png">
      <CheckFormById configId="inn" />
      <ChecksHistory
        items={items}
        isLoading={isLoading}
        isInitialized={isInitialized}
      />
    </DashboardPageFrame>
  );
}
