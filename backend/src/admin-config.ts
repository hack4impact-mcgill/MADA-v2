
import { UserEntity } from './entities/UserEntity';
import { VolunteerEntity } from './entities/VolunteerEntity';
import { TaskEntity } from './entities/TaskEntity';
import { ClientEntity } from './entities/ClientEntity';
import { AdminEntity } from './entities/AdminEntity';
import { MealDeliveryEntity } from './entities/MealDeliveryEntity';

// Icons: https://carbondesignsystem.com/guidelines/icons/library/
const usersNavCollapse = {
    name: "Users",
    icon: "User"
}

const resourcesNavCollapse = {
    name: "Resources",
    icon: "Archive"
}

export const adminConfig = {
    resources: [
        // don't think this is smth used by itself?
        // {
        //     resource: UserEntity,
        //     options: {
        //         id: "Users",
        //         navigation: usersNavigation,
        //     }
        // },
        {
            resource: VolunteerEntity,
            options: {
                navigation: usersNavCollapse,
            }
        },
        {
            resource: TaskEntity,
            options: {
                navigation: resourcesNavCollapse,
            }
        },
        {
            resource: MealDeliveryEntity,
            options: {
                navigation: resourcesNavCollapse,
            }
        },
        {
            resource: ClientEntity,
            options: {
                navigation: usersNavCollapse,
            }
        },
        {
            resource: AdminEntity,
            options: {
                navigation: usersNavCollapse,
            }
        },
    ]
}