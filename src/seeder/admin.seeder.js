const { ROLE } = require('../utils/enums');
const { User, Role } = require('../models');
const config = require('../config/config');

// admin seeder. 
module.exports = adminSeeder = async () => {
  const role = await Role.findOne({ role: ROLE.ADMIN });

  try {
    const adminExist = await User.findOne({ email: config.ADMIN.EMAIL });

    if (!adminExist) {
      await User.create({
        firstName: config.ADMIN.FIRST_NAME,
        lastName: config.ADMIN.LAST_NAME,
        email: config.ADMIN.EMAIL,
        password: config.ADMIN.PASSWORD,
        roleId: role._id,
        isEmailVerified: true,
      });
    }

    console.log('✅ Admin seeder run successfully...');
  } catch (error) {
    console.log('❌ Error from admin seeder :', error);
  }
};
