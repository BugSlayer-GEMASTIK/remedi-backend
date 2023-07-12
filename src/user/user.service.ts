import { Injectable } from '@nestjs/common';
import db from 'src/config/database';

@Injectable()
export class UserService {
  async getAllPatients() {
    return await db
      .selectFrom('User')
      .where('role', '=', 'PATIENT')
      .selectAll()
      .execute();
  }
}
