import { Injectable } from '@nestjs/common';
import { CreateLabResultDto } from './dto/create-lab-result.dto';
import { UpdateLabResultDto } from './dto/update-lab-result.dto';
import db from 'src/config/database';

@Injectable()
export class LabResultsService {
  async create(createLabResultDto: CreateLabResultDto, doctorEmail: string) {
    return await db
      .insertInto('LabResultUser')
      .values({
        category: createLabResultDto.category,
        patientEmail: createLabResultDto.patientEmail,
        resultDocumentURL: createLabResultDto.resultDocumentURL,
        description: createLabResultDto.description,
        doctorEmail: doctorEmail,
      })
      .returningAll()
      .executeTakeFirst();
  }

  async findLabResultsByDoctor(email: string) {
    return await db
      .selectFrom('LabResultUser')
      .where('LabResultUser.doctorEmail', '=', email)
      .selectAll()
      .execute();
  }

  async findByPatient(patientEmail: string) {
    return await db
      .selectFrom('LabResultUser')
      .where('LabResultUser.patientEmail', '=', patientEmail)
      .selectAll()
      .execute();
  }

  async findByCategoryAndPatient(categoryId: number, email: string) {
    return await db
      .selectFrom('LabResultUser')
      .where(({ cmpr, and }) =>
        and([
          cmpr('LabResultUser.category', '=', categoryId),
          cmpr('LabResultUser.patientEmail', '=', email),
        ]),
      )
      .selectAll()
      .execute();
  }

  async update(id: number, updateLabResultDto: UpdateLabResultDto) {
    if (updateLabResultDto.category) {
      await db
        .updateTable('LabResultUser')
        .set({ category: updateLabResultDto.category })
        .where('LabResultUser.id', '=', id)
        .execute();
    }

    if (updateLabResultDto.resultDocumentURL) {
      await db
        .updateTable('LabResultUser')
        .set({ resultDocumentURL: updateLabResultDto.resultDocumentURL })
        .where('LabResultUser.id', '=', id)
        .execute();
    }

    if (updateLabResultDto.description) {
      await db
        .updateTable('LabResultUser')
        .set({ description: updateLabResultDto.description })
        .where('LabResultUser.id', '=', id)
        .execute();
    }

    return await db
      .selectFrom('LabResultUser')
      .where('LabResultUser.id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  async remove(id: number) {
    return await db
      .deleteFrom('LabResultUser')
      .where('LabResultUser.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  async findDoctorByLabResultId(id: number) {
    return await db
      .selectFrom('LabResultUser')
      .where('LabResultUser.id', '=', id)
      .select(['LabResultUser.doctorEmail'])
      .executeTakeFirst();
  }
}
