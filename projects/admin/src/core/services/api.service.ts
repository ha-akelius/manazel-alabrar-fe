import { Injectable } from '@angular/core';
import { Post, Prisma, User } from '@prisma/client';
import { RestApiService } from '../../shared/services/rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  user = new RestApiService<User, Prisma.UserFindManyArgs, Prisma.UserCreateInput, Prisma.UserUpdateInput>('user');
  post = new RestApiService<Post, Prisma.PostFindManyArgs, Prisma.PostCreateInput, Prisma.PostUpdateInput>('post');
}
