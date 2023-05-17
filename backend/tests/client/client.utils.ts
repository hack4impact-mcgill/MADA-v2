import { MealDeliveryEntity } from '../../src/entities/MealDeliveryEntity';
import { Repository } from 'typeorm';
import { TaskEntity } from '../../src/entities/TaskEntity';
import { MealType, ProgramType } from '../../src/entities/types';
import { ClientEntity } from '../../src/entities/ClientEntity';

type HelperCreateClientProps = {
    name?: string,
    email?: string,
    phoneNumber?: string,
    address?: string,
    mealType?: MealType,
    sts?: boolean,
    map?: boolean
}

export default class ClientEntityHelper {
  ClientRepository: Repository<ClientEntity>;

  constructor(repository: Repository<ClientEntity>) {
    this.ClientRepository = repository;
  }

  createClient = async (props: HelperCreateClientProps) => {
    const newClient = new ClientEntity();
    newClient.name = props.name || 'Test Client';
    newClient.email = props.email || 'email@email.com';
    newClient.phoneNumber = props.phoneNumber || '1234567890';
    newClient.address = props.address || '1234 Test Address';
    newClient.mealType = props.mealType || MealType.NOFISH;
    newClient.sts = typeof props.sts !== 'undefined' ? props.sts : true;
    newClient.map = typeof props.map !== 'undefined' ? props.map : true;
    return await this.ClientRepository.save(newClient);
  }
}
