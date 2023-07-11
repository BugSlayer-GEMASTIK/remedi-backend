import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import db from 'src/config/database';
import { CreateMedicineRecordDto } from './dto/create-medicine-record.dto';

@Injectable()
export class MedicinesService {
  create(createMedicineDto: CreateMedicineDto) {
    return db
      .insertInto('Medicine')
      .values({
        name: createMedicineDto.name,
      })
      .returningAll()
      .executeTakeFirst();
  }

  findAll() {
    return db.selectFrom('Medicine').selectAll().execute();
  }

  findAllBasedOnRecord(recordId: number) {
    return db
      .selectFrom('MedicineRecord')
      .innerJoin('Medicine', 'Medicine.id', 'MedicineRecord.medicineId')
      .where('MedicineRecord.recordId', '=', recordId)
      .select(['Medicine.id', 'Medicine.name'])
      .execute();
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return db
      .updateTable('Medicine')
      .set({ name: updateMedicineDto.name })
      .where('Medicine.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  remove(id: number) {
    return db
      .deleteFrom('Medicine')
      .where('Medicine.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  createMedicineRecord(createMedicineRecordDto: CreateMedicineRecordDto) {
    return db
      .insertInto('MedicineRecord')
      .values({
        recordId: createMedicineRecordDto.recordId,
        medicineId: createMedicineRecordDto.medicineId,
        dose: createMedicineRecordDto.dose,
      })
      .returningAll()
      .executeTakeFirst();
  }
}
