import { GetOptionsByEntityNameService } from '@modules/challenges/domain';
import { Color, Direction } from '@modules/api-client';

describe('GetOptionsByEntityNameService', () => {
  let service: GetOptionsByEntityNameService;

  beforeEach(() => {
    service = new GetOptionsByEntityNameService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when execute method is called', () => {
    it('should return empty options for POLYANET', () => {
      const result = service.execute('POLYANET');
      expect(result).toEqual({});
    });

    it('should return empty options for SPACE', () => {
      const result = service.execute('SPACE');
      expect(result).toEqual({});
    });

    describe('with SOLOON entities', () => {
      it('should return blue color for BLUE_SOLOON', () => {
        const result = service.execute('BLUE_SOLOON');
        expect(result).toEqual({ color: Color.BLUE });
      });

      it('should return red color for RED_SOLOON', () => {
        const result = service.execute('RED_SOLOON');
        expect(result).toEqual({ color: Color.RED });
      });

      it('should return purple color for PURPLE_SOLOON', () => {
        const result = service.execute('PURPLE_SOLOON');
        expect(result).toEqual({ color: Color.PURPLE });
      });

      it('should return white color for WHITE_SOLOON', () => {
        const result = service.execute('WHITE_SOLOON');
        expect(result).toEqual({ color: Color.WHITE });
      });
    });

    describe('with COMETH entities', () => {
      it('should return up direction for UP_COMETH', () => {
        const result = service.execute('UP_COMETH');
        expect(result).toEqual({ direction: Direction.UP });
      });

      it('should return down direction for DOWN_COMETH', () => {
        const result = service.execute('DOWN_COMETH');
        expect(result).toEqual({ direction: Direction.DOWN });
      });

      it('should return left direction for LEFT_COMETH', () => {
        const result = service.execute('LEFT_COMETH');
        expect(result).toEqual({ direction: Direction.LEFT });
      });

      it('should return right direction for RIGHT_COMETH', () => {
        const result = service.execute('RIGHT_COMETH');
        expect(result).toEqual({ direction: Direction.RIGHT });
      });
    });

    it('should return empty options for unknown entity type', () => {
      const result = service.execute('UNKNOWN_ENTITY');
      expect(result).toEqual({});
    });

    it('should return empty options for empty string', () => {
      const result = service.execute('');
      expect(result).toEqual({});
    });
  });
});
