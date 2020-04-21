import { use, expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as functions from '../src';

use(sinonChai);

describe('Functions', () => {
  describe('helloVelox', () => {
    it('should send correct response', (done) => {
      const req = {
        body: {},
      };

      const res = {
        send: (_x: any) => {
          done();
        },
        status: (_x: any) => {
          done();
        },
      };

      sinon.spy(res, 'send');

      functions.helloVelox(req as any, res as any);

      expect(res.send).to.have.been.calledWith('Hello Velox!');
    });
  });
});
