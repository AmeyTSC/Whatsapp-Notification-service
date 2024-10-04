import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SMS_TemplateSchema } from 'src/Schema/sms_template.schema';
import { SmsTemplateService } from './sms_template.service';
import { SmsTemplateController } from './sms_template.controller';

@Module({imports:[MongooseModule.forFeature([{name: 'SMS_Template', schema:SMS_TemplateSchema}])],
providers: [SmsTemplateService ],
controllers: [SmsTemplateController]
    
})
export class SmsTemplateModule {}
