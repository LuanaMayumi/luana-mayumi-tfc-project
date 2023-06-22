import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
import { matche, matches } from './mocks/Matche.mocks';
import MatchesModel from '../database/models/SequelizeMatchesModel'
import { Response } from 'superagent';
import * as JWT from 'jsonwebtoken'

chai.use(chaiHttp);

const { expect } = chai;


describe('/matches tests', () => {
  let chaiHttpResponse: Response;
  describe('GET /teams', () => {
    it('should find all matches', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(matches as any)
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matches)
    })
  })
  it('should update inProgress of matche', async () => {
    sinon.stub(MatchesModel, 'update').resolves([1] as any)
    sinon.stub(MatchesModel, 'findByPk').resolves(matche as any)
    sinon.stub(JWT, 'verify').returns({ role: 'user'} as any)

    const response = await chai.request(app).patch('/matches/1/finish').send().set('authorization', 'token')
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal(
      { message: 'Finished'})
  })

  it('should update a matche', async () => {
    sinon.stub(MatchesModel, 'update').resolves()
    sinon.stub(JWT, 'verify').returns({ role: 'user'} as any)
    const response = await chai.request(app).patch('/matches/1').send(
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      }
    ).set('authorization', 'token')
    console.log(response.body);
    
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal("Matche updated")
  })
  // it('should not possible create a matche that already exists', () => {

  //   expect(response.status).to.equal(422)
  //   expect(response.body).to.deep.equal('teste')
  // })
  afterEach(sinon.restore);
})