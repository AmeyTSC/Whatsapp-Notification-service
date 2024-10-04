import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()

export class SMS_Template extends Document {
@Prop()
phoneNo: string;

@Prop()
customerName: string;

@Prop()
order_id: string;

@Prop({required: true})
templateName: string;

@Prop()
awbNo: string;
}

export const SMS_TemplateSchema = SchemaFactory.createForClass(SMS_Template);