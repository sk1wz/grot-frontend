"use client";

import { useEffect } from "react";
import { CheckModule, getBatchChecks, getLimitationChecks, useLimitationBatchChecksStore, useLimitationChecksStore } from "@/entities/check";
import { CheckFormById } from "@/features/checker";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function LimitationsPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useLimitationChecksStore();
  const { batches, isLoading: isBatchesLoading, isInitialized: areBatchesInitialized, setBatches, setLoading: setBatchesLoading } = useLimitationBatchChecksStore();

  useEffect(() => {
    void getLimitationChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
    setBatchesLoading(true);
    void getBatchChecks("/checks/limitation", CheckModule.LIMITATION).then(setBatches).finally(() => setBatchesLoading(false));
  }, [setBatches, setBatchesLoading, setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/torgi-figure.png">
      <CheckFormById configId="limitation" />
      <ChecksHistory items={items} batches={batches} isLoading={isLoading} isInitialized={isInitialized} isBatchesLoading={isBatchesLoading} areBatchesInitialized={areBatchesInitialized} />
    </DashboardPageFrame>
  );
}
