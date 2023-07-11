import { Injectable } from '@nestjs/common';
import db from 'src/config/database';
import { CreateRecordDTO } from './record.DTO';
import { Diagnose } from 'src/models/types';

@Injectable()
export class RecordService {
  async createRecord(data: CreateRecordDTO) {
    const { doctorEmail, patientEmail, description, diagnoseName } = data

    var diagnose = null;
    if (!!diagnoseName) {
      diagnose = await db
        .selectFrom('Diagnose')
        .where('name', '==', diagnoseName)
        .executeTakeFirst()
    }

    const record = await db
      .insertInto('Record')
      .values({
        doctorEmail: doctorEmail,
        patientEmail: patientEmail,
        description: description,
        diagnoseId: diagnose?.id,
      })
      .executeTakeFirst()

    console.log(record);
    return record
  }
}
