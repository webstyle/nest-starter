import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest-starter')
    .setDescription('The nest starter API description')
    .setVersion('1.0')
    .build();