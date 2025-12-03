import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersService } from './app/users/users.service';

async function seedDefaultUser(app) {
  const usersService = app.get(UsersService);

  const defaultUser = {
    name: 'Administrator',
    email: 'admin@liteclerk.com',
    username: 'admin',
    password: '1234',
    role: 'admin',
  };

  const exists = await usersService.findOneByUsername(defaultUser.username);
  if (!exists) {
    await usersService.create(defaultUser);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Template API NestJS')
    .setDescription('Template API NestJS documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await seedDefaultUser(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
