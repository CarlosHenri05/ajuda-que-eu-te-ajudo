import { IsNotEmpty, IsEmail } from 'class-validator';

export class EmailBodyDto {
  @IsNotEmpty()
  @IsEmail()
  readonly to: string;

  @IsNotEmpty()
  @IsEmail()
  readonly from: string;

  @IsNotEmpty()
  readonly subject: string;

  @IsNotEmpty()
  readonly text: {
    readonly autor: string;

    readonly tipo_problema: string;

    readonly descricao: string;

    readonly imagem_url: string;

    readonly estado: string;

    readonly endereco: string;

    readonly cep: string;

    readonly criado_em: Date;
  };
}
