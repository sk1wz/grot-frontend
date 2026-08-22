"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { CheckModule, getBatchChecks, getFsspChecks, useFsspBatchChecksStore, useFsspChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function FsspPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useFsspChecksStore();
  const { batches, isLoading: isBatchesLoading, isInitialized: areBatchesInitialized, setBatches, setLoading: setBatchesLoading } = useFsspBatchChecksStore();

  useEffect(() => {
    void getFsspChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
    setBatchesLoading(true);
    void getBatchChecks("/checks/fssp", CheckModule.FSSP)
      .then(setBatches)
      .finally(() => setBatchesLoading(false));
  }, [setBatches, setBatchesLoading, setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/fssp-figure.png">
      <CheckFormById configId="fssp" />
      <ChecksHistory
        items={items}
        batches={batches}
        isLoading={isLoading}
        isInitialized={isInitialized}
        isBatchesLoading={isBatchesLoading}
        areBatchesInitialized={areBatchesInitialized}
      />
    </DashboardPageFrame>
  );
}
