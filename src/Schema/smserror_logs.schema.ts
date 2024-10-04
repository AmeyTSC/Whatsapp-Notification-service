import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()

export class SmsErrorLog extends Document {
    @Prop()
    orderId: string;

    @Prop()
    errormsg: string;

    @Prop()
    date_and_time: string;
}

export const SmsErrorLogSchema = SchemaFactory.createForClass(SmsErrorLog);