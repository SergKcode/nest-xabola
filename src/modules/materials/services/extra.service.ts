import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateExtraDto } from '../dto/create-extra.dto';
import { UpdateExtraDto } from '../dto/update-extra.dto';
import { Observable, catchError, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Extra } from '../entities/extras.entity';
import { Repository } from 'typeorm';
import { ExtraType } from '../models/extra.model';

@Injectable()
export class ExtrasService {
  private readonly _logger = new Logger(ExtrasService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Extra) private _extraRepository: Repository<Extra>,
  ) {}

  createExtra(extra: CreateExtraDto) {
    this._logger.debug(`Creating new extra`);
    return from(this._extraRepository.save(extra)).pipe(
      catchError((error) => {
        this._logger.error(`Error saving in DB`, error);
        throw new HttpException(
          { message: `Ocurrió un error: ${error}` },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }

  findAll() {
    this._logger.debug(`Getting all extras`);
    return from(this._extraRepository.find()).pipe(
      catchError((error) => {
        this._logger.error(`Error getting all extras`, error);
        throw new HttpException(
          { message: `Ocurrió un error: ${error}` },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }

  getExtraByType(type: ExtraType): Observable<Extra[]> {
    this._logger.log(`Getting extras by type ${type}`);
    return from(
      this._extraRepository.createQueryBuilder().where({ type }).getMany()
    ).pipe(
      catchError((error) => {
        this._logger.error(`Error getting all extras`, error);
        console.log(error)
        throw new HttpException(
          { message: `Ocurrió un error: ${error}` },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} material`;
  }

  update(id: number, updateMaterialDto: UpdateExtraDto) {
    return `This action updates a #${id} material`;
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}