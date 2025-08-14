import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError();

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (rpcError.toString().includes('Empty response')) {
      const error = rpcError as string;
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error
          .toString()
          .substring(0, error.toString().indexOf('(') - 1),
      });
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status =
        typeof rpcError.status === 'number'
          ? rpcError.status
          : HttpStatus.BAD_REQUEST;
      return response.status(status).json(rpcError);
    }

    console.log(rpcError);

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: 'rpcError',
    });
  }
}
