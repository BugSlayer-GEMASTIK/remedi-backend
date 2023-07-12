import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import db from 'src/config/database';

@Injectable()
export class AllergiesService {
  async create(createAllergyDto: CreateAllergyDto) {
    const { patientEmail, medicineId } = createAllergyDto;

    const allergy = await db
      .selectFrom('AllergyMedicine')
      .where('patientEmail', '=', patientEmail)
      .where('medicineId', '=', medicineId)
      .selectAll()
      .executeTakeFirst();

    if (!!allergy) throw new BadRequestException('Allergy already exist');

    return await db
      .insertInto('AllergyMedicine')
      .values({
        patientEmail,
        medicineId,
      })
      .returningAll()
      .executeTakeFirst();
  }

  async findByEmail(email: string) {
    return await db
      .selectFrom('AllergyMedicine')
      .innerJoin('Medicine', 'Medicine.id', 'AllergyMedicine.medicineId')
      .where('AllergyMedicine.patientEmail', '=', email)
      .select(['Medicine.id', 'Medicine.name'])
      .execute();
  }

  async remove(email: string, medicineId: number) {
    return await db
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
