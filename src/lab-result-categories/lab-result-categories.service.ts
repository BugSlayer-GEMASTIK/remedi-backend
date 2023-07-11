import { Injectable } from '@nestjs/common';
import { CreateLabResultCategoryDto } from './dto/create-lab-result-category.dto';
import { UpdateLabResultCategoryDto } from './dto/update-lab-result-category.dto';
import db from 'src/config/database';

@Injectable()
export class LabResultCategoriesService {
  create(createLabResultCategoryDto: CreateLabResultCategoryDto) {
    return db
      .insertInto('LabResultCategory')
      .values({
        category: createLabResultCategoryDto.category,
      })
      .returningAll()
      .executeTakeFirst();
  }

  findAll() {
    return db.selectFrom('LabResultCategory').selectAll().execute();
  }

  update(id: number, updateLabResultCategoryDto: UpdateLabResultCategoryDto) {
    return db
      .updateTable('LabResultCategory')
      .set({
        category: updateLabResultCategoryDto.category,
      })
      .where('LabResultCategory.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  remove(id: number) {
    return db
      .deleteFrom('LabResultCategory')
      .where('LabResultCategory.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }
}
