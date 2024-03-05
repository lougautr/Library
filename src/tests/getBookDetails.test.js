import assert from 'assert';
import {getBookDetails} from '../openLibrary';

describe('getBookDetails', () => {
  it('should fetch book details from Open Library API', async () => {
    const bookDetails = await getBookDetails('OL82563W');
    
    assert.strictEqual(bookDetails.title, "Harry Potter and the Philosopher's Stone");
    assert.ok(bookDetails.authors);
    assert.ok(bookDetails.description);
    assert.ok(bookDetails.covers);

  });
});
