import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Path } from '@prisma/client';
import { CreatePathInstanceDialogComponent } from '../../app/components/create-path-instance-dialog/create-path-instance-dialog.component';
import { pathSchema } from '../../models/gui-info/path.gui-info';
import { answerSchema } from './answer.gui-info';
import { lessonSchema } from './lesson.gui-info';
import { questionSchema } from './question.gui-info';
import { quizSchema } from './quiz.gui-info';
import { studentLessonSchema } from './student-lesson.gui-info';

pathSchema.actions = [
  {
    label: $localize`create path instance`,
    actionFactory: () => {
      const dialog = inject(MatDialog);
      return (x: Path) => CreatePathInstanceDialogComponent.openDialog(dialog, x);
    },
  },
];

export const jsonSchemas = {
  answerSchema,
  questionSchema,
  lessonSchema,
  quizSchema,
  studentLessonSchema,
};
