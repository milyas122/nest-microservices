import { Injectable, Inject } from '@nestjs/common';
import { CreateReservationDto } from './reservations/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.paymentsService
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map(async (res) => {
          console.log('Strip Payment Successful', res);

          return await this.reservationRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            userId,
          });
        }),
      );
  }

  async findAll() {
    return await this.reservationRepository.getAll();
  }

  async findOne(_id: string) {
    return await this.reservationRepository.findById(_id);
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepository.findOneAndUpdate(id, {
      ...updateReservationDto,
    });
  }

  async remove(id: string) {
    return await this.reservationRepository.remove(id);
  }
}
