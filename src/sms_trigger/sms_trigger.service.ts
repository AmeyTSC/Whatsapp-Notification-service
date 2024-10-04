import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import { Model } from 'mongoose';
import { SMS_Template } from 'src/Schema/sms_template.schema';
import { SmsErrorLog } from 'src/Schema/smserror_logs.schema';
import { SmsHitLog } from 'src/Schema/smshit_log.schema';
import { SmsTemplateService } from 'src/sms_template/sms_template.service';
import { smsSent } from 'src/utils/whatsapp_sms';

@Injectable()
export class SmsTriggerService {
  constructor(
    @InjectModel('SmsHitLog') private SmsHitLogModel: Model<SmsHitLog>,
    @InjectModel('SmsErrorLog') private SmsErrorLogModel: Model<SmsErrorLog>,
    private readonly smsTemplateService: SmsTemplateService,
  ) {}

  // async smsSqs(templateAttributes:any): Promise<any> {
  //     try{
  //         const templateInfo = await this.smsTemplateService.getsmstemplateDetail(templateAttributes);
  //
  //         const smsResponse = await smsSent(templateInfo);

  //         const SmsHitLog = new this.SmsHitLogModel({
  //             template_attributes: templateAttributes,

  //             sms_response: smsResponse,

  //         });

  //         await SmsHitLog.save();

  //         return {
  //            // message: "SMS processed successfully!",
  //             smsResponse
  //         };

  //     } catch(error){
  //         const smsErrorLog = new this.SmsErrorLogModel({
  //             order_id: templateAttributes.order_id,
  //             error: error.message,
  //             date_and_time: new Date().toISOString(),
  //           });
  //           await smsErrorLog.save();

  //           return {
  //             message : "An error occured while processing your request",
  //             error: error.message,
  //         };
  //     }

  // }
  // }
  async smsSqs(templateAttributes: any): Promise<any> {
    try {
      const templateInfo =
        await this.smsTemplateService.getsmstemplateDetail(templateAttributes);
      if (!templateInfo) {
        throw new Error('Template information not found');
      }

      const smsResponse = await smsSent(templateInfo);

      await this.createSmsHitLog(templateAttributes, smsResponse[0]);

      return {
        smsResponse,
      };
    } catch (error) {
      await this.createSmsErrorLog(templateAttributes.order_id, error.message);

      return {
        message: 'An error occurred while processing your request',
        error: error.message,
      };
    }
  }

  private async createSmsHitLog(
    reqObject: any,
    smsResponse: any,
  ): Promise<SmsHitLog> {
    const smsHitLog = new this.SmsHitLogModel({
      template_attributes: reqObject,
      sms_response: smsResponse,
      trigger_date_and_time: this.getTriggerDateAndTime(),
    });
    return await smsHitLog.save();
  }

  private async createSmsErrorLog(
    orderId: string,
    errorMsg: string,
  ): Promise<SmsErrorLog> {
    const smsErrorLog = new this.SmsErrorLogModel({
      order_id: orderId,
      error: errorMsg,
      date_and_time: this.getTriggerDateAndTime(),
    });
    return await smsErrorLog.save();
  }

  private getTriggerDateAndTime(): string {
    return new Date(Date.now() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .replace('Z', '+05:30');
  }
}
