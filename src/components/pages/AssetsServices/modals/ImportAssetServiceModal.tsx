'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Download, 
  FileText, 
  X, 
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ImportAssetServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ImportAssetServiceModal: React.FC<ImportAssetServiceModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [importType, setImportType] = useState('asset');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<any>(null);
  const [importOptions, setImportOptions] = useState({
    skipDuplicates: true,
    validateData: true,
    createMissingReferences: false,
    autoGenerateCodes: false
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsImporting(true);
    setImportProgress(0);

    // Simulate import process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setImportProgress(i);
    }

    // Mock import results
    setImportResults({
      totalRecords: 150,
      imported: 145,
      skipped: 3,
      errors: 2,
      errors: [
        { row: 5, field: 'serial_number', error: 'Serial number already exists' },
        { row: 12, field: 'purchase_cost', error: 'Invalid number format' }
      ]
    });

    setIsImporting(false);
  };

  const downloadTemplate = () => {
    // Mock template download
    console.log('Downloading template for:', importType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Nhập dữ liệu Tài sản & Dịch vụ
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Import Type Selection */}
          <div className="space-y-2">
            <Label>Loại dữ liệu nhập</Label>
            <Select value={importType} onValueChange={setImportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asset">Tài sản</SelectItem>
                <SelectItem value="service">Dịch vụ</SelectItem>
                <SelectItem value="mixed">Tài sản và Dịch vụ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Chọn file để nhập</p>
                <p className="text-sm text-gray-500">
                  Hỗ trợ file Excel (.xlsx, .xls) hoặc CSV (.csv)
                </p>
                <div className="flex justify-center gap-2">
                  <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                    <FileText className="w-4 h-4 mr-2" />
                    Chọn file
                  </Button>
                  <Button variant="outline" onClick={downloadTemplate}>
                    <Download className="w-4 h-4 mr-2" />
                    Tải template
                  </Button>
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">{selectedFile.name}</span>
                  <span className="text-sm text-gray-500">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Import Options */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tùy chọn nhập</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="skip-duplicates"
                  checked={importOptions.skipDuplicates}
                  onCheckedChange={(checked) => 
                    setImportOptions(prev => ({ ...prev, skipDuplicates: !!checked }))
                  }
                />
                <Label htmlFor="skip-duplicates">Bỏ qua bản ghi trùng lặp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="validate-data"
                  checked={importOptions.validateData}
                  onCheckedChange={(checked) => 
                    setImportOptions(prev => ({ ...prev, validateData: !!checked }))
                  }
                />
                <Label htmlFor="validate-data">Kiểm tra tính hợp lệ dữ liệu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="create-references"
                  checked={importOptions.createMissingReferences}
                  onCheckedChange={(checked) => 
                    setImportOptions(prev => ({ ...prev, createMissingReferences: !!checked }))
                  }
                />
                <Label htmlFor="create-references">Tạo tham chiếu còn thiếu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-generate"
                  checked={importOptions.autoGenerateCodes}
                  onCheckedChange={(checked) => 
                    setImportOptions(prev => ({ ...prev, autoGenerateCodes: !!checked }))
                  }
                />
                <Label htmlFor="auto-generate">Tự động sinh mã</Label>
              </div>
            </div>
          </div>

          {/* Import Progress */}
          {isImporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Đang nhập dữ liệu...</span>
                <span>{importProgress}%</span>
              </div>
              <Progress value={importProgress} className="w-full" />
            </div>
          )}

          {/* Import Results */}
          {importResults && !isImporting && (
            <div className="space-y-4">
              <h3 className="font-semibold">Kết quả nhập</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{importResults.imported}</div>
                  <div className="text-sm text-green-600">Nhập thành công</div>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{importResults.skipped}</div>
                  <div className="text-sm text-orange-600">Bỏ qua</div>
                </div>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{importResults.errors}</div>
                <div className="text-sm text-red-600">Lỗi</div>
              </div>

              {importResults.errors > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Chi tiết lỗi:</h4>
                  <div className="space-y-1">
                    {importResults.errors.map((error: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Dòng {error.row}: {error.field} - {error.error}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Đóng
            </Button>
            <Button 
              onClick={handleImport}
              disabled={!selectedFile || isImporting}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isImporting ? 'Đang nhập...' : 'Bắt đầu nhập'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportAssetServiceModal;
