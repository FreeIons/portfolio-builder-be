/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'user',
})
export class User {
  @Prop({ default: uuidv4 })
  _id: string;
  @Prop({ required: true, index: true })
  email: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  phone_number: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, default: true })
  is_active: boolean;
}

export const usersCollection = 'user';
export type UsersDocument = User & Document;
export const UsersSchema = SchemaFactory.createForClass(User);
