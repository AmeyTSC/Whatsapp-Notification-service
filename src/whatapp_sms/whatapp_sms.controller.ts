import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TemplateAttributes } from 'src/Schema/template-attributes.schema'; 
import { WhatappSmsService } from './whatapp_sms.service';
import { Whatsapp_logs } from './whatapp_logs.service';
import { smsSent } from 'src/utils/whatsapp_sms';


@Controller('whatsapp')
export class WhatappSmsController {
  constructor(private readonly whatsappSmsService: WhatappSmsService,private readonly whatsapp_logs: Whatsapp_logs) {}

  @Post('send')
  async whatsapp_sms(@Body() body: { template_attributes: TemplateAttributes }) {
    try {
      const templateInfo = await this.whatsappSmsService.getTemplateDetail(body.template_attributes);  
      const whatsappResponse = await smsSent(templateInfo);
      await this.whatsapp_logs.createLog(whatsappResponse,templateInfo);
      return {
        statusCode: 200,
        message: 'WhatsApp message sent successfully',
        data: whatsappResponse,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to send WhatsApp message: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
