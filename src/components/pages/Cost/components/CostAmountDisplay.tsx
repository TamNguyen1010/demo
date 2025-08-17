import React from 'react';
import { Progress } from '@/components/ui/progress';

interface CostAmountDisplayProps {
  amount: number;
  currency: string;
  paidAmount: number;
  showProgress?: boolean;
}

const CostAmountDisplay: React.FC<CostAmountDisplayProps> = ({ 
  amount, 
  currency, 
  paidAmount, 
  showProgress = true 
}) => {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const progressPercentage = amount > 0 ? (paidAmount / amount) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium">
        {formatAmount(amount)}
      </div>
      {showProgress && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Đã thanh toán: {formatAmount(paidAmount)}</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default CostAmountDisplay;
