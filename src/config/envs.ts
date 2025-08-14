// npm i dotenv joi
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  // PRODUCTS_MICROSERVICES_HOST: string;
  // PRODUCTS_MICROSERVICES_PORT: number;
  // ORDERS_MICROSERVICES_HOST: string;
  // ORDERS_MICROSERVICES_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    // PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    // PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    // ORDERS_MICROSERVICES_HOST: joi.string().required(),
    // ORDERS_MICROSERVICES_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
}) as {
  error?: joi.ValidationError;
  value: EnvVars;
};

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars = value;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  // productsMicroservicesHost: envVars.PRODUCTS_MICROSERVICES_HOST,
  // productsMicroservicesPort: envVars.PRODUCTS_MICROSERVICES_PORT,
  // ordersMicroservicesHost: envVars.ORDERS_MICROSERVICES_HOST,
  // ordersMicroservicesPort: envVars.ORDERS_MICROSERVICES_PORT,
};
