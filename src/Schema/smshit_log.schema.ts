import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()

export class SmsHitLog extends Document {

    @Prop()
    templateName: string;

    @Prop({type: Object})
    smsResponse: Record<string, any>;

    @Prop()
    trigger_date_and_time: string;
    
    
    @Prop({type: Object})
    template_attributes: Record<string, any>

    
}


export const SmsHitLogSchema = SchemaFactory.createForClass(SmsHitLog);