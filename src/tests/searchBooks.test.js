import assert from 'assert';
import { searchBooks, advancedSearchBooks} from '../openLibrary';

describe('searchBooks', () => {
  let numFoundBasic = null;
  let numFoundAdvanced = null;

  it('should fetch books from Open Library API', function(done) {
    this.timeout(10000); // Définit le délai d'attente global pour ce test

    searchBooks('Harry Potter').then((books) => {
      assert.ok(books);
      assert.ok(books.numFound);
      numFoundBasic = books.numFound;
      done(); // Indique à Mocha que le test est terminé
    }).catch((error) => {
      done(error); // Indique à Mocha qu'une erreur s'est produite
    });
  });

  it('should fetch books more precise from Open Library API', function(done) {
    this.timeout(10000); // Définit le délai d'attente global pour ce test
    const params = {
      title: 'Harry Potter',  // Utiliser le titre comme critère par défaut
      author: "",           // Ajouter des paramètres supplémentaires
      date: "",
      tags: "",
    };
    advancedSearchBooks(params).then((books) => {
      assert.ok(books);
      assert.ok(books.numFound);
      numFoundAdvanced = books.numFound;
      done(); // Indique à Mocha que le test est terminé
    }).catch((error) => {
      done(error); // Indique à Mocha qu'une erreur s'est produite
    });
  });

  it('should return more results for the basic search than the advanced search', async () => {
    assert(numFoundBasic > numFoundAdvanced);
  });
});
