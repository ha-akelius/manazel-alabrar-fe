import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, Path, PathInstance, Prisma } from '@prisma/client';
import { RestApiService } from '../../shared/services/rest-api.service';
import { CourseInstance } from '../../user-pages/models/schema';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  path = new RestApiService<Path, Prisma.PathFindManyArgs, Prisma.PathCreateInput, Prisma.PathUpdateInput>(
    'path',
    this.httpClient,
  );
  pathInstance = new RestApiService<
    PathInstance,
    Prisma.PathInstanceFindManyArgs,
    Prisma.PathInstanceCreateInput,
    Prisma.PathInstanceUpdateInput
  >('pathInstance', this.httpClient);

  course = new RestApiService<Course, Prisma.CourseFindManyArgs, Prisma.CourseCreateInput, Prisma.CourseUpdateInput>(
    'course',
    this.httpClient,
  );
  courseInstance = new RestApiService<
    CourseInstance,
    Prisma.CourseInstanceFindManyArgs,
    Prisma.CourseInstanceCreateInput,
    Prisma.CourseInstanceUpdateInput
  >('courseInstance', this.httpClient);
  constructor(private httpClient: HttpClient) {}
}
