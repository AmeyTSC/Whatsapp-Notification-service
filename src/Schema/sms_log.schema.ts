import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SmsLog extends Document {
 

  @Prop()
  phoneNo: string;

  @Prop()
  customerName: string;

  @Prop()
  orderId: string;

  @Prop({required: true})
  templateName: string;

  @Prop()
  awbNo: string;

  @Prop()
  timeAndDate: string;
}

export const SmsLogSchema = SchemaFactory.createForClass(SmsLog);
