import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DateRange {
  @Prop()
  start: string;  

  @Prop()
  end: string;
}

@Schema()
export class TemplateAttributes extends Document {
  @Prop()
  phoneNo: string;

  @Prop()
  customerName: string;

  @Prop()
  order_id: string;

  
  @Prop({ type: DateRange }) 
  dateRange: DateRange;

  @Prop({ required: true })
  templateName: string;

  @Prop()
  trackURL: string;

  @Prop()
  invoiceUrl: string;

  @Prop()
  hours: string;

  @Prop()
  productName: string;

  @Prop()
  youtubeUrl: string;
}

export const TemplateAttributesSchema = SchemaFactory.createForClass(TemplateAttributes);
