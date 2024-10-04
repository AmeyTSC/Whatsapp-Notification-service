import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SmsLog } from 'src/Schema/sms_log.schema';
import { SMS_Template } from 'src/Schema/sms_template.schema';

@Injectable()
export class SmsSentService {
    constructor(@InjectModel('SmsLog') private SmsLogModel : Model<SmsLog>){}
    private computeTimeAndDate (): string {
        return new Date(Date.now() + 5.5 * 60 * 60 *1000)
        .toISOString()
        .replace('Z', '+05: 30');
    }

    //  async SmsLogCreation(smsResponse: any): Promise<SmsLog> {
    //      const timeAndDate = this.computeTimeAndDate();
    //      const NewLog = new this.SmsLogModel({
    //          ...smsResponse,
    //          timeAndDate,
    //      });

    //      try{
    //          return await NewLog.save();
    //      }catch(error){
    //          console.log('Failed to log SMS response:', error);
    //          throw error;
    //      }
    //  }
    async CreateSmsLog(smsResponse: SMS_Template): Promise<SmsLog> {
        const timeAndDate = this.computeTimeAndDate();
      
        const {
          phoneNo = "",                    
          customerName = "",               
          order_id = "",                    
          templateName = "",              
          awbNo = "",                                           
        } = smsResponse;
      
        
        const logData = {
          phoneNo,
          customerName,
          order_id,
          templateName,
          awbNo,                       
          timeAndDate,                     
        };
      
        const newLog = new this.SmsLogModel(logData);
      
        try {
          return await newLog.save();
        } catch (error) {
          console.error('Failed to log SMS response:', error);
          throw error;
        }
      }
      

    async SendSMS(template_attributes: SMS_Template): Promise<any> {
       
        try{
            await this.CreateSmsLog(template_attributes);
            return {
                statusCode: 200,
                message: "SMS sent successfully!",
            }
        }catch(error){
            return {
                statusCode: 500,
                error: "An error occured while processing your request.",
                details: error.message,
            }
        }
    }
}
