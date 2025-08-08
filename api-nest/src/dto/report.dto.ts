import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Estado } from 'generated/prisma';

export class ReportDto {
  @IsNotEmpty()
  @IsString()
  readonly autor: string;

  @IsNotEmpty()
  @IsString()
  readonly tipo_problema: string;

  @IsNotEmpty()
  @IsString()
  readonly descricao: string;

  @IsNotEmpty()
  @IsString()
  readonly imagem_url: string;

  @IsNotEmpty()
  @IsEnum(Estado)
  readonly estado: Estado;

  @IsNotEmpty()
  @IsString()
  readonly endereco: string;

  @IsNotEmpty()
  @IsString()
  readonly cep: string;

  @IsNotEmpty()
  @IsDate()
  criado_em: Date;

  @IsNotEmpty()
  @IsBoolean()
  enviar_email: boolean;
}

export interface ReportResponse {
  approved: boolean;
  message: string;
}
