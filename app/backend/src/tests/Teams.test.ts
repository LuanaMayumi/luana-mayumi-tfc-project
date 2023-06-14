import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { team, teams } from './mocks/Team.mocks';
import TeamsModel from '../database/models/SequelizeTeamsModel'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams testes', () => {
  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })
  describe('GET /teams', () => {
    it('should find all teams', async () => {
        sinon.stub(TeamsModel, 'findAll').resolves(teams as any)
        const response = await chai.request(app).get('/teams');
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(teams)
      // chaiHttpResponse = await chai
      //    .request(app)
      //    ...
  
      // expect(...)
    });

  })

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
