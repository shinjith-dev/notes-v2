SQL (**Structured Query Language**) is a feature-rich language **used for querying databases**. These SQL queries are better referred to as *statements*. Although somewhat similar, some database servers have their own syntax and slight changes to how things work.

### Queries

**`SELECT`**
The SELECT query is used to retrieve data from the database. 

```sql
-- basic
select * from users;`
select username,password from users;`
select * from users LIMIT 1;
select * from users where username='admin';
select * from users where username='admin' and password='p4ssword';
-- pattern matching
select * from users where username like 'a%'; -- username beginning with the letter a
select * from users where username like '%n'; -- username ending with the letter n
select * from users where username like '%mi%'; -- username mi as substring
```

------

**`UNION`**

The UNION statement **combines the results of two or more SELECT statements to retrieve data from either single or multiple tables**; the rules to this query are that the **UNION statement must retrieve the same number of columns in each SELECT statement, the columns have to be of a similar data type, and the column order has to be the same**.

```sql
SELECT name,address,city,postcode from customers UNION SELECT company,address,city,postcode from suppliers;
```

------

**`INSERT`**

The INSERT statement tells the database we wish to insert a new row of data into the table. `into users` tells the database which table we wish to insert the data into, `(username,password)` provides the columns we are providing data for and then `values ('bob','password');` provides the data for the previously specified columns.

```sql
insert into users (username,password) values ('bob','password123');
```

------

**`UPDATE`**

The UPDATE statement tells the database we wish to update one or more rows of data within a table. You specify the table you wish to update using `update %tablename% SET` and then select the field or fields you wish to update as a comma-separated list such as `username='root',password='pass123`" then finally, similar to the SELECT statement, you can specify exactly which rows to update using the where clause such as `where username='admin;`.

```sql
update users SET username='root',password='pass123' where username='admin';
```

------

**`DELETE`**

The DELETE statement tells the database we wish to delete one or more rows of data. Apart from missing the columns you wish to return, the format of this query is very similar to the SELECT. You can specify precisely which data to delete using the **where clause** and the number of rows to be deleted using the **LIMIT clause**.

```sql
delete from users where username='martin';
delete from users; # all the data will be deleted
```
