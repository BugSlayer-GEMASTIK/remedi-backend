import { Injectable } from '@nestjs/common';
import { CreateTreatmentCategoryDto } from './dto/create-treatment-category.dto';
import { UpdateTreatmentCategoryDto } from './dto/update-treatment-category.dto';
import db from 'src/config/database';

@Injectable()
export class TreatmentCategoriesService {
  create(createTreatmentCategoryDto: CreateTreatmentCategoryDto) {
    return db
      .insertInto('TreatmentCategory')
      .values({
        category: createTreatmentCategoryDto.category,
      })
      .returningAll()
      .executeTakeFirst();
  }

  findAll() {
    return db.selectFrom('TreatmentCategory').selectAll().execute();
  }

  update(id: number, updateTreatmentCategoryDto: UpdateTreatmentCategoryDto) {
    return db
      .updateTable('TreatmentCategory')
      .set({
        category: updateTreatmentCategoryDto.category,
      })
      .where('TreatmentCategory.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  remove(id: number) {
    return db
      .deleteFrom('TreatmentCategory')
      .where('TreatmentCategory.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }
}
