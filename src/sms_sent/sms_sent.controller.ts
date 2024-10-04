

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { SmsSentService } from './sms_sent.service';

@Controller('sms')
export class SmsSentController {
  constructor(private readonly smssentService: SmsSentService) {}

  @Post('send')
  async SendSMS(@Body() body: any) {
    try {
      const { template_attributes } = body;

      const response = await this.smssentService.SendSMS(template_attributes);
      return {
        statusCode: response.statusCode,
        message: response.message,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
