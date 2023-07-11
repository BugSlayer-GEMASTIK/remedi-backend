import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import db from 'src/config/database';
import { CreateMedicineRecordDto } from './dto/create-medicine-record.dto';

@Injectable()
export class MedicinesService {
  async create(createMedicineDto: CreateMedicineDto) {
    const { name } = createMedicineDto;

    const medicine = await db
      .selectFrom('Medicine')
      .where('name', '=', name)
      .selectAll()
      .executeTakeFirst();

    if (!!medicine) throw new BadRequestException('Medicine already exist');

    return await db
      .insertInto('Medicine')
      .values({
        name,
      })
      .returningAll()
      .executeTakeFirst();
  }

  async findAll() {
    return await db.selectFrom('Medicine').selectAll().execute();
  }

  async findAllBasedOnRecord(recordId: number) {
    return await db
      .selectFrom('MedicineRecord')
      .innerJoin('Medicine', 'Medicine.id', 'MedicineRecord.medicineId')
      .where('MedicineRecord.recordId', '=', recordId)
      .select(['Medicine.id', 'Medicine.name'])
      .execute();
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.getMedicineById(id);

    if (!medicine) throw new BadRequestException('Medicine not found');

    const updatedMedicine = await db
      .updateTable('Medicine')
      .set({ name: updateMedicineDto.name })
      .where('Medicine.id', '=', id)
      .returningAll()
      .executeTakeFirst();

    return { ...updatedMedicine };
  }

  async remove(id: number) {
    const medicine = await this.getMedicineById(id);

    if (!medicine) throw new BadRequestException('Medicine not found');

    return await db
      .deleteFrom('Medicine')
      .where('Medicine.id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  async createMedicineRecord(createMedicineRecordDto: CreateMedicineRecordDto) {
    const { recordId, medicineId, dose } = createMedicineRecordDto;

    const medicine = await this.getMedicineById(medicineId);

    if (!medicine) throw new BadRequestException('Medicine not found');

    const record = await db
      .selectFrom('Record')
      .where('id', '=', recordId)
      .selectAll()
      .executeTakeFirst();

    if (!record) throw new BadRequestException('Record not found');

    return await db
      .insertInto('MedicineRecord')
      .values({
        recordId,
        medicineId,
        dose,
      })
      .returningAll()
      .executeTakeFirst();
  }

  private async getMedicineById(id: number) {
    return await db
      .selectFrom('Medicine')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }
}
