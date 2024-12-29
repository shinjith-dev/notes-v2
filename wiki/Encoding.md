Encoding is similar to [[Hashing]] in that it creates what would seem to be a random string of text, but in fact, the encoding is reversible.
What is the point in encoding? Encoding allows us to convert binary data into human-readable text that can be easily and safely transmitted over mediums that only support plain text ASCII characters.
Common encoding types are **base32** which converts binary data to the characters A-Z and 2-7, and **base64** which converts using the characters a-z, A-Z, 0-9,+, / and the equals sign for padding.

## Encodings
### base64
example: `eyJpZCI6MSwiYWRtaW4iOmZhbHNlfQ==` --> `{"id":1,"admin":false}`

Tool for encoding/decoding, [CyberChef](https://gchq.github.io/CyberChef/)