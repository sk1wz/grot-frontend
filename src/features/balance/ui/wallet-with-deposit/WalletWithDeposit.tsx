import { Skeleton, Balance } from "@/shared/ui";
import { UserType } from "@/entities/user";

interface WalletWithDepositProps {
  user?: UserType | null;
}
export const WalletWithDeposit = ({ user }: WalletWithDepositProps) => {
  if (!user) {
    return <Skeleton className="h-6 w-full shrink-0" />;
  }

  return (
    <div className="w-full flex justify-between items-center">
      <Balance balance={user.balance} />
    </div>
  );
};
