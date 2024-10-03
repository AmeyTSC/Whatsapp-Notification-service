import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { format } from 'date-fns-tz';

@Schema()
export class WhatsappLog extends Document {

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Object, default: {} })
  details: object;

  @Prop({ required: true })
  whatsappId: string;

  @Prop({ required: true })
  whatsappstatus: string;

  @Prop({ type: Object, default: {} })
  template_attributes: object;

  @Prop({ type: Object, default: () => ({
    success_status: "No",
    sent_status: "No",
    read_status: "No",
    other_status: "No",
    unknownSubscriber_status: "No",
    deferred_status: "No",
    blockedForUser_status: "No",
    twentyFourHourExceeded_status: "No",
    errorcode: ""
  }) })
  gupshupattribute: object;

  @Prop({ default: () => getISTTime() })  // ISO string with timezone
  created_at: string;
  
  @Prop({ default: () => getFormattedDate() })  // Formatted date (yyyy-MM-dd)
  date: string;  
}

export const WhatsappLogSchema = SchemaFactory.createForClass(WhatsappLog);

function getISTTime(): string {
  return new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
    .toISOString()
    .replace('Z', '+05:30');  
}

function getFormattedDate(): string {
  const timeZone = 'Asia/Kolkata';
  return format(new Date(), 'yyyy-MM-dd', { timeZone });  
}
