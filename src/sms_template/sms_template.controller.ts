import { Body, Controller, Post } from '@nestjs/common';
import { SmsTemplateService } from './sms_template.service';
import { SMS_Template } from 'src/Schema/sms_template.schema';
import { smsSent } from 'src/utils/whatsapp_sms';
@Controller('sms')
export class SmsTemplateController {
  SmsSentService: any;
  constructor(private readonly smstemplateService: SmsTemplateService) {}

  @Post('template')
  async getsmstemplateDetail(
    @Body() body: { template_attributes: SMS_Template },
  ) {
    try {
      const templateInfo = await this.smstemplateService.getsmstemplateDetail(
        body.template_attributes,
      );
      const templateResponse = await smsSent(templateInfo);
      console.log(templateInfo);
      return {
        statusCode: 200,
        message: 'SMS template retrieved successfully!',
        templateInfo: templateInfo,
      };
    } catch (error) {
      return {
        statusCode: 500,
        error: 'Failed to retrive SMS template',
        details: error.message,
      };
    }
  }
}
