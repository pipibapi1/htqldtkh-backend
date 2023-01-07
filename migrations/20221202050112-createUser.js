module.exports = {
  async up(db, client) {
    const collections = ['allocatedExpense', 'announcement', 'relevantPaper',
                        'council', 'expression', 'facultySecretary', 'facultyViceDean',
                        'form', 'instructor', 'student', 'paperTemplate',
                        'request', 'topic', 'topicCondition'] 
    let i;
    for (i = 0; i < collections.length; i++) {
      await db.createCollection(collections[i])
        .then(() => {
          console.log(`Collection ${collections[i]} has been created!!!`);
          return Promise.resolve();
        })
        .catch((err) => {
          console.log(err);
          return err;
        }); 
    }
  },

  async down(db, client) {
    const collections = ['allocatedExpense', 'announcement', 'relevantPaper',
                        'council', 'expression', 'facultySecretary', 'facultyViceDean',
                        'form', 'instructor', 'student', 'paperTemplate',
                        'request', 'topic', 'topicCondition'] 
    let i;
    for (i = 0; i < collections.length; i++) {
      await db.dropCollection(collections[i])
        .then(() => {
          console.log(`Collection ${collections[i]} has been dropped!!!`);
          return Promise.resolve();
        })
        .catch((err) => {
          console.log(err);
          return err;
        }); 
    }
  }
};
