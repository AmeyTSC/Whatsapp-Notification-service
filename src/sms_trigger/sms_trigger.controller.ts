import { Controller, Post, Body } from '@nestjs/common';
import { SmsTriggerService } from './sms_trigger.service';
import { SMS_Template } from 'src/Schema/sms_template.schema';

@Controller('sms')
export class SmsTriggerController {
  constructor(private readonly smstriggerservice: SmsTriggerService) {}

  @Post('trigger')
  async smsSqs(@Body() body: { template_attributes: SMS_Template }) {
    return await this.smstriggerservice.smsSqs(body.template_attributes);
  }
}
