import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CostStatusBadgeProps {
  status: 'active' | 'completed' | 'cancelled';
}

const CostStatusBadge: React.FC<CostStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'Đang hoạt động',
          variant: 'default' as const,
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        };
      case 'completed':
        return {
          label: 'Hoàn thành',
          variant: 'secondary' as const,
          className: 'bg-green-100 text-green-800 hover:bg-green-200'
        };
      case 'cancelled':
        return {
          label: 'Đã hủy',
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

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant}
      className={config.className}
    >
      {config.label}
    </Badge>
  );
};

export default CostStatusBadge;
