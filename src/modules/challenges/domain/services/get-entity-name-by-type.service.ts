import { EntityType } from '../enums';

export class GetEntityTypeByNameService {
  execute(name: string): EntityType | null {
    if (name === 'POLYANET') return EntityType.POLYANETS;
    if (name.endsWith('_SOLOON')) return EntityType.SOLOONS;
    if (name.endsWith('_COMETH')) return EntityType.COMETHS;
    return null;
  }
}
