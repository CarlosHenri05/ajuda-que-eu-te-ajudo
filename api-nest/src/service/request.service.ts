import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ReportDto, ReportResponse } from 'src/dto/report.dto';
import { stateAndEmailMap } from 'src/common/constants/states.hashMap';

@Injectable()
export class RequestService {
  constructor(private readonly httpService: HttpService) {}

  async imageServiceRequest(imageUrl: string): Promise<ReportResponse> {
    try {
      const imageValidatorResponse = await firstValueFrom(
        this.httpService.get('http://127.0.0.1:8000/validate', {
          params: {
            image_url: imageUrl,
          },
        }),
      );

      return {
        approved: !!imageValidatorResponse?.data.approved,
        message: imageValidatorResponse?.data.message,
      };
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong with imageService, try again.',
      );
    }
  }

  async emailServiceRequest(emailBody: ReportDto): Promise<ReportResponse> {
    try {
      if (!emailBody.enviar_email) {
        return {
          approved: true,
          message: "User didn't want to send e-mail",
        };
      }
      const emailServiceResponse = await firstValueFrom(
        this.httpService.post('http://127.0.0.1:3001/send', {
          subject: 'Nova denúncia',
          to: stateAndEmailMap.get(emailBody.estado),
          text: JSON.stringify(emailBody),
        }),
      );

      const sucesso = emailServiceResponse?.status == 201;

      return {
        approved: sucesso,
        message: sucesso
          ? 'Everything went right.'
          : 'Something happened to emailService, try again.',
      };
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong with emailService, try again.',
      );
    }
  }
}
