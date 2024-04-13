import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, Prisma, User } from '@prisma/client';
import { RestApiService } from '../../shared/services/rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  user = new RestApiService<User, Prisma.UserFindManyArgs, Prisma.UserCreateInput, Prisma.UserUpdateInput>(
    'user',
    this.httpClient,
  );
  post = new RestApiService<Post, Prisma.PostFindManyArgs, Prisma.PostCreateInput, Prisma.PostUpdateInput>(
    'post',
    this.httpClient,
  );

  constructor(private httpClient: HttpClient) {
    this.path.findAll();
  }
}
