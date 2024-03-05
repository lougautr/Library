import assert from 'assert';
import {getAuthorDetails } from '../openLibrary';

describe('getAuthorDetails', () => {
    it('should fetch author details from Open Library API', async () => {
      const authorDetail = await getAuthorDetails('/authors/OL23919A');
      assert.strictEqual(authorDetail.name, "J. K. Rowling");
      assert.ok(authorDetail.title);
      assert.ok(authorDetail.bio);
    });
  });
