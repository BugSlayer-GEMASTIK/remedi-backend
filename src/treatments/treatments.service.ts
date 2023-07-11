import { Injectable } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import db from 'src/config/database';

@Injectable()
export class TreatmentsService {
  create(createTreatmentDto: CreateTreatmentDto, doctorEmail: string) {
    return db
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

  findTreatmentsByDoctor(doctorEmail: string) {
    return db
      .selectFrom('TreatmentUser')
      .where('TreatmentUser.doctorEmail', '=', doctorEmail)
      .selectAll()
      .execute();
  }

  findByPatient(patientEmail: string) {
    return db
      .selectFrom('TreatmentUser')
      .where('TreatmentUser.patientEmail', '=', patientEmail)
      .selectAll()
      .execute();
  }

  findByCategoryAndPatient(categoryId: number, patientEmail: string) {
    return db
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

  update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    if (updateTreatmentDto.description) {
      db.updateTable('TreatmentUser')
        .set({ description: updateTreatmentDto.description })
        .where('TreatmentUser.id', '=', id)
        .execute();
    }

    if (updateTreatmentDto.category) {
      db.updateTable('TreatmentUser')
        .set({ category: updateTreatmentDto.category })
        .where('TreatmentUser.id', '=', id)
        .execute();
    }

    // Patient's email cannot be changed
    return db
      .selectFrom('TreatmentUser')
      .where('TreatmentUser.id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  remove(id: number) {
    return db
      .deleteFrom('TreatmentUser')
      .where('TreatmentUser.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  findDoctorByTreatmentId(id: number) {
    return db
      .selectFrom('TreatmentUser')
      .where('TreatmentUser.id', '=', id)
      .select(['TreatmentUser.doctorEmail'])
      .executeTakeFirst();
  }
}
