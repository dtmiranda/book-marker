import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e test', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  //To make sure the app will start with AppModule inject to the app
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      }),
    );

    await app.init();

    //Make sure to clean the testBd
    prisma = app.get(PrismaService)
    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });


})