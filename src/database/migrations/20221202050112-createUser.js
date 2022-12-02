module.exports = {
  async up(db, client) {
    await db.createCollection('student')
      .then(() => {
        console.log("Collection student has been created!!!");
          return Promise.resolve();
        })
      .catch((err) => {
        console.log(err);
          return err;
        });

    await db.createCollection('facultySecretary')
      .then(() => {
        console.log("Collection facultySecretary has been created!!!");
          return Promise.resolve();
        })
      .catch((err) => {
        console.log(err);
          return err;
        });

    await db.createCollection('facultyViceDean')
      .then(() => {
        console.log("Collection facultyViceDean has been created!!!");
          return Promise.resolve();
        })
      .catch((err) => {
        console.log(err);
          return err;
        });
  },

  async down(db, client) {
    await db.dropCollection('student')
      .then(() => {
        console.log("Collection student has been dropped!!!");
          return Promise.resolve();
        })
      .catch((err) => {
        console.log(err);
          return err;
        });

    await db.dropCollection('facultySecretary')
      .then(() => {
        console.log("Collection facultySecretary has been dropped!!!");
          return Promise.resolve();
        })
      .catch((err) => {
        console.log(err);
          return err;
        });

    await db.dropCollection('facultyViceDean')
      .then(() => {
        console.log("Collection facultyViceDean has been dropped!!!");
          return Promise.resolve();
        })
      .catch((err) => {
        console.log(err);
          return err;
        });
  }
};
