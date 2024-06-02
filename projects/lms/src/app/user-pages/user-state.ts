import { Injectable, Signal, computed, signal } from '@angular/core';
import { PathInstance } from '@prisma/client';
import { LoadingService } from './services/loading-service';
import { QuizzFE, StudentInfo, StudentService } from './services/student.service';

@Injectable()
export class UserStore {
  studnet = signal<StudentInfo>({} as unknown as StudentInfo);
  currentPathesResponse = computed(() => this.studnet().studentPathInstance?.map((spi) => spi.pathInstance) ?? []);
  studentCoursesResponse = computed(() =>
    this.currentPathesResponse()
      .map((pi) => pi.courseInstance)
      .flat(),
  );
  studentQuizzesResponse: Signal<QuizzFE[]> = computed(() =>
    this.studentCoursesResponse()
      .map((ci) => ci.quizzes)
      .flat(),
  );
  openPathsResponse = signal<PathInstance[]>([]);

  constructor(
    private studentService: StudentService,
    private loadingService: LoadingService,
  ) {
    this.resetStudent();
  }

  resetStudent() {
    this.loadingService.updateLoading(true);
    this.studentService.loadStudent().subscribe((student) => {
      this.loadingService.updateLoading(false);
      this.studnet.set(student);
    });
  }

  loadOpenPaths() {
    this.loadingService.updateLoading(true);
    this.studentService.loadOpenPath().subscribe((openPaths) => {
      this.loadingService.updateLoading(false);
      this.openPathsResponse.set(openPaths);
    });
  }

  register(path: number) {
    return this.studentService.register(path);
  }

  saveProfile(_name: string) {
    // return this.studentService.saveProfile(name).subscribe((response) => {
    //   this.studentResponse.update((s) => {
    //     s.data!.name = response.data?.name!;
    //     return s;
    //   });
    // });
  }
}
