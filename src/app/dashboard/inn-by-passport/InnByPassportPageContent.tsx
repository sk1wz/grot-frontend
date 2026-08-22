"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { CheckModule, getBatchChecks, getInnChecks, useInnBatchChecksStore, useInnChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function InnByPassportPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useInnChecksStore();
  const { batches, isLoading: isBatchesLoading, isInitialized: areBatchesInitialized, setBatches, setLoading: setBatchesLoading } = useInnBatchChecksStore();

  useEffect(() => {
    void getInnChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
    setBatchesLoading(true);
    void getBatchChecks("/checks/inn", CheckModule.INN).then(setBatches).finally(() => setBatchesLoading(false));
  }, [setBatches, setBatchesLoading, setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/inn-figure.png">
      <CheckFormById configId="inn" />
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
