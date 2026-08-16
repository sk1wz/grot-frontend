"use client";

import { useEffect } from "react";
import { getLimitationChecks, useLimitationChecksStore } from "@/entities/check";
import { CheckFormById } from "@/features/checker";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function LimitationsPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useLimitationChecksStore();

  useEffect(() => {
    void getLimitationChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
  }, [setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/torgi-figure.png">
      <CheckFormById configId="limitation" />
      <ChecksHistory items={items} isLoading={isLoading} isInitialized={isInitialized} />
    </DashboardPageFrame>
  );
}
