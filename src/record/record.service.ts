import { BadRequestException, Injectable } from '@nestjs/common';
import db from 'src/config/database';
import { CreateRecordDTO, UpdateRecordDTO } from './record.DTO';
import { randomUUID } from 'crypto';

@Injectable()
export class RecordService {
  async createRecord(data: CreateRecordDTO) {
    const { doctorEmail, patientEmail, description, diagnoseName } = data;

    const doctor = await db
      .selectFrom('User')
      .where('email', '=', doctorEmail)
      .selectAll()
      .executeTakeFirst();

    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }

    const pasien = await db
      .selectFrom('User')
      .where('email', '=', patientEmail)
      .selectAll()
      .executeTakeFirst();

    if (!pasien) {
      throw new BadRequestException('Patient not found');
    }

    const diagnose = await db
      .selectFrom('Diagnose')
      .where('name', '=', diagnoseName)
      .selectAll()
      .executeTakeFirst();

    const createdRecord = await db
      .insertInto('Record')
      .values({
        doctorEmail: doctorEmail,
        patientEmail: patientEmail,
        description: description,
        diagnoseId: diagnose?.id,
      })
      .returningAll()
      .executeTakeFirst();

    return { ...createdRecord };
  }

  async getAllRecords() {
    return await db.selectFrom('Record').selectAll().execute();
  }

  async getRecordById(id: number) {
    const record = await db
      .selectFrom('Record')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!record) {
      throw new BadRequestException('Record not found');
    }

    return record;
  }

  async deleteRecordById(id: number, doctorEmail: string) {
    const record = await db
      .selectFrom('Record')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!record) {
      throw new BadRequestException('Record not found');
    }

    if (doctorEmail !== record.doctorEmail) {
      throw new BadRequestException('Invalid doctor email');
    }

    await db.deleteFrom('Record').where('id', '=', id).executeTakeFirst();
  }

  async getAllPatientRecords(email: string) {
    return await db
      .selectFrom('Record')
      .where('patientEmail', '=', email)
      .selectAll()
      .execute();
  }

  async getAllDoctorRecords(email: string) {
    return await db
      .selectFrom('Record')
      .where('doctorEmail', '=', email)
      .selectAll()
      .execute();
  }

  async updateRecord(data: UpdateRecordDTO, currenDoctorEmail: string) {
    const { id, doctorEmail, patientEmail, description, diagnoseName } = data;

    const record = await db
      .selectFrom('Record')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!record) {
      throw new BadRequestException('Record not found');
    }

    if (currenDoctorEmail !== record.doctorEmail) {
      throw new BadRequestException('Invalid doctor email');
    }

    const diagnose = await db
      .selectFrom('Diagnose')
      .where('name', '=', diagnoseName)
      .selectAll()
      .executeTakeFirst();

    const updatedRecord = await db
      .updateTable('Record')
      .where('id', '=', id)
      .set({
        doctorEmail: doctorEmail,
        patientEmail: patientEmail,
        description: description,
        diagnoseId: diagnose?.id,
      })
      .returningAll()
      .executeTakeFirst();

    return { ...updatedRecord };
  }
}
