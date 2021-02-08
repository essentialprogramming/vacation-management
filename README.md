# Vacation management

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
