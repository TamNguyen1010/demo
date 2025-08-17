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
  X, 
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Settings,
  Database,
  BarChart3
} from 'lucide-react';

interface ImportTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ImportTemplateModal: React.FC<ImportTemplateModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [importType, setImportType] = useState('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importOptions, setImportOptions] = useState({
    skipDuplicates: true,
    validateData: true,
    createReferences: false,
    autoGenerateCodes: true
  });
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<any>(null);

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
      total: 5,
      imported: 4,
      skipped: 1,
      errors: 0,
      details: [
        { name: 'Báo cáo Tổng hợp Dự án', status: 'success', message: 'Import thành công' },
        { name: 'Báo cáo Tài chính', status: 'success', message: 'Import thành công' },
        { name: 'Báo cáo Tài sản', status: 'success', message: 'Import thành công' },
        { name: 'Báo cáo Nhân sự', status: 'success', message: 'Import thành công' },
        { name: 'Báo cáo Tuân thủ', status: 'skipped', message: 'Template đã tồn tại' }
      ]
    });

    setTimeout(() => {
      setIsImporting(false);
      onSuccess();
    }, 1000);
  };

  const handleOptionToggle = (option: keyof typeof importOptions) => {
    setImportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Import Template Báo cáo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Import Type Selection */}
          <div className="space-y-2">
            <Label>Loại import</Label>
            <Select value={importType} onValueChange={setImportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="file">Import từ file</SelectItem>
                <SelectItem value="url">Import từ URL</SelectItem>
                <SelectItem value="database">Import từ database</SelectItem>
                <SelectItem value="api">Import từ API</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          {importType === 'file' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Chọn file template</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#800020] transition-colors">
                  <input
                    type="file"
                    accept=".json,.xml,.xlsx,.csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="template-file"
                  />
                  <label htmlFor="template-file" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      {selectedFile ? selectedFile.name : 'Kéo thả file hoặc click để chọn'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Hỗ trợ: JSON, XML, Excel, CSV (Tối đa 10MB)
                    </p>
                  </label>
                </div>
              </div>

              {selectedFile && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">File đã chọn</span>
                  </div>
                  <div className="text-sm text-blue-800">
                    <p>Tên file: {selectedFile.name}</p>
                    <p>Kích thước: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p>Loại: {selectedFile.type || 'Không xác định'}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Import Options */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Tùy chọn Import
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="skip-duplicates"
                  checked={importOptions.skipDuplicates}
                  onCheckedChange={() => handleOptionToggle('skipDuplicates')}
                />
                <Label htmlFor="skip-duplicates">Bỏ qua template trùng lặp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="validate-data"
                  checked={importOptions.validateData}
                  onCheckedChange={() => handleOptionToggle('validateData')}
                />
                <Label htmlFor="validate-data">Kiểm tra tính hợp lệ của dữ liệu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="create-references"
                  checked={importOptions.createReferences}
                  onCheckedChange={() => handleOptionToggle('createReferences')}
                />
                <Label htmlFor="create-references">Tạo tham chiếu dữ liệu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-generate-codes"
                  checked={importOptions.autoGenerateCodes}
                  onCheckedChange={() => handleOptionToggle('autoGenerateCodes')}
                />
                <Label htmlFor="auto-generate-codes">Tự động tạo mã template</Label>
              </div>
            </div>
          </div>

          {/* Import Progress */}
          {isImporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Đang import template...</span>
                <span>{importProgress}%</span>
              </div>
              <Progress value={importProgress} className="w-full" />
            </div>
          )}

          {/* Import Results */}
          {importResults && !isImporting && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Kết quả Import
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{importResults.total}</div>
                  <div className="text-sm text-gray-600">Tổng cộng</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{importResults.imported}</div>
                  <div className="text-sm text-green-600">Thành công</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{importResults.skipped}</div>
                  <div className="text-sm text-yellow-600">Bỏ qua</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{importResults.errors}</div>
                  <div className="text-sm text-red-600">Lỗi</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Chi tiết:</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {importResults.details.map((detail: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      {detail.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      )}
                      <span className="text-sm font-medium">{detail.name}</span>
                      <span className="text-sm text-gray-600">- {detail.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button 
              onClick={handleImport}
              disabled={!selectedFile || isImporting}
              className="bg-[#800020] text-white hover:bg-[#700018]"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isImporting ? 'Đang import...' : 'Import Template'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportTemplateModal;
