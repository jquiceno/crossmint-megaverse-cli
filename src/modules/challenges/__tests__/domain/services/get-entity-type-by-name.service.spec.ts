import {
  GetEntityTypeByNameService,
  EntityType,
} from '@modules/challenges/domain';

describe('GetEntityTypeByNameService', () => {
  let service: GetEntityTypeByNameService;

  beforeEach(() => {
    service = new GetEntityTypeByNameService();
  });

  describe('when execute method is called', () => {
    it('should return POLYANETS for POLYANET', () => {
      const result = service.execute('POLYANET');
      expect(result).toBe(EntityType.POLYANETS);
    });

    it('should return SOLOONS for BLUE_SOLOON', () => {
      const result = service.execute('BLUE_SOLOON');
      expect(result).toBe(EntityType.SOLOONS);
    });

    it('should return COMETHS for UP_COMETH', () => {
      const result = service.execute('UP_COMETH');
      expect(result).toBe(EntityType.COMETHS);
    });

    it('should return null for unknown entity type', () => {
      const result = service.execute('UNKNOWN');
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      const result = service.execute('');
      expect(result).toBeNull();
    });
  });
});
