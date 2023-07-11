import { Injectable } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import db from 'src/config/database';

@Injectable()
export class TreatmentsService {
  async create(createTreatmentDto: CreateTreatmentDto, doctorEmail: string) {
    return await db
      .insertInto('TreatmentUser')
      .values({
        category: createTreatmentDto.category,
        patientEmail: createTreatmentDto.patientEmail,
        description: createTreatmentDto.description,
        doctorEmail: doctorEmail,
      })
      .returningAll()
      .executeTakeFirst();
  }

  async findTreatmentsByDoctor(doctorEmail: string) {
    return await db
      .selectFrom('TreatmentUser')
      .where('TreatmentUser.doctorEmail', '=', doctorEmail)
      .selectAll()
      .execute();
  }

  async findByPatient(patientEmail: string) {
    return await db
      .selectFrom('TreatmentUser')
      .where('TreatmentUser.patientEmail', '=', patientEmail)
      .selectAll()
      .execute();
  }

  async findByCategoryAndPatient(categoryId: number, patientEmail: string) {
    return await db
      .selectFrom('TreatmentUser')
      .where(({ cmpr, and }) =>
        and([
          cmpr('TreatmentUser.category', '=', categoryId),
          cmpr('TreatmentUser.patientEmail', '=', patientEmail),
        ]),
      )
      .selectAll()
      .execute();
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    if (updateTreatmentDto.description) {
      await db.updateTable('TreatmentUser')
        .set({ description: updateTreatmentDto.description })
        .where('TreatmentUser.id', '=', id)
        .execute();
    }

    if (updateTreatmentDto.category) {
      await db.updateTable('TreatmentUser')
        .set({ category: updateTreatmentDto.category })
        .where('TreatmentUser.id', '=', id)
        .execute();
    }

    // Patient's email cannot be changed
    return await db
      .selectFrom('TreatmentUser')
      .where('TreatmentUser.id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  async remove(id: number) {
    return await db
      .deleteFrom('TreatmentUser')
      .where('TreatmentUser.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  async findDoctorByTreatmentId(id: number) {
    return await db
      .selectFrom('TreatmentUser')
      .where('TreatmentUser.id', '=', id)
      .select(['TreatmentUser.doctorEmail'])
      .executeTakeFirst();
  }
}
