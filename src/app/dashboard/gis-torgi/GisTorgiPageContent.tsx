"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { getGistorgiChecks, useGistorgiChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function GisTorgiPageContent() {
  const { items, isLoading, isInitialized, setChecks } =
    useGistorgiChecksStore();

  useEffect(() => {
    void getGistorgiChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
  }, [setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/torgi-figure.png">
      <CheckFormById configId="gistorgi" />
      <ChecksHistory
        items={items}
        isLoading={isLoading}
        isInitialized={isInitialized}
      />
    </DashboardPageFrame>
  );
}
