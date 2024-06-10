import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import * as path from 'path';
import { parse } from 'yaml';

export const setupSwagger = (app: INestApplication) => {
  const filePath = path.resolve(process.cwd(), 'doc/api.yaml');

  const apiYaml = readFileSync(filePath, 'utf8');
  const document = parse(apiYaml);

  app.use('api-docs-json', (_: Request, res: Response) => {
    res.json(document);
  });

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { tryItOutEnabled: true, persistAuthorization: true },
  });
};
