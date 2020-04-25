import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as test from 'firebase-functions-test';
import { use, expect } from 'chai';

import { db } from '../utils';
import { SignUpData } from '../interfaces';
import * as functions from '../handlers';

const testSuite = test();

use(sinonChai);

const MOCK_SIGNUP: SignUpData = {
  email: 'timo@testing.com',
  password: 'testing',
  confirmPassword: 'testing',
  username: 'timo',
};

const mockRequest = (body: any, sessionData = {}) =>
  ({
    session: { data: sessionData },
    body,
  } as any);

const mockResponse = () => {
  const res = {} as any;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe('Functions', () => {
  let adminInitStub: any;
  let dbStub: any;
  let authStub: any;
  let clock: any;

  before(() => {
    adminInitStub = sinon.stub(admin, 'initializeApp');
    dbStub = sinon.stub(db, 'doc').get(() => () => ({ get: () => sinon.stub(), set: () => sinon.stub() }));
    authStub = sinon
      .stub(firebase.auth(), 'createUserWithEmailAndPassword')
      .resolves({ user: { getIdToken: () => 'mock', uid: 'mock-uid' } } as any);
    clock = sinon.useFakeTimers({ now: 1483228800000 });
  });

  after(() => {
    adminInitStub.restore();
    dbStub.restore();
    authStub.restore();
    clock.restore();
    sinon.restore();
    testSuite.cleanup();
  });

  describe('signUp', () => {
    it('should pass with valid signup data and return correct response', async () => {
      const req = mockRequest(MOCK_SIGNUP);
      const res = mockResponse();

      await functions.signUp(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        token: 'mock',
        user: {
          email: MOCK_SIGNUP.email,
          username: MOCK_SIGNUP.username,
          uid: 'mock-uid',
          createdAt: '2017-01-01T00:00:00.000Z',
        },
      });
    });

    it('should fail when passwords does not match', async () => {
      const req = mockRequest({ ...MOCK_SIGNUP, confirmPassword: 'wrong' });
      const res = mockResponse();

      await functions.signUp(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });

    it('should fail when username is not defined', async () => {
      const req = mockRequest({ ...MOCK_SIGNUP, username: undefined });
      const res = mockResponse();

      await functions.signUp(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });

    it('should fail when email is not defined', async () => {
      const req = mockRequest({ ...MOCK_SIGNUP, email: undefined });
      const res = mockResponse();

      await functions.signUp(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });

    it('should fail when password is empy', async () => {
      const req = mockRequest({ ...MOCK_SIGNUP, password: '' });
      const res = mockResponse();

      await functions.signUp(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });
  });
});
