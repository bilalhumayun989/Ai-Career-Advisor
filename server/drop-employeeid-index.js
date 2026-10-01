const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const coll = mongoose.connection.db.collection('users');
    const indexes = await coll.indexes();
    console.log('Indexes:', JSON.stringify(indexes, null, 2));
    const index = indexes.find((i) => i.name === 'employeeId_1');
    if (index) {
      await coll.dropIndex('employeeId_1');
      console.log('Dropped index: employeeId_1');
    } else {
      console.log('No employeeId_1 index found');
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();