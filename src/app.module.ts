import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatappSmsModule } from './whatapp_sms/whatapp_sms.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' }); 


@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE), WhatappSmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
