import { Injectable } from '@nestjs/common';
import { CreateLabResultDto } from './dto/create-lab-result.dto';
import { UpdateLabResultDto } from './dto/update-lab-result.dto';
import db from 'src/config/database';

@Injectable()
export class LabResultsService {
  create(createLabResultDto: CreateLabResultDto, doctorEmail: string) {
    return db.insertInto("LabResultUser")
            .values({
              category: createLabResultDto.category,
              patientEmail: createLabResultDto.patientEmail,
              resultDocumentURL: createLabResultDto.resultDocumentURL,
              description: createLabResultDto.description,
              doctorEmail: doctorEmail
            })
            .returningAll()
            .executeTakeFirst();
  }

  findLabResultsByDoctor(email: string) {
    return db.selectFrom("LabResultUser")
            .where("LabResultUser.doctorEmail", "=", email)
            .selectAll()
            .execute();
  }

  findByPatient(patientEmail: string) {
    return db.selectFrom("LabResultUser")
            .where("LabResultUser.patientEmail", "=", patientEmail)
            .selectAll()
            .execute();
  }

  findByCategoryAndPatient(categoryId: number, email: string) {
    return db.selectFrom("LabResultUser")
            .where(({ cmpr, and }) => and([
              cmpr("LabResultUser.category", "=", categoryId),
              cmpr("LabResultUser.patientEmail", "=", email)
            ]))
            .selectAll()
            .execute()
  }

  update(id: number, updateLabResultDto: UpdateLabResultDto) {
    if (updateLabResultDto.category) {
      db.updateTable("LabResultUser")
        .set({category: updateLabResultDto.category})
        .where("LabResultUser.id", "=", id)
        .execute()
    };

    if (updateLabResultDto.resultDocumentURL) {
      db.updateTable("LabResultUser")
        .set({resultDocumentURL: updateLabResultDto.resultDocumentURL})
        .where("LabResultUser.id", "=", id)
        .execute()
    }

    if (updateLabResultDto.description) {
      db.updateTable("LabResultUser")
        .set({description: updateLabResultDto.description})
        .where("LabResultUser.id", "=", id)
        .execute()
    }

    return db.selectFrom("LabResultUser")
            .where("LabResultUser.id", "=", id)
            .selectAll()
            .executeTakeFirst()
  }

  remove(id: number) {
    return db.deleteFrom("LabResultUser")
            .where("LabResultUser.id", "=", id)
            .returningAll()
            .executeTakeFirst();
  }

  findDoctorByLabResultId(id: number) {
    return db.selectFrom("LabResultUser")
            .where("LabResultUser.id", "=", id)
            .select(["LabResultUser.doctorEmail"])
            .executeTakeFirst();
  }
}
