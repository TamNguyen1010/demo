'use client';

import React from 'react';

interface AssetsServicesAmountDisplayProps {
  amount: number;
  currency?: string;
  className?: string;
}

const AssetsServicesAmountDisplay: React.FC<AssetsServicesAmountDisplayProps> = ({
  amount,
  currency = 'VND',
  className = ''
}) => {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <span className={className}>
      {formatAmount(amount)}
    </span>
  );
};

export default AssetsServicesAmountDisplay;
