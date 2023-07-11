import { Injectable } from '@nestjs/common';
import { CreateLabResultCategoryDto } from './dto/create-lab-result-category.dto';
import { UpdateLabResultCategoryDto } from './dto/update-lab-result-category.dto';
import db from 'src/config/database';

@Injectable()
export class LabResultCategoriesService {
  async create(createLabResultCategoryDto: CreateLabResultCategoryDto) {
    return await db
      .insertInto('LabResultCategory')
      .values({
        category: createLabResultCategoryDto.category,
      })
      .returningAll()
      .executeTakeFirst();
  }

  async findAll() {
    return await db.selectFrom('LabResultCategory').selectAll().execute();
  }

  async update(id: number, updateLabResultCategoryDto: UpdateLabResultCategoryDto) {
    return await db
      .updateTable('LabResultCategory')
      .set({
        category: updateLabResultCategoryDto.category,
      })
      .where('LabResultCategory.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  async remove(id: number) {
    return await db
      .deleteFrom('LabResultCategory')
      .where('LabResultCategory.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }
}
