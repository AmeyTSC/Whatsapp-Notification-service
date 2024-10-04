import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SmsSentController } from './sms_sent.controller';
import { SmsSentService } from './sms_sent.service';
import { SmsLogSchema } from 'src/Schema/sms_log.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'SmsLog', schema: SmsLogSchema}])],
    controllers: [SmsSentController],
    providers: [SmsSentService]
})
export class SmsSentModule {}
