import { Injectable } from '@nestjs/common';
import db from 'src/config/database';

@Injectable()
export class DashboardService {
  async findAll() {
    return await db.selectFrom("Record")
                  .innerJoin("Diagnose", "Diagnose.id", "Record.diagnoseId")
                  .innerJoin("User", "User.email", "Record.patientEmail")
                  .select(["Diagnose.name"])
                  .groupBy("Diagnose.name")
                  .select(
                    (eb) => eb.fn.count<number>("Diagnose.name").as('total_patient')
                  )
                  .orderBy("total_patient", "desc")
                  .execute();
  }

  async findByProvinsi(provinsi: string) {
    return await db.selectFrom("Record")
                  .innerJoin("Diagnose", "Diagnose.id", "Record.diagnoseId")
                  .innerJoin("User", "User.email", "Record.patientEmail")
                  .where('User.provinsi', '=', provinsi)
                  .select(["Diagnose.name", "User.provinsi"])
                  .groupBy(["Diagnose.name", "User.provinsi"])
                  .select(
                    (eb) => eb.fn.count<number>("Diagnose.name").as('total_patient')
                  )
                  .orderBy("total_patient", "desc")
                  .execute();
  }

  async findByKota(kota: string) {
    return await db.selectFrom("Record")
                  .innerJoin("Diagnose", "Diagnose.id", "Record.diagnoseId")
                  .innerJoin("User", "User.email", "Record.patientEmail")
                  .where('User.kota', '=', kota)
                  .select(["Diagnose.name", "User.provinsi", "User.kota"])
                  .groupBy(["Diagnose.name", "User.provinsi", "User.kota"])
                  .select(
                    (eb) => eb.fn.count<number>("Diagnose.name").as('total_patient')
                  )
                  .orderBy("total_patient", "desc")
                  .execute();
  }

  async findByKecamatan(kecamatan: string) {
    return await db.selectFrom("Record")
                  .innerJoin("Diagnose", "Diagnose.id", "Record.diagnoseId")
                  .innerJoin("User", "User.email", "Record.patientEmail")
                  .where('User.kecamatan', '=', kecamatan)
                  .select(["Diagnose.name", "User.provinsi", "User.kota", "User.kecamatan"])
                  .groupBy(["Diagnose.name", "User.provinsi", "User.kota", "User.kecamatan"])
                  .select(
                    (eb) => eb.fn.count<number>("Diagnose.name").as('total_patient')
                  )
                  .orderBy("total_patient", "desc")
                  .execute();
  }

  async findByKelurahan(kelurahan: string) {
    return await db.selectFrom("Record")
                  .innerJoin("Diagnose", "Diagnose.id", "Record.diagnoseId")
                  .innerJoin("User", "User.email", "Record.patientEmail")
                  .where('User.kelurahan', '=', kelurahan)
                  .select(["Diagnose.name", "User.provinsi", "User.kota", "User.kecamatan", "User.kelurahan"])
                  .groupBy(["Diagnose.name", "User.provinsi", "User.kota", "User.kecamatan", "User.kelurahan"])
                  .select(
                    (eb) => eb.fn.count<number>("Diagnose.name").as('total_patient')
                  )
                  .orderBy("total_patient", "desc")
                  .execute();
  }
}
