import { IsNotEmpty } from 'class-validator';
import { Estado } from 'generated/prisma';

export class ReportDto {
  @IsNotEmpty()
  readonly autor: string;

  @IsNotEmpty()
  readonly tipo_problema: string;

  @IsNotEmpty()
  readonly descricao: string;

  @IsNotEmpty()
  readonly imagem_url: string;

  @IsNotEmpty()
  readonly estado: Estado;

  @IsNotEmpty()
  readonly endereco: string;

  @IsNotEmpty()
  readonly cep: string;

  @IsNotEmpty()
  criado_em: Date;
}
