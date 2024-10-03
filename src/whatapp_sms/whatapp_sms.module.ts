import { Module } from '@nestjs/common';
import { WhatappSmsController } from './whatapp_sms.controller';
import { WhatappSmsService } from './whatapp_sms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Whatsapp_logs } from './whatapp_logs.service';
import {
  WhatsappLog,
  WhatsappLogSchema,
} from 'src/Schema/logs-attributes.schema';
import {
  TemplateAttributes,
  TemplateAttributesSchema,
} from 'src/Schema/template-attributes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TemplateAttributes.name, schema: TemplateAttributesSchema },
    ]),
    MongooseModule.forFeature([
      { name: WhatsappLog.name, schema: WhatsappLogSchema },
    ]),
  ],
  controllers: [WhatappSmsController],
  providers: [WhatappSmsService, Whatsapp_logs],
})
export class WhatappSmsModule {}
