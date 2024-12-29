Extensible Markup Language. XML is a commonly used method to transport and store data in a structured format that humans and machines can easily understand.

You can think of XML as a digital filing cabinet. Just as a filing cabinet has folders with labelled documents inside, XML uses tags to label and organise information. These tags are like folders that define the type of data stored. This is what an XML looks like, a simple piece of text information organised in a structured manner: 

```xml
<people>
   <name>Glitch</name>
   <address>Wareville</address>
   <email>glitch@wareville.com</email>
   <phone>111000</phone>
</people>
```

## Document Type Definition (DTD)
A DTD is a set of rules that defines the structure of an XML document. Just like a database scheme, it acts like a blueprint, telling you what elements (tags) and attributes are allowed in the XML file. Think of it as a guideline that ensures the XML document follows a specific structure.

For example, if we want to ensure that an XML document about people will always include a name, address, email, and phone number, we would define those rules through a DTD as shown below:

```xml
<!DOCTYPE people [
   <!ELEMENT people(name, address, email, phone)>
   <!ELEMENT name (#PCDATA)>
   <!ELEMENT address (#PCDATA)>
   <!ELEMENT email (#PCDATA)>
   <!ELEMENT phone (#PCDATA)>
]>
```

In the above DTD, `<!ELEMENT>`  defines the elements (tags) that are allowed, like `name`, `address`, `email`, and `phone`, whereas `#PCDATA` stands for **parsed people data**, meaning it will consist of just plain text.

## Entities
Entities in XML are placeholders that allow the insertion of large chunks of data or referencing internal or external files. They assist in making the XML file easy to manage, especially when the same data is repeated multiple times. Entities can be defined internally within the XML document or externally, referencing data from an outside source. 

For example, an external entity references data from an external file or resource. In the following code, the entity &ext; could refer to an external file located at "http://tryhackme.com/robots.txt", which would be loaded into the XML, if allowed by the system:

```xml
<!DOCTYPE people [
   <!ENTITY ext SYSTEM "http://tryhackme.com/robots.txt">
]>
<people>
   <name>Glitch</name>
   <address>&ext;</address>
   <email>glitch@wareville.com</email>
   <phone>111000</phone>
</people>
```

We are specifically discussing external entities because it is one of the main reasons that [[XXE]] is introduced if it is not properly managed.