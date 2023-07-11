import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import db from 'src/config/database';

@Injectable()
export class DiseasesService {
  async create(createDiseaseDto: CreateDiseaseDto) {
    const { name, category } = createDiseaseDto

    const disease = await db.selectFrom('Diagnose').where('name', '=', name).selectAll().executeTakeFirst()

    if (!!disease) throw new BadRequestException('Disease already exist')

    return await db
      .insertInto('Diagnose')
      .values({
        name,
        category,
      })
      .returningAll()
      .executeTakeFirst();
  }

  async findAll() {
    return await db.selectFrom('Diagnose').selectAll().execute();
  }

  async findByCategory(category: string) {
    return await db
      .selectFrom('Diagnose')
      .where('Diagnose.category', '=', category)
      .selectAll()
      .execute();
  }

  async update(id: number, updateDiseaseDto: UpdateDiseaseDto) {
    if (updateDiseaseDto.category) {
      await db
        .updateTable('Diagnose')
        .set({ category: updateDiseaseDto.category })
        .where('Diagnose.id', '=', id)
        .execute();
    }
    if (updateDiseaseDto.name) {
      await db
        .updateTable('Diagnose')
        .set({ name: updateDiseaseDto.name })
        .where('Diagnose.id', '=', id)
        .execute();
    }
    return await db
      .selectFrom('Diagnose')
      .where('Diagnose.id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  async remove(id: number) {
    const disease = await this.getDiseaseById(id);

    if (!disease) throw new BadRequestException('Disease not found');

    await db
      .deleteFrom('Diagnose')
      .where('Diagnose.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  private async getDiseaseById(id: number) {
    return await db
      .selectFrom('Diagnose')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }
}
