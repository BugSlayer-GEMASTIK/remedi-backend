import { Injectable } from '@nestjs/common';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import db from 'src/config/database';

@Injectable()
export class DiseasesService {
  create(createDiseaseDto: CreateDiseaseDto) {
    return db
      .insertInto('Diagnose')
      .values({
        name: createDiseaseDto.name,
        category: createDiseaseDto.category,
      })
      .returningAll()
      .executeTakeFirst();
  }

  findAll() {
    return db.selectFrom('Diagnose').selectAll().execute();
  }

  findByCategory(category: string) {
    return db
      .selectFrom('Diagnose')
      .where('Diagnose.category', '=', category)
      .selectAll()
      .execute();
  }

  update(id: number, updateDiseaseDto: UpdateDiseaseDto) {
    if (updateDiseaseDto.category) {
      db.updateTable('Diagnose')
        .set({ category: updateDiseaseDto.category })
        .where('Diagnose.id', '=', id)
        .execute();
    }
    if (updateDiseaseDto.name) {
      db.updateTable('Diagnose')
        .set({ name: updateDiseaseDto.name })
        .where('Diagnose.id', '=', id)
        .execute();
    }
    return db
      .selectFrom('Diagnose')
      .where('Diagnose.id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  remove(id: number) {
    return db
      .deleteFrom('Diagnose')
      .where('Diagnose.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }
}
