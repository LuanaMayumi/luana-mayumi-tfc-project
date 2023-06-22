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
  describe('GET /matches', () => {
    it('should find all matches', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(matches as any)
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matches)
    })
  })
  describe('PATCH /matches', () => {
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
  })

  describe('POST /matches', () => {
    it('should not possible create a matche with equal home and awayTeam Ids', async () => {
      sinon.stub(JWT, 'verify').returns({ role: 'user'} as any)
      const response = await chai.request(app).post('/matches').send(
        {
          "homeTeamId": 1, 
          "awayTeamId": 1,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        }
      ).set('authorization', 'token')
      expect(response.status).to.equal(422)
      expect(response.body).to.deep.equal({message: 'It is not possible to create a match with two equal teams'})
    })
    it('should not possible create a matche with HomeId that doesnt exists', async () => {
      // fazer o login
      sinon.stub(MatchesModel, 'findByPk').onFirstCall().resolves(null).onSecondCall().resolves(matche as any)
      
      sinon.stub(JWT, 'verify').returns({ role: 'user'} as any)
      const response = await chai.request(app).post('/matches').send(
        {
          "homeTeamId": 99, 
          "awayTeamId": 3,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        }
      ).set('authorization', 'token')
      expect(response.status).to.equal(404)
      expect(response.body).to.deep.equal({message: 'There is no team with such id!'})
    })
    it('should not possible create a matche with AwayId that doesnt exists', async () => {
      sinon.stub(MatchesModel, 'findByPk').onFirstCall().resolves(matche as any).onSecondCall().resolves(null)
      
      sinon.stub(JWT, 'verify').returns({ role: 'user'} as any)
      const response = await chai.request(app).post('/matches').send(
        {
          "homeTeamId": 1, 
          "awayTeamId": 99,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        }
      ).set('authorization', 'token')
      expect(response.status).to.equal(404)
      expect(response.body).to.deep.equal({message: 'There is no team with such id!'})
    })
    it('should create a new Matche', async () => {
      sinon.stub(MatchesModel, 'create').resolves(matche as any)
      
      sinon.stub(JWT, 'verify').returns({ role: 'user'} as any)
      const response = await chai.request(app).post('/matches').send(
        {
          "homeTeamId": 2, 
          "awayTeamId": 6,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        }
      ).set('authorization', 'token')
      expect(response.status).to.equal(201)
      expect(response.body).to.deep.equal(matche)
    })

  })
  afterEach(sinon.restore);
})