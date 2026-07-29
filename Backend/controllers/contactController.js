const pool = require('../config/db');

// GET /contact
exports.getAllContacts = async (req, res) => {
    try {
        const result = await pool.query('select * from contact');
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
};

// GET /contactbyId
exports.getContactById = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await pool.query('select * from contact where id=$1', [id]);
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
};

// DELETE /contactDelById
exports.deleteContactById = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await pool.query('Delete from contact where id=$1', [id]);
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
};

// POST /addcontact
exports.addContact = async (req, res) => {
    try {
        const { name, email, mob, age, city } = req.body;
        const result = await pool.query(
            'insert into Contact(name,email,mob,age,city) VALUES ($1,$2,$3,$4,$5) RETURNING * ',
            [name, email, mob, age, city]
        );
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
};

// PUT /updcontact
exports.updateContact = async (req, res) => {
    try {
        const { name, email, mob, age, city, id } = req.body;
        const result = await pool.query(
            'update contact set name=$1,email=$2,mob=$3,age=$4,city=$5 where id=$6 RETURNING * ',
            [name, email, mob, age, city, id]
        );
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
};

// PATCH /patchcontact
exports.patchContact = async (req, res) => {
    try {
        const { name, id } = req.body;
        const result = await pool.query(
            'update contact set name=$1 where id=$2 RETURNING * ',
            [name, id]
        );
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
};
