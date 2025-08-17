import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CostPaymentBadgeProps {
  status: 'pending' | 'partial' | 'paid' | 'overdue';
}

const CostPaymentBadge: React.FC<CostPaymentBadgeProps> = ({ status }) => {
  const getPaymentConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Chờ thanh toán',
          variant: 'outline' as const,
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300'
        };
      case 'partial':
        return {
          label: 'Thanh toán một phần',
          variant: 'secondary' as const,
          className: 'bg-orange-100 text-orange-800 hover:bg-orange-200'
        };
      case 'paid':
        return {
          label: 'Đã thanh toán',
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 hover:bg-green-200'
        };
      case 'overdue':
        return {
          label: 'Quá hạn',
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 hover:bg-red-200'
        };
      default:
        return {
          label: 'Không xác định',
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        };
    }
  };

  const config = getPaymentConfig(status);

  return (
    <Badge 
      variant={config.variant}
      className={config.className}
    >
      {config.label}
    </Badge>
  );
};

export default CostPaymentBadge;
