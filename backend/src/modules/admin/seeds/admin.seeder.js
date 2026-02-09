const Seeder = require('../../../database/seeders/Seeder');
const AdminServices = require('../services/admin.services');

class AdminSeeder extends Seeder {
    async run() {
        try {
            await this.log('Seeding admin users...');
            
            const adminServices = new AdminServices();
            
            const adminData = {
                email: 'charlygansou@gmail.com',
                password: 'Charlonie1#',
                firstName: 'Charly',
                lastName: 'Gansou',
                roles: ['admin'],
                    shouldSkipVerificationCode: true
            };
            
            // Check if admin already exists
            const existingAdmin = await adminServices.instanceAlreadyExist(adminData);
            if (existingAdmin) {
                await this.log(`Admin with email ${adminData.email} already exists`);
                return;
            }
            
            const admin = await adminServices.create(adminData);
                // Set account as active immediately
                await adminServices.Admin.updateOne(
                    { _id: admin._id },
                    { isActive: true }
                );
                await this.log(`✓ Admin created successfully with email: ${admin.email} (account activated)`);
            
        } catch (error) {
            await this.log(`✗ Error seeding admins: ${error.message}`);
            throw error;
        }
    }
}

module.exports = AdminSeeder;
