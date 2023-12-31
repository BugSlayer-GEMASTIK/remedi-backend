import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import db from 'src/config/database';
import {
  CreateRecordDTO,
  GetAllRecordsQuery,
  UpdateRecordDTO,
} from './record.DTO';

@Injectable()
export class RecordService {
  async createRecord(data: CreateRecordDTO) {
    const { doctorEmail, patientEmail, description, diagnoseName } = data;

    const doctor = await this.getUserByEmail(doctorEmail);

    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }

    const pasien = await this.getUserByEmail(patientEmail);

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

  async getAllRecords(query: GetAllRecordsQuery, email: string, role: string) {
    const { doctorEmail, patientEmail } = query;

    if (role === 'PATIENT' && email !== patientEmail) {
      throw new UnauthorizedException(
        "You are not allowed to see other's record",
      );
    }

    if (!!doctorEmail && !!patientEmail) {
      return await db
        .selectFrom('Record')
        .where('patientEmail', '=', patientEmail)
        .where('doctorEmail', '=', doctorEmail)
        .selectAll()
        .execute();
    } else if (!!doctorEmail) {
      return await db
        .selectFrom('Record')
        .where('doctorEmail', '=', doctorEmail)
        .selectAll()
        .execute();
    } else if (!!patientEmail) {
      return await db
        .selectFrom('Record')
        .where('patientEmail', '=', patientEmail)
        .selectAll()
        .execute();
    }

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

    const pasien = await this.getUserByEmail(patientEmail);

    if (!pasien) {
      throw new BadRequestException('Patient not found');
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

  private async getUserByEmail(email: string) {
    return await db
      .selectFrom('User')
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();
  }
}
