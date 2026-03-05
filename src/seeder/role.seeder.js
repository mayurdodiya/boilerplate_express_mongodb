const Role = require('../models/role.model');
const { ROLE } = require('../utils/enums');

// Role seeder
module.exports = roleSeeder = async () => {
    try {
        for (let ele of ROLE) {
            console.log(ele,'-------------------')
            const alreadyExist = await Role.findOne({ role: ele.role });

            if (!alreadyExist) await Role.create({ role: ele.role });
        }

        console.log('✅ Role seeder run successfully...');
    } catch (error) {
        console.log('❌ Error from role seeder :', error);
    }
};
