import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CostCategoryBadgeProps {
  category: string;
}

const CostCategoryBadge: React.FC<CostCategoryBadgeProps> = ({ category }) => {
  const getCategoryConfig = (category: string) => {
    switch (category.toLowerCase()) {
      case 'thiết bị':
      case 'equipment':
        return {
          label: 'Thiết bị',
          variant: 'outline' as const,
          className: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200'
        };
      case 'dịch vụ':
      case 'service':
        return {
          label: 'Dịch vụ',
          variant: 'outline' as const,
          className: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200'
        };
      case 'vật tư':
      case 'material':
        return {
          label: 'Vật tư',
          variant: 'outline' as const,
          className: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200'
        };
      case 'nhân sự':
      case 'personnel':
        return {
          label: 'Nhân sự',
          variant: 'outline' as const,
          className: 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200'
        };
      case 'văn phòng':
      case 'office':
        return {
          label: 'Văn phòng',
          variant: 'outline' as const,
          className: 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
        };
      case 'xây dựng':
      case 'construction':
        return {
          label: 'Xây dựng',
          variant: 'outline' as const,
          className: 'bg-brown-50 text-brown-700 hover:bg-brown-100 border-brown-200'
        };
      default:
        return {
          label: category,
          variant: 'outline' as const,
          className: 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
        };
    }
  };

  const config = getCategoryConfig(category);

  return (
    <Badge 
      variant={config.variant}
      className={config.className}
    >
      {config.label}
    </Badge>
  );
};

export default CostCategoryBadge;
