\c postgres
drop database music_service;

\i ~/Work/_learning/nodejs2024Q1-service/src/database/sql/01-initialize-db.sql
\i ~/Work/_learning/nodejs2024Q1-service/src/database/sql/02-populate-data.sql
\i ~/Work/_learning/nodejs2024Q1-service/src/database/sql/03-populate-favorites.sql

\c music_service