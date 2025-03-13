import { EntityType } from '../enums';

export function getEntityType(type: string): EntityType | null {
  if (type === 'POLYANET') return EntityType.POLYANETS;
  if (type.endsWith('_SOLOON')) return EntityType.SOLOONS;
  if (type.endsWith('_COMETH')) return EntityType.COMETHS;
  return null;
}
