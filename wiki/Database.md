A database is a way of electronically storing collections of data in an organised manner. A database is controlled by a **DBMS**, which is an acronym for  Database Management System.

DBMSs fall into two camps:
- Relational and
- Non-Relational

some common DBs you'll come across are `MySQL`, `Microsoft SQL Server`, `MS Access`, `PostgreSQL` and `SQLite`. Within a DBMS, you can have multiple databases, each containing its own set of related data. 

## Tables
A table is made up of columns and rows; a useful way to imagine a table is like a grid with the columns going across the top from left to right containing the name of the cell and the rows going from top to bottom, with each one having the actual data.

### Columns:
Each column, better referred to as a field, has a unique name per table. When creating a column, you also set the type of data it will contain, common ones being **integers (numbers), strings (standard text) or dates**.

Some databases can contain much more complex data, such as **geospatial**, which contains location information. Setting the *data type also ensures that incorrect information isn't stored*, such as the string "hello world" being stored in a column meant for dates. If this happens, the database server will usually produce an error message. A column containing an integer can also have an **auto-increment feature** enabled; this gives each row of data a unique number that grows (increments) with each subsequent row. Doing so creates what is called a **key field**; a key field has to be **unique for every row of data**, which can be used to find that exact row in SQL queries.

### Rows:
Rows or records contain individual lines of data. When you add data to the table, a new row/**record** is created; when you delete data, a row/record is removed.

### Relational Vs Non-Relational Databases:
A relational database stores information in **tables**, and often, the *tables share information between them*; they use columns to specify and define the data being stored and rows actually to store the data. The tables will often contain a **column that has a unique ID (primary key)**, which will then be used in other tables to reference it and **cause a relationship between the tables**, hence the name relational database.

Non-relational databases, sometimes called **NoSQL**, on the other hand, are any sort of database that **doesn't use tables, columns and rows** to store the data. A specific database layout doesn't need to be constructed so **each row of data can contain different information**, giving more flexibility over a relational database.  Some popular databases of this type are `MongoDB`, `Cassandra` and `ElasticSearch`.

