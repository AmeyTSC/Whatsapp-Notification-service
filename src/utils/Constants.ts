import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

const userid = process.env.SMSG_USERID || '2000197692';
const userpwd = process.env.SMSG_PASSWORD || '9LzraftQ';

export const credentials = {
  url: `https://media.smsgupshup.com/GatewayAPI/rest?userid=${userid}&password=${userpwd}&send_to=`,
};
