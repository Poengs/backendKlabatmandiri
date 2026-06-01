import { Injectable } from '@nestjs/common';
import { CreatePerubahanDto } from './dto/create-perubahan.dto';
import { UpdatePerubahanDto } from './dto/update-perubahan.dto';

@Injectable()
export class PerubahanService {
  create(createPerubahanDto: CreatePerubahanDto) {
    return 'This action adds a new perubahan';
  }

  findAll() {
    return `This action returns all perubahan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perubahan`;
  }

  update(id: number, updatePerubahanDto: UpdatePerubahanDto) {
    return `This action updates a #${id} perubahan`;
  }

  remove(id: number) {
    return `This action removes a #${id} perubahan`;
  }
}
