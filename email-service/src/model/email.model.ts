import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Estado {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}

@Schema()
export class Email extends Document {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  subject: string;

  @Prop({
    required: true,
    type: {
      autor: String,
      tipo_problema: String,
      descricao: String,
      imagem_url: String,
      estado: { type: String, enum: Object.values(Estado) },
      endereco: String,
      cep: String,
      criado_em: Date,
    },
  })
  text: {
    autor: string;
    tipo_problema: string;
    descricao: string;
    imagem_url: string;
    estado: Estado;
    endereco: string;
    cep: string;
    criado_em: Date;
  };

  @Prop({ required: true })
  replyTo: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
