// defineAbilities.js
import { AbilityBuilder, Ability } from '@casl/ability';

export const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  // Super-admin has full permissions
  if (user?.roleName === 'super-admin') {
    can('manage', 'all');
  } else if (user?.permissions && Array.isArray(user.permissions)) {
    // Iterate over the user's permissions and grant abilities
    // console.log("User Permissions:", user.permissions);
    user.permissions.forEach((permission) => {
      switch (permission) {
        case 'update order status':
          can('update', 'OrderStatus');
          break;
        case 'create orders':
          can('create', 'Order');
          break;
        case 'see role':
          can('read', 'roles');
          break;
        case 'see orders':
          can('read', 'Order');
          break;
        case 'createRoles':
          can('create', 'Role');
          break;
        case 'Add users':
          can('create', 'User');
          break;
        case 'deleteUser':
          can('delete', 'User');
          break;
        case 'addMenu':
          can('create', 'Menu');
          break;
        case 'changeUserStatus':
          can('update', 'UserStatus');
          break;
        case 'see users':
           can('view', 'User');
           break;  
        case 'role status':
           can('role', 'Status');
           break;  
        case 'update role':
            can('update', 'Role');
            break;
        case 'delete role':
              can('delete', 'Role');
              break;          
        default:
          // No action for unknown permissions
          break;
      }
    });
  } else {
    // Default permissions for non-authenticated users or other roles
    cannot('manage', 'all'); // No permissions
  }

  const ability = build();
  console.log("Defined Abilities:", ability.rules);
  return ability;
};

// "update order status",
// "create orders",
// "seeCustomers",
// "see orders",
// "createRoles",
// "Add users",
// "deleteUser",
// "addMenu",
// "changeUserStatus"