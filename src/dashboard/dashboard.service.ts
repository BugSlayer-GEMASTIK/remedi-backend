import { Injectable } from '@nestjs/common';
import db from 'src/config/database';
import { GetDashboardDTO } from './dashboard.DTO';

@Injectable()
export class DashboardService {
  async find(query: GetDashboardDTO) {
    const { provinsi, kota, kecamatan, kelurahan } = query;

    if (!!kelurahan) {
      return await this.findByKelurahan(query);
    } else if (!!kecamatan) {
      return await this.findByKecamatan(provinsi, kota, kecamatan);
    } else if (!!kota) {
      return await this.findByKota(provinsi, kota);
    } else if (!!provinsi) {
      return await this.findByProvinsi(provinsi);
    } else {
      return await this.findAll();
    }
  }

  private async findAll() {
    return await db
      .selectFrom('Record')
      .innerJoin('Diagnose', 'Diagnose.id', 'Record.diagnoseId')
      .innerJoin('User', 'User.email', 'Record.patientEmail')
      .select(['Diagnose.name'])
      .groupBy('Diagnose.name')
      .select((eb) => eb.fn.count<number>('Diagnose.name').as('totalPatient'))
      .orderBy('totalPatient', 'desc')
      .execute();
  }

  private async findByProvinsi(provinsi: string) {
    return await db
      .selectFrom('Record')
      .innerJoin('Diagnose', 'Diagnose.id', 'Record.diagnoseId')
      .innerJoin('User', 'User.email', 'Record.patientEmail')
      .where('User.provinsi', '=', provinsi)
      .select(['Diagnose.name', 'User.provinsi'])
      .groupBy(['Diagnose.name', 'User.provinsi'])
      .select((eb) => eb.fn.count<number>('Diagnose.name').as('totalPatient'))
      .orderBy('totalPatient', 'desc')
      .execute();
  }

  private async findByKota(provinsi: string, kota: string) {
    return await db
      .selectFrom('Record')
      .innerJoin('Diagnose', 'Diagnose.id', 'Record.diagnoseId')
      .innerJoin('User', 'User.email', 'Record.patientEmail')
      .where('User.provinsi', '=', provinsi)
      .where('User.kota', '=', kota)
      .select(['Diagnose.name', 'User.provinsi', 'User.kota'])
      .groupBy(['Diagnose.name', 'User.provinsi', 'User.kota'])
      .select((eb) => eb.fn.count<number>('Diagnose.name').as('totalPatient'))
      .orderBy('totalPatient', 'desc')
      .execute();
  }

  private async findByKecamatan(
    provinsi: string,
    kota: string,
    kecamatan: string,
  ) {
    return await db
      .selectFrom('Record')
      .innerJoin('Diagnose', 'Diagnose.id', 'Record.diagnoseId')
      .innerJoin('User', 'User.email', 'Record.patientEmail')
      .where('User.provinsi', '=', provinsi)
      .where('User.kota', '=', kota)
      .where('User.kecamatan', '=', kecamatan)
      .select(['Diagnose.name', 'User.provinsi', 'User.kota', 'User.kecamatan'])
      .groupBy([
        'Diagnose.name',
        'User.provinsi',
        'User.kota',
        'User.kecamatan',
      ])
      .select((eb) => eb.fn.count<number>('Diagnose.name').as('totalPatient'))
      .orderBy('totalPatient', 'desc')
      .execute();
  }

  private async findByKelurahan(query: GetDashboardDTO) {
    const { provinsi, kota, kecamatan, kelurahan } = query;

    return await db
      .selectFrom('Record')
      .innerJoin('Diagnose', 'Diagnose.id', 'Record.diagnoseId')
      .innerJoin('User', 'User.email', 'Record.patientEmail')
      .where('User.provinsi', '=', provinsi)
      .where('User.kota', '=', kota)
      .where('User.kecamatan', '=', kecamatan)
      .where('User.kelurahan', '=', kelurahan)
      .select([
        'Diagnose.name',
        'User.provinsi',
        'User.kota',
        'User.kecamatan',
        'User.kelurahan',
      ])
      .groupBy([
        'Diagnose.name',
        'User.provinsi',
        'User.kota',
        'User.kecamatan',
        'User.kelurahan',
      ])
      .select((eb) => eb.fn.count<number>('Diagnose.name').as('totalPatient'))
      .orderBy('totalPatient', 'desc')
      .execute();
  }
}
