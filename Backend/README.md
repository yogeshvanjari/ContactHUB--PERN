# Contact API (MVC structure)

## Folder structure
```
contact-api/
├── app.js                     # Entry point, wires everything together
├── package.json
├── .env                       # Real DB credentials (not committed)
├── .env.example                # Template for required env vars
├── .gitignore
├── config/
│   └── db.js                  # PostgreSQL connection pool
├── controllers/
│   └── contactController.js   # Route handler logic (the "C" in MVC)
├── routes/
│   └── contactRoutes.js       # Route definitions, mapped to controllers
└── middleware/
    └── cors.js                 # CORS headers middleware
```

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your real DB credentials (already done in `.env` here).
3. `npm start` (or `npm run dev` with nodemon)

## Endpoints (unchanged from original — frontend integration preserved)
- `GET /` — health check
- `GET /contact` — list all contacts
- `GET /contactbyId` — fetch contact by id (id passed in request body)
- `DELETE /contactDelById` — delete contact by id (id passed in request body)
- `POST /addcontact` — create contact
- `PUT /updcontact` — full update
- `PATCH /patchcontact` — update name only

## Notes
- No "models/" layer was added since raw SQL queries are run directly against `pg.Pool` — there's no ORM model to represent. If you want a true M in MVC, this is normally where a query-builder or ORM (Knex, Sequelize, Prisma) layer would sit.
- `GET /contactbyId` and `DELETE /contactDelById` read `id` from the request body, which is unconventional for GET/DELETE (usually a route param like `/contact/:id` or a query string is used instead). Kept as-is to match your existing frontend calls — flagging it in case you control the frontend too and want to switch to a more RESTful pattern later.
- Error responses currently return the literal string `'{status:401}'` (not valid JSON, and misleadingly named — the actual HTTP status sent is 500, not 401). Kept unchanged to avoid breaking frontend error handling that may already expect this exact string.
