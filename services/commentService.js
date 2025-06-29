const jwt = require('jsonwebtoken');
const SECRET = require('../secret').secret;

async function saveCommentLogic({ token, station_id, comment, parent_id }, db) {
    if (!token || !station_id || !comment) {
        return {
            status: 400,
            body: {message: 'Datos incompletos'}
        };
    }

    let payload;
    try {
        payload = jwt.verify(token, SECRET);
    } catch {
        return {
            status: 401,
            body: {message: 'Token inválido'}
        };
    }

    try {
        await new Promise((resolve, reject) =>
            db.run(
                'INSERT INTO comments (station_id, user_id, username, comment, parent_id) VALUES (?, ?, ?, ?, ?)',
                [station_id, payload.id, payload.username, comment, parent_id || null],
                (err) => (err ? reject(err) : resolve())
            )
        );

        return {
            status: 201,
            body: {message: 'Comentario guardado'}
        };
    } catch (err) {
        return {
            status: 500,
            body: {message: 'Error al guardar comentario', error: err.message}
        };
    }
}

async function getCommentsLogic(station_id, db) {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT id, username, comment, created_at, parent_id FROM comments WHERE station_id = ? ORDER BY created_at DESC',
            [station_id],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        status: 200,
                        body: rows
                    });
                }
            }
        );
    });
}

async function editCommentLogic({ token, comment }, id, db) {
    if (!token || !comment) {
        return {
            status: 400,
            body: { message: 'Datos incompletos' }
        };
    }

    let payload;
    try {
        payload = jwt.verify(token, SECRET);
    } catch {
        return {
            status: 401,
            body: { message: 'Token inválido' }
        };
    }

    await new Promise((resolve, reject) =>
        db.run(
            'UPDATE comments SET comment = ? WHERE id = ?',
            [comment, id],
            (err) => (err ? reject(err) : resolve())
        )
    );

    return {
        status: 200,
        body: { message: 'Comentario editado' }
    };
}

async function deleteCommentLogic({ token }, id, db) {
    if (!token) {
        return {
            status: 400,
            body: { message: 'Token requerido' }
        };
    }

    let payload;
    try {
        payload = jwt.verify(token, SECRET);
    } catch {
        return {
            status: 401,
            body: { message: 'Token inválido' }
        };
    }

    await new Promise((resolve, reject) =>
        db.run(
            'DELETE FROM comments WHERE id = ?',
            [id],
            (err) => (err ? reject(err) : resolve())
        )
    );

    return {
        status: 200,
        body: { message: 'Comentario eliminado' }
    };
}

async function getUserCommentsLogic(req, db) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return {
            status: 401,
            body: { message: 'Token no proporcionado' }
        };
    }

    const token = authHeader.split(' ')[1];

    let payload;
    try {
        payload = jwt.verify(token, SECRET);
    } catch {
        return {
            status: 401,
            body: { message: 'Token inválido' }
        };
    }

    const rows = await new Promise((resolve, reject) =>
        db.all(
            'SELECT * FROM comments WHERE user_id = ? ORDER BY created_at DESC',
            [payload.id],
            (err, rows) => (err ? reject(err) : resolve(rows))
        )
    );

    return {
        status: 200,
        body: rows
    };
}




module.exports = {saveCommentLogic, getCommentsLogic, editCommentLogic, deleteCommentLogic, getUserCommentsLogic};
