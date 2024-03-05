import assert from 'assert';
import { getRecentChanges } from '../openLibrary';

describe('getRecentChanges', () => {
    it('should fetch recent changes from Open Library API', async () => {
        const firstChange = {"id": "129915966", "kind": "update", "timestamp": "2024-02-29T23:59:51.705717", "comment": "updating user preferences", "changes": [{"key": "/people/thayna_christina/preferences", "revision": 1}], "author": {"key": "/people/thayna_christina"}, "ip": null, "data": {}}
        const recentchanges = await getRecentChanges("2024", "02");
        assert.deepStrictEqual(recentchanges[0], firstChange);
      });
});