"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { getFsspChecks, useFsspChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function FsspPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useFsspChecksStore();

  useEffect(() => {
    void getFsspChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
  }, [setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/fssp-figure.png">
      <CheckFormById configId="fssp" />
      <ChecksHistory
        items={items}
        isLoading={isLoading}
        isInitialized={isInitialized}
      />
    </DashboardPageFrame>
  );
}
