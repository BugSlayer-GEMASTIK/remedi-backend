import { Injectable } from '@nestjs/common';
import { CreateTreatmentCategoryDto } from './dto/create-treatment-category.dto';
import { UpdateTreatmentCategoryDto } from './dto/update-treatment-category.dto';
import db from 'src/config/database';

@Injectable()
export class TreatmentCategoriesService {
  async create(createTreatmentCategoryDto: CreateTreatmentCategoryDto) {
    return await db
      .insertInto('TreatmentCategory')
      .values({
        category: createTreatmentCategoryDto.category,
      })
      .returningAll()
      .executeTakeFirst();
  }

  async findAll() {
    return await db.selectFrom('TreatmentCategory').selectAll().execute();
  }

  async update(id: number, updateTreatmentCategoryDto: UpdateTreatmentCategoryDto) {
    return await db
      .updateTable('TreatmentCategory')
      .set({
        category: updateTreatmentCategoryDto.category,
      })
      .where('TreatmentCategory.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  async remove(id: number) {
    return await db
      .deleteFrom('TreatmentCategory')
      .where('TreatmentCategory.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }
}
