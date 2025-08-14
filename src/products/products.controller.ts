import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { PaginationDto } from './../common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_product' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    //TODO: USE OBSERVABLES
    // return this.client.send({ cmd: 'find_one_product' }, { id }).pipe(
    //   catchError((err) => {
    //     throw new RpcException(err);
    //   }),
    // );

    //TODO: USE PROMISES
    try {
      const product = await firstValueFrom<Product>(
        this.client.send({ cmd: 'find_one_product' }, { id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await firstValueFrom<Product>(
        this.client.send({ cmd: 'create_product' }, createProductDto),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await firstValueFrom<Product>(
        this.client.send(
          { cmd: 'update_product' },
          { id, ...updateProductDto },
        ),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom<Product>(
        this.client.send({ cmd: 'delete_product' }, { id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
