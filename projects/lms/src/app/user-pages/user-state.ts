import { Injectable, signal } from '@angular/core';
import { BFF } from './models/schema-bff';
import { LoadingService } from './services/loading-service';
import { StudentService } from './services/student.service';

@Injectable()
export class UserStore {
  studentResponse = signal<BFF.myPaths.response>({});
  openPathsResponse = signal<BFF.openPath.response>({});

  constructor(private studentService: StudentService, private loadingService: LoadingService) {
    this.resetStudent();
  }

  resetStudent() {
    this.loadingService.updateLoading(true);
    this.studentService.loadStudent().subscribe((student) => {
      this.loadingService.updateLoading(false);
      this.studentResponse.set(student);
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

  saveProfile(name: string) {
    return this.studentService.saveProfile(name).subscribe((response) => {
      this.studentResponse.update((s) => {
        s.data!.name = response.data?.name!;
        return s;
      });
    });
  }
}
