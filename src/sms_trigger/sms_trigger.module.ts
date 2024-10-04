import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SmsErrorLogSchema } from 'src/Schema/smserror_logs.schema';
import { SmsHitLogSchema } from 'src/Schema/smshit_log.schema';
import { SmsTriggerController } from './sms_trigger.controller';
import { SmsTriggerService } from './sms_trigger.service';
import { SmsTemplateService } from 'src/sms_template/sms_template.service';
import { SMS_TemplateSchema } from 'src/Schema/sms_template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SmsHitLog', schema: SmsHitLogSchema },
      { name: 'SmsErrorLog', schema: SmsErrorLogSchema },
      { name: 'SMS_Template', schema: SMS_TemplateSchema },
    ]),
  ],
  controllers: [SmsTriggerController],
  providers: [SmsTriggerService, SmsTemplateService],
})
export class SmsTriggerModule {}
