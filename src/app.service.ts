import { Injectable } from '@nestjs/common';
import db from './config/database';

@Injectable()
export class AppService {

  async getHello() {

    // Example: insert
    // await db.insertInto('Post').values({ id: 3, title: "as" }).execute();

    // Example get 
    // console.log(await db.selectFrom("Post").selectAll().execute())

    return 'Hello World!';
  }

}



