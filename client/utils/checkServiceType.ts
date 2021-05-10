import { Service, IMainService, IAdditionalService } from '../types/services'

export const isMainService = (object: Service): object is IMainService => {
  return 'includes' in object;
}

export const isAdditionalService = (object: Service): object is IAdditionalService => {
  return 'options' in object;
}