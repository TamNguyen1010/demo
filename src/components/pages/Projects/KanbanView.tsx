"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  X, 
  TrendingUp, 
  AlertCircle,
  Settings,
  Sparkles,
  RefreshCw,
  Ban
} from "lucide-react"
import { Project } from "@/types/project"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { ProjectTypeBadge } from "@/components/shared/ProjectTypeBadge"
import { formatCurrency } from "@/lib/utils"

interface KanbanViewProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
  onStatusChange: (projectId: number, fromStatus: string, toStatus: string) => void
}

interface KanbanColumn {
  id: string
  title: string
  color: string
  projects: Project[]
}

// Define allowed transitions for each column
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  'draft': ['pending_approval'], // Bản nháp chỉ có thể kéo qua chờ phê duyệt
  'pending_approval': ['approved', 'rejected'], // Chờ phê duyệt chỉ có thể kéo qua đã phê duyệt hoặc từ chối
  'approved': ['in_progress'], // Đã phê duyệt chỉ có thể kéo qua đang thực hiện
  'rejected': [], // Đã từ chối không thể kéo đi đâu cả
  'in_progress': ['completed', 'suspended'], // Đang thực hiện chỉ có thể kéo qua hoàn thành hoặc dừng
  'completed': [], // Hoàn thành không thể kéo đi đâu cả
  'suspended': [] // Dừng thực hiện không thể kéo đi đâu cả (chỉ một chiều)
}

export function KanbanView({ projects, onProjectClick, onStatusChange }: KanbanViewProps) {
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn[]>([])
  const [draggedProject, setDraggedProject] = useState<Project | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)
  const [isDropAllowed, setIsDropAllowed] = useState<boolean>(false)
  const [localProjects, setLocalProjects] = useState<Project[]>(projects)

  // Update local projects when props change
  useEffect(() => {
    setLocalProjects(projects)
  }, [projects])

  // Initialize Kanban columns
  useEffect(() => {
    console.log('KanbanView useEffect triggered - localProjects count:', localProjects.length)
    console.log('Projects status distribution:', {
      initialized: localProjects.filter(p => p.approval_status === 'initialized').length,
      pending_approval: localProjects.filter(p => p.approval_status === 'pending_approval').length,
      approved: localProjects.filter(p => p.approval_status === 'approved').length,
      rejected: localProjects.filter(p => p.approval_status === 'rejected').length,
      in_progress: localProjects.filter(p => p.execution_status === 'in_progress').length,
      completed: localProjects.filter(p => p.execution_status === 'completed').length,
      suspended: localProjects.filter(p => p.execution_status === 'suspended').length
    })
    
    const columns: KanbanColumn[] = [
      { 
        id: 'draft', 
        title: 'Bản nháp', 
        color: '#6B7280', 
        projects: localProjects.filter(p => p.approval_status === 'initialized' && p.execution_status === 'not_started')
      },
      { 
        id: 'pending_approval', 
        title: 'Chờ phê duyệt', 
        color: '#F59E0B', 
        projects: localProjects.filter(p => p.approval_status === 'pending_approval' && p.execution_status === 'not_started')
      },
      { 
        id: 'approved', 
        title: 'Đã phê duyệt', 
        color: '#10B981', 
        projects: localProjects.filter(p => p.approval_status === 'approved' && p.execution_status === 'not_started')
      },
      { 
        id: 'rejected', 
        title: 'Đã từ chối', 
        color: '#EF4444', 
        projects: localProjects.filter(p => p.approval_status === 'rejected' && p.execution_status === 'not_started')
      },
      { 
        id: 'in_progress', 
        title: 'Đang thực hiện', 
        color: '#3B82F6', 
        projects: localProjects.filter(p => p.approval_status === 'approved' && p.execution_status === 'in_progress')
      },
      { 
        id: 'completed', 
        title: 'Hoàn thành', 
        color: '#8B5CF6', 
        projects: localProjects.filter(p => p.approval_status === 'approved' && p.execution_status === 'completed')
      },
      { 
        id: 'suspended', 
        title: 'Dừng thực hiện', 
        color: '#F97316', 
        projects: localProjects.filter(p => p.approval_status === 'approved' && p.execution_status === 'suspended')
      }
    ]
    
    console.log('Kanban columns updated:', columns.map(col => ({ id: col.id, count: col.projects.length })))
    
    setKanbanColumns(columns)
  }, [localProjects])

  // Get current column ID for a project
  const getCurrentColumnId = (project: Project): string => {
    if (project.approval_status === 'initialized') return 'draft'
    if (project.approval_status === 'pending_approval') return 'pending_approval'
    if (project.approval_status === 'rejected') return 'rejected'
    if (project.approval_status === 'approved') {
      if (project.execution_status === 'not_started') return 'approved'
      if (project.execution_status === 'in_progress') return 'in_progress'
      if (project.execution_status === 'completed') return 'completed'
      if (project.execution_status === 'suspended') return 'suspended'
    }
    return 'draft'
  }

  // Check if drop is allowed
  const isDropAllowedForProject = (project: Project, targetColumnId: string): boolean => {
    const currentColumnId = getCurrentColumnId(project)
    const allowedTargets = ALLOWED_TRANSITIONS[currentColumnId] || []
    return allowedTargets.includes(targetColumnId)
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, project: Project) => {
    setDraggedProject(project)
    e.dataTransfer.effectAllowed = 'move'
    
    // Add visual feedback to dragged element
    const draggedElement = e.currentTarget as HTMLElement
    draggedElement.style.opacity = '0.5'
    draggedElement.style.transform = 'rotate(5deg)'
  }

  const handleDragEnd = (e: React.DragEvent) => {
    // Reset visual feedback
    const draggedElement = e.currentTarget as HTMLElement
    draggedElement.style.opacity = '1'
    draggedElement.style.transform = 'rotate(0deg)'
    
    setDraggedProject(null)
    setDragOverColumn(null)
    setIsDropAllowed(false)
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    
    if (!draggedProject) return
    
    const allowed = isDropAllowedForProject(draggedProject, columnId)
    setIsDropAllowed(allowed)
    setDragOverColumn(columnId)
    
    if (allowed) {
      e.dataTransfer.dropEffect = 'move'
    } else {
      e.dataTransfer.dropEffect = 'none'
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only reset if we're leaving the column entirely, not just entering a child element
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverColumn(null)
      setIsDropAllowed(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()
    
    if (!draggedProject) return
    
    const allowed = isDropAllowedForProject(draggedProject, targetColumnId)
    if (!allowed) {
      setDragOverColumn(null)
      setIsDropAllowed(false)
      return
    }
    
    // Determine the new status based on target column
    let newApprovalStatus = draggedProject.approval_status
    let newExecutionStatus = draggedProject.execution_status
    
    // Update status based on target column
    switch (targetColumnId) {
      case 'draft':
        newApprovalStatus = 'initialized'
        newExecutionStatus = 'not_started'
        break
      case 'pending_approval':
        newApprovalStatus = 'pending_approval'
        newExecutionStatus = 'not_started'
        break
      case 'approved':
        newApprovalStatus = 'approved'
        newExecutionStatus = 'not_started'
        break
      case 'rejected':
        newApprovalStatus = 'rejected'
        newExecutionStatus = 'not_started'
        break
      case 'in_progress':
        newApprovalStatus = 'approved'
        newExecutionStatus = 'in_progress'
        break
      case 'completed':
        newApprovalStatus = 'approved'
        newExecutionStatus = 'completed'
        break
      case 'suspended':
        newApprovalStatus = 'approved'
        newExecutionStatus = 'suspended'
        break
      default:
        console.error('Unknown target column:', targetColumnId)
        return
    }
    
    console.log('handleDrop - updating project:', {
      id: draggedProject.id,
      name: draggedProject.name,
      from: `${draggedProject.approval_status}_${draggedProject.execution_status}`,
      to: `${newApprovalStatus}_${newExecutionStatus}`
    })
    
    // Update local state immediately for instant feedback
    setLocalProjects(prevProjects => {
      const updatedProjects = prevProjects.map(p => 
        p.id === draggedProject.id ? {
          ...p,
          approval_status: newApprovalStatus as any,
          execution_status: newExecutionStatus as any,
          updated_at: new Date().toISOString()
        } : p
      )
      
      console.log('Local projects updated:', {
        projectId: draggedProject.id,
        projectName: draggedProject.name,
        newStatus: `${newApprovalStatus}_${newExecutionStatus}`,
        updatedProject: updatedProjects.find(p => p.id === draggedProject.id),
        totalProjects: updatedProjects.length
      })
      
      return updatedProjects
    })
    
    // Call the status change handler to update global state
    onStatusChange(draggedProject.id, `${draggedProject.approval_status}_${draggedProject.execution_status}`, `${newApprovalStatus}_${newExecutionStatus}`)
    
    // Force a re-render after a short delay to ensure state is updated
    setTimeout(() => {
      console.log('Force re-render triggered')
    }, 100)
    
    // Reset drag state
    setDragOverColumn(null)
    setIsDropAllowed(false)
    setDraggedProject(null)
  }, [draggedProject, onStatusChange])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Clock className="w-4 h-4" />
      case 'pending_approval': return <AlertCircle className="w-4 h-4" />
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <X className="w-4 h-4" />
      case 'in_progress': return <TrendingUp className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'suspended': return <Settings className="w-4 h-4" />
      default: return <FolderOpen className="w-4 h-4" />
    }
  }

  const getColumnDropFeedback = (columnId: string) => {
    if (!draggedProject || !dragOverColumn || dragOverColumn !== columnId) {
      return { className: '', icon: null, message: '' }
    }

    const allowed = isDropAllowedForProject(draggedProject, columnId)
    
    if (allowed) {
      return {
        className: 'border-green-500 bg-green-50 shadow-lg',
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        message: 'Thả vào đây để thay đổi trạng thái'
      }
    } else {
      return {
        className: 'border-red-500 bg-red-50 shadow-lg',
        icon: <Ban className="w-6 h-6 text-red-500" />,
        message: 'Không thể thả vào đây'
      }
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#800020]" />
          Bảng Kanban - Quản lý Dự án
        </CardTitle>
        <p className="text-sm text-slate-600">
          Kéo thả dự án giữa các cột để thay đổi trạng thái. Chỉ những chuyển đổi hợp lệ mới được phép.
        </p>

      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Kanban Board - Horizontal Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 min-w-[1200px]">
              {kanbanColumns.map((column) => {
                const dropFeedback = getColumnDropFeedback(column.id)
                
                return (
                  <div
                    key={column.id}
                    className={`min-h-[600px] p-4 rounded-lg border-2 border-dashed transition-all duration-200 overflow-hidden ${
                      dragOverColumn === column.id 
                        ? dropFeedback.className
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    style={{ 
                      backgroundColor: dragOverColumn === column.id 
                        ? (isDropAllowed ? `${column.color}20` : '#FEF2F2') 
                        : `${column.color}10` 
                    }}
                    onDragOver={(e) => handleDragOver(e, column.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, column.id)}
                  >
                    {/* Column Header */}
                    <div 
                      className="text-center p-3 rounded-lg mb-4 flex flex-col justify-center relative" 
                      style={{ backgroundColor: `${column.color}20` }}
                    >
                      <h3 className="font-semibold text-sm" style={{ color: column.color }}>
                        {column.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        {column.projects.length} dự án
                      </p>
                      
                      {/* Drop feedback icon */}
                      {dragOverColumn === column.id && dropFeedback.icon && (
                        <div className="absolute top-2 right-2">
                          {dropFeedback.icon}
                        </div>
                      )}
                    </div>

                    {/* Drop feedback message */}
                    {dragOverColumn === column.id && dropFeedback.message && (
                      <div className={`text-center p-2 rounded-lg mb-3 text-xs font-medium ${
                        isDropAllowed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {dropFeedback.message}
                      </div>
                    )}

                    {/* Projects in Column */}
                    <div className="space-y-3">
                      {column.projects.map((project) => (
                        <div
                          key={project.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, project)}
                          onDragEnd={handleDragEnd}
                          onClick={() => onProjectClick(project)}
                          className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer w-full overflow-hidden"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <h4 className="font-medium text-sm text-slate-900 truncate">
                                {project.name}
                              </h4>
                              <p className="text-xs text-slate-500 font-mono truncate">
                                {project.project_code}
                              </p>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <ProjectTypeBadge category={project.category} />
                            </div>
                          </div>
                          
                          <div className="space-y-1 overflow-hidden">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-600 truncate flex-shrink-0">Ngân sách:</span>
                              <span className="font-medium truncate ml-1 text-right min-w-0 flex-1">{formatCurrency(project.planned_budget)}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-600 truncate flex-shrink-0">Phòng ban:</span>
                              <span className="font-medium truncate ml-1 text-right min-w-0 flex-1">{project.department}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex items-center justify-between overflow-hidden">
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <StatusBadge status={project.approval_status} type="approval" project={project} />
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500 flex-shrink-0 ml-2">
                              {getStatusIcon(column.id)}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {column.projects.length === 0 && (
                        <div className="text-center py-8 text-slate-400">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center">
                            <span className="text-xs">+</span>
                          </div>
                          <p className="text-xs">
                            {dragOverColumn === column.id && draggedProject 
                              ? (isDropAllowed ? 'Thả vào đây' : 'Không thể thả')
                              : 'Kéo dự án vào đây'
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}