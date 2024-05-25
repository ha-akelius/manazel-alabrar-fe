import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Path } from '@prisma/client';
import { CreatePathInstanceDialogComponent } from '../../app/components/create-path-instance-dialog/create-path-instance-dialog.component';
import { courseInstanceSchema } from './course-instance.gui-info';
import { courseSchema } from './course.gui-info';
import { mediaFolderSchema } from './media-folder.gui-info';
import { mediaSchema } from './media.gui-info';
import { pathInstanceSchema } from './path-instance.gui-info';
import { pathSchema } from './path.gui-info';
import { quizInstanceStudentSchema } from './quiz-instance-student.gui-info';
import { quizInstanceSchema } from './quiz-instance.gui-info';
import { studentPathInstanceSchema } from './student-path-instance.gui-info';
import { studentSchema } from './student.gui-info';
import { teacherSchema } from './teacher.gui-info';
import { userSchema } from './user.gui-info';

pathSchema.actions = [
  {
    label: $localize`create path instance`,
    actionFactory: () => {
      const dialog = inject(MatDialog);
      return (x: Path) => CreatePathInstanceDialogComponent.openDialog(dialog, x);
    },
  },
];

export const schemas = {
  pathSchema,
  pathInstanceSchema,
  courseSchema,
  courseInstanceSchema,
  studentPathInstanceSchema,
  quizInstanceSchema,
  quizInstanceStudentSchema,
  studentSchema,
  teacherSchema,
  userSchema,
  mediaFolderSchema,
  mediaSchema,
};
