# Vacation management. Managing vacation destinations

  Web application for managing vacation destinations. A destination has in the database besides the name of the location (i.e. city etc.), the country name, description, tourist targets in that location and an estimated cost per day. The user can add, delete or modify the destinations and he can also browse the vacation destinations grouped by countries. Vacation destination browsing should be paged - destinations are displayed on pages with maximum 4 vacation destinations on a page (you should be able to go to the previous and the next page).

### 💎 Database schema
## Postgres
```postgres-psql
create table if not exists destination
(
	id smallint NOT NULL GENERATED ALWAYS AS IDENTITY primary key,
	city text,
	country text,
        description text,
	targets text[],
	cost float
);
```

## MySQL
```MySQL
create table if not exists destination
(
    id          int auto_increment primary key,
    city        varchar(100) null,
    country     varchar(100) null,
    description varchar(100) null,
    targets     varchar(200) null,
    cost        float        null
);
```
