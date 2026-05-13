import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailTransaksiWaserdaService } from './detail-transaksi-waserda.service';

@Controller('detail-transaksi-waserda')
export class DetailTransaksiWaserdaController {
  constructor(private readonly detailTransaksiWaserdaService: DetailTransaksiWaserdaService) {}

}
