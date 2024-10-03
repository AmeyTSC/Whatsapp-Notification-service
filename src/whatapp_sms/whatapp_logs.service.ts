import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WhatsappLog } from 'src/Schema/logs-attributes.schema';
import { Model } from 'mongoose';

@Injectable()
export class Whatsapp_logs {
  constructor(
    @InjectModel(WhatsappLog.name) private WhatsappLog: Model<WhatsappLog>,
  ) {}

  async createLog(
    whatsapp_response: any,
    template_attributes: any,
  ): Promise<WhatsappLog> {
    try {
      const {
        phone,
        details,
        id: whatsappId,
        status: whatsappstatus,
      } = whatsapp_response.response;
      
      const logData = {
        phone,
        details,
        whatsappId,
        whatsappstatus,
        template_attributes,
      };

      const log = new this.WhatsappLog(logData);
      return log.save();
    } catch (error) {
      throw new Error(`Error logging WhatsApp response: ${error.message}`);
    }
  }
}
