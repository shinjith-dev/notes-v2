Burp Suite is a **Java-based framework designed to serve as a comprehensive solution for conducting web application penetration testing**. It has become the industry standard tool for hands-on security assessments of web and mobile applications, including those that rely on application programming interfaces (APIs).

Burp Suite captures and enables manipulation of all the HTTP/HTTPS traffic between a browser and a web server. By intercepting requests, users have the flexibility to route them to various components within the Burp Suite framework. The ability **to intercept, view, and modify web requests before they reach the target server** or even manipulate responses before they are received by our browser makes Burp Suite an invaluable tool for manual web application testing.

### Features
- **Proxy**: The Burp Proxy is the most renowned aspect of Burp Suite. It enables interception and modification of requests and responses while interacting with web applications.
- **Repeater**: Another well-known feature. Repeater allows for capturing, modifying, and resending the same request multiple times. This functionality is particularly useful when crafting payloads through trial and error (e.g., in SQLi - Structured Query Language Injection) or testing the functionality of an endpoint for vulnerabilities.
- **Intruder**: Despite rate limitations in Burp Suite Community, Intruder allows for spraying endpoints with requests. It is commonly utilized for brute-force attacks or fuzzing endpoints.
- **Decoder**: Decoder offers a valuable service for data transformation. It can decode captured information or encode payloads before sending them to the target. While alternative services exist for this purpose, leveraging Decoder within Burp Suite can be highly efficient.
- **Comparer**: As the name suggests, Comparer enables the comparison of two pieces of data at either the word or byte level. While not exclusive to Burp Suite, the ability to send potentially large data segments directly to a comparison tool with a single keyboard shortcut significantly accelerates the process.
- **Sequencer**: Sequencer is typically employed when assessing the randomness of tokens, such as session cookie values or other supposedly randomly generated data. If the algorithm used for generating these values lacks secure randomness, it can expose avenues for devastating attacks.

Beyond the built-in features, the Burp Suite facilitates the development of **extensions** to enhance the framework's functionality. These extensions can be written in **Java**, **Python** (using the Java Jython interpreter), or **Ruby** (using the Java JRuby interpreter). The Burp Suite Extender module allows for quick and easy loading of extensions into the framework, while the marketplace, known as the BApp Store, enables downloading of third-party modules. For instance, the **Logger++ module can extend the built-in logging functionality** of Burp Suite.

## Repeater

- Altering the Request `Connection` header to `open` instead of `close` yields a response with a `Connection` header containing the value `keep-alive`

### Inspector

Inspector is a supplementary feature to the Request and Response views in the Repeater module. It is also used to obtain a visually organized breakdown of requests and responses, as well as for experimenting to see how changes made using the higher-level Inspector affect the equivalent raw versions.

Inspector can be utilized both in the Proxy and Repeater module.

## Intruder

3. **Pitchfork**: The Pitchfork attack type enables the **simultaneous testing of multiple positions with different payloads**. It allows the tester to define multiple payload sets, each associated with a specific position in the request. Pitchfork attacks are effective when there are distinct parameters that need separate testing.

4. **Cluster bomb**: The Cluster bomb attack type combines the Sniper and Pitchfork approaches. It **performs a Sniper-like attack on each position but simultaneously tests all payloads from each set.** This attack type is useful when multiple positions have different payloads, and we want to test them all together.

### Sniper

The Sniper attack type is the default and most commonly used attack type in Burp Suite Intruder. It is particularly effective for single-position attacks, such as password brute-force or fuzzing for API endpoints. In a Sniper attack, we provide a set of payloads, which can be a wordlist or a range of numbers, and Intruder inserts each payload into each defined position in the request.

It **cycles through the payloads, inserting one payload at a time into each position** defined in the request. Sniper attacks iterate through all the payloads in a linear fashion, allowing for precise and focused testing.

- `requests = numberOfWords * numberOfPositions`

### Battering Ram

The Battering ram attack type in Burp Suite Intruder differs from Sniper in that it places the same payload in every position simultaneously, rather than substituting each payload into each position in turn.

he Battering ram attack type differs from Sniper in that it **sends all payloads simultaneously, each payload inserted into its respective position**. This attack type is useful when testing for race conditions or when payloads need to be sent concurrently.

Each payload from the wordlist is inserted into every position for each request made. In a Battering Ram attack, the same payload is thrown at every defined position simultaneously, providing a brute-force-like approach to testing.

The Battering Ram attack type is useful when we want to test the same payload against multiple positions at once without the need for sequential substitution.


