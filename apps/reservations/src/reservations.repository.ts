import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDocument } from './reservations/models/reservation.model';
import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';

@Injectable()
export class ReservationRepository {
  protected readonly logger = new Logger('Reservation');

  constructor(
    @InjectModel('Reservation')
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(createReservationDto: ReservationDocument) {
    return await this.reservationModel.create(createReservationDto);
  }

  async findById(_id: string) {
    return await this.reservationModel.findById(_id);
  }

  async findOneAndUpdate(
    _id: string,
    updateReservationDto: UpdateReservationDto,
  ) {
    return await this.reservationModel.findByIdAndUpdate(
      _id,
      updateReservationDto,
      { new: true },
    );
  }

  async remove(_id: string) {
    return await this.reservationModel.findByIdAndDelete(_id);
  }

  async getAll() {
    return await this.reservationModel.find();
  }
}
