import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum'
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';

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
    await app.listen(3210)

    //Make sure to clean the testBd
    prisma = app.get(PrismaService)
    await prisma.cleanDb;

    pactum.request.setBaseUrl('http://localhost:3210')
  });

  afterAll(() => {
    app.close();
  });


  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'catxupa@mail.com',
      password: 'test'
    }
    describe('Signup', () => {
      it('Should throw exception if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup',)
          .withBody({
            password: dto.password
          })
          .expectStatus(400)
      });

      it('Should throw exception if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup',)
          .withBody({
            email: dto.email
          })
          .expectStatus(400)
      });

      it('Should throw exception if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup',)
          .expectStatus(400)
      });

      it('Should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup',)
          .withBody(dto)
          .expectStatus(201)
        //.inspect()///To see the output
      })
    })
    describe('Signin', () => {
      it('Should throw exception if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin',)
          .withBody({
            password: dto.password
          })
          .expectStatus(400)
      });

      it('Should throw exception if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin',)
          .withBody({
            email: dto.email
          })
          .expectStatus(400)
      });

      it('Should throw exception if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin',)
          .expectStatus(400)
      });

      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin',)
          .withBody(dto)
          .expectStatus(200)
          //.inspect()///To see the output
          .stores('userAccessToken', 'access_token') //pickup access_token end put in userAccessToken
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {
      it('Should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}'
          })
          .expectStatus(200)
      })
    })
    describe('Edit User', () => {
      it.todo('Should edit user')
    })

  })

  describe('BookMarks', () => {
    describe('Create bookmark', () => { })
    describe('Get bookmark', () => { })
    describe('Get bookmark by id', () => { })
    describe('Edit bookmark', () => { })
    describe('Delete bookmark', () => { })

  })

})