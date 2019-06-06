db.transaction((txn) => {
    console.warn("first question query")
    txn.executeSql('SELECT * FROM questions', [], (tx, res) => {
        for (let i = 0; i < res.rows.length; i++) {
            console.warn(res.rows.item(i))
        }
    });

    // txn.executeSql('DROP TABLE IF EXISTS questions', []);
    // txn.executeSql('DROP TABLE IF EXISTS answers', []);
    // txn.executeSql('DROP TABLE IF EXISTS options', []);
    // txn.executeSql('DROP TABLE IF EXISTS schools', []);

    txn.executeSql(`CREATE TABLE IF NOT EXISTS questions(
        question_id INTEGER PRIMARY KEY NOT NULL, 
        question_text VARCHAR(500), 
        subject_id INTEGER, 
        question_explanation VARCHAR(500), 
        answer_id INTEGER, 
        school_name VARCHAR(100))`, [], (txn, res) => {
            console.warn("question table created")
        });

    txn.executeSql(`CREATE TABLE IF NOT EXISTS answers(
        answer_id INTEGER PRIMARY KEY NOT NULL,
        question_id INTEGER,
        option_id INTEGER,
        option_text VARCHAR(100))`, [], (txn, res) => {
            console.warn('answer table created')
        });

    txn.executeSql(`CREATE TABLE IF NOT EXISTS schools(
        school_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        school_name	VARCHAR(100))`, [], (txn, res) => {
            console.warn('school table created')
        });

    txn.executeSql(`CREATE TABLE IF NOT EXISTS options(
        option_id INTEGER PRIMARY KEY NOT NULL,
        option_text	VARCHAR(100),
        question_id	INTEGER)`, [], (txn, res) => {
            console.warn('option table created')
        });


    txn.executeSql(`INSERT INTO schools(school_name) VALUES (:school_name)`, [schoolName], function (tx, res) {
        console.warn("inserted schools")

    });
    txn.executeSql('SELECT * FROM answers', [], (tx, res) => {
        for (let i = 0; i < res.rows.length; i++) {
            console.warn(res.rows.item(i))
        }
    });
    txn.executeSql('SELECT * FROM schools', [], (tx, res) => {
        for (let i = 0; i < res.rows.length; i++) {
            console.warn(res.rows.item(i))
        }
    });
    txn.executeSql('SELECT * FROM options', [], (tx, res) => {
        for (let i = 0; i < res.rows.length; i++) {
            console.warn(res.rows.item(i))
        }
    });
    txn.executeSql('SELECT * FROM questions', [], (tx, res) => {
        for (let i = 0; i < res.rows.length; i++) {
            console.warn(res.rows.item(i))
        }
    });


    response.data.map(data => {
        data.options.map(async opt => {
            await txn.executeSql(`INSERT INTO answers(answer_id, question_id, option_id, option_text) VALUES (:answer_id, :question_id, :option_id, :option_text)`, [data.answer.id, opt.q_id, opt.id, opt.option_text], function (txn, res) {
                console.warn("inserted answers")

            });
            await txn.executeSql(`INSERT INTO options(option_id, option_text, question_id) VALUES (:option_id, :option_text, :question_id)`, [opt.id, opt.option_text, opt.q_id], function (txn, res) {
                console.warn("inserted options")
            });
        })
        txn.executeSql(`INSERT INTO questions(question_id, question_text, subject_id, question_explanation, answer_id, school_name) VALUES (:question_id, :question_text, :subject_id, :question_explanation, :answer_id,  :school_name)`, [data.id, data.question, data.subject_id, data.explanation, data.answer.id, schoolName], function (txn, res) {
            console.warn("inserted questions")
        });
    })
});


//subjects
