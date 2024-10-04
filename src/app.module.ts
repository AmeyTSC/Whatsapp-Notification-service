import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatappSmsModule } from './whatapp_sms/whatapp_sms.module';
import * as dotenv from 'dotenv';
import { SmsTemplateModule } from './sms_template/sms_template.module';
import { SmsSentModule } from './sms_sent/sms_sent.module';
import { SmsTriggerModule } from './sms_trigger/sms_trigger.module';
dotenv.config({ path: process.cwd() + '/.env' }); 


@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE), WhatappSmsModule,SmsTemplateModule,SmsSentModule,SmsTriggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
