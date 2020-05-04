# Vacation management

### 💎 Database schema

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

