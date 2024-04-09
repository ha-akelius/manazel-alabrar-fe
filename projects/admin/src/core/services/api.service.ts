import { Injectable } from '@angular/core';
import { Path, Prisma } from '@prisma/client';
import { RestApiService } from '../../shared/services/rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  path = new RestApiService<Path, Prisma.PathFindManyArgs, Prisma.PathCreateInput, Prisma.PathUpdateInput>('path');
}
