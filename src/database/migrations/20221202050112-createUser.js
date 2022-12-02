module.exports = {
  async up(db, client) {
    await db.createCollection('Student');
    await db.createCollection('FacultySecretary');
    await db.createCollection('FacultyViceDean');
  },

  async down(db, client) {
    await db.dropCollection('Student');
    await db.dropCollection("FacultySecretary");
    await db.dropCollection("FacultyViceDean");
  }
};
