import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Task, TaskStatus } from '@/types/task';
import { Clock, PlayCircle, CheckCircle2 } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const columns = [
  {
    status: 'todo' as TaskStatus,
    title: 'To Do',
    icon: Clock,
    color: 'text-muted-foreground',
  },
  {
    status: 'in-progress' as TaskStatus,
    title: 'In Progress',
    icon: PlayCircle,
    color: 'text-primary',
  },
  {
    status: 'completed' as TaskStatus,
    title: 'Completed',
    icon: CheckCircle2,
    color: 'text-success',
  },
];

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.status);
        const Icon = column.icon;

        return (
          <Card key={column.status} className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className={`h-5 w-5 ${column.color}`} />
                {column.title}
                <span className="ml-auto text-sm font-normal bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {columnTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${column.color} opacity-50`} />
                  <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};