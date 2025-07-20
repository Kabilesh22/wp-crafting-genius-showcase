import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Task, TaskStatus } from '@/types/task';
import { 
  MoreHorizontal, 
  Clock, 
  Flag, 
  Trash2, 
  Edit, 
  CheckCircle2,
  Circle,
  PlayCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const statusIcons = {
  'todo': Circle,
  'in-progress': PlayCircle,
  'completed': CheckCircle2,
};

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-warning text-warning-foreground',
  high: 'bg-destructive text-destructive-foreground',
};

const statusColors = {
  'todo': 'bg-muted text-muted-foreground',
  'in-progress': 'bg-primary text-primary-foreground',
  'completed': 'bg-success text-success-foreground',
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const StatusIcon = statusIcons[task.status];
  
  return (
    <Card className="hover:shadow-medium transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={() => {
                const nextStatus: TaskStatus = 
                  task.status === 'todo' ? 'in-progress' : 
                  task.status === 'in-progress' ? 'completed' : 'todo';
                onStatusChange(task.id, nextStatus);
              }}
              className="mt-1 hover:scale-110 transition-transform"
            >
              <StatusIcon className="h-5 w-5 text-primary" />
            </button>
            <div className="flex-1">
              <h3 className={`font-semibold text-sm ${
                task.status === 'completed' ? 'line-through text-muted-foreground' : ''
              }`}>
                {task.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={statusColors[task.status]}>
                  {task.status.replace('-', ' ')}
                </Badge>
                <Badge variant="outline" className={priorityColors[task.priority]}>
                  <Flag className="h-3 w-3 mr-1" />
                  {task.priority}
                </Badge>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {task.description && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{task.description}</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </div>
        </CardContent>
      )}
    </Card>
  );
};