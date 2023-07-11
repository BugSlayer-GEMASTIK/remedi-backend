import { Injectable } from '@nestjs/common';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import db from 'src/config/database';

@Injectable()
export class AllergiesService {
  create(createAllergyDto: CreateAllergyDto) {
    return db
      .insertInto('AllergyMedicine')
      .values({
        patientEmail: createAllergyDto.patientEmail,
        medicineId: createAllergyDto.medicineId,
      })
      .returningAll()
      .executeTakeFirst();
  }

  findByEmail(email: string) {
    return db
      .selectFrom('AllergyMedicine')
      .innerJoin('Medicine', 'Medicine.id', 'AllergyMedicine.medicineId')
      .where('AllergyMedicine.patientEmail', '=', email)
      .select(['Medicine.id', 'Medicine.name'])
      .execute();
  }

  remove(email: string, medicineId: number) {
    return db
      .deleteFrom('AllergyMedicine')
      .where(({ cmpr, and }) =>
        and([
          cmpr('AllergyMedicine.medicineId', '=', medicineId),
          cmpr('AllergyMedicine.patientEmail', '=', email),
        ]),
      )
      .returningAll()
      .executeTakeFirst();
  }
}
