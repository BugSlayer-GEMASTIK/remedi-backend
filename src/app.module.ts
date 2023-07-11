import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { MedicinesModule } from './medicines/medicines.module';
import { DiseasesModule } from './diseases/diseases.module';
import { AllergiesModule } from './allergies/allergies.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { TreatmentCategoriesModule } from './treatment-categories/treatment-categories.module';
import { LabResultsModule } from './lab-results/lab-results.module';
import { LabResultCategoriesModule } from './lab-result-categories/lab-result-categories.module';
import { RecordModule } from './record/record.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: '1h' },
    }),
    MedicinesModule,
    DiseasesModule,
    AllergiesModule,
    TreatmentsModule,
    TreatmentCategoriesModule,
    LabResultsModule,
    LabResultCategoriesModule,
    RecordModule,
    CommonModule,
    UserModule,
    DashboardModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
