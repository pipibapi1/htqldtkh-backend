module.exports = {
  async up(db, client) {
    await db.createCollection('student');
    await db.createCollection('facultySecretary');
    await db.createCollection('facultyViceDean');
  },

  async down(db, client) {
    await db.dropCollection('ftudent');
    await db.dropCollection("facultySecretary");
    await db.dropCollection("facultyViceDean");
  }
};
