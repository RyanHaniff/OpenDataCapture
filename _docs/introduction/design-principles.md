# Design Principles

## Free and Open Source

In our experience, the vast majority of clinical software is proprietary, which regrettably includes many programs developed by academics and non-profit organizations. Although this is ostensibly to protect the software from commercial interests, such practices instead serve only to hinder scientific advancement. Restricting access to these programs limits the ability for researchers and scientists to build upon and improve upon existing work. We believe that open-source models facilitate a more collaborative and inclusive approach to software development, leading to more rapid and impactful advancements in mental health research.

Open Data Capture is distributed under the Affero General Public License (AGPL). AGPL is a specific type of open-source license known as a copyleft license, which ensures that any derivative works or distributions of the original software remain open-source and freely accessible to the public. This means that if a person or organization modifies the platform and uses it over a network, they are required to make the modified version available to the public under the AGPL license. This promotes a more collaborative and fair approach to software development by encouraging the sharing of improvements and modifications with the community. The AGPL license provides a framework that ensures the long-term sustainability of the platform with open development and accessibility for all.

## Modern UI

A modern, user-friendly interface is a key priority for this platform. Based on feedback from potential early adopters, we identified two key principles that inform our design choices:

1. The user interface must be modern, professional, and reflective of a website built in 2023
2. The user interface must be intuitive and easy to navigate, regardless of the user's technical proficiency

A well-designed, intuitive, and visually appealing user interface is particularly relavent to our project for several reasons. Most importantly, by designing an application that is efficient and easy to learn, we are helping to ensure that clinicians spend less time struggling with software and more time providing care to patients. Moreover, a modern user interface makes the application more accessible to a wider range of users, which can help to increase adoption and engagement. This, in turn, can lead to more contributions from the open-source community, which will help to improve the application over time.

## NoSQL Database

Selecting the appropriate database management system is critical for the long-term success of the platform. After evaluating various options, we determined that a NoSQL, document-based database best meets our needs. While we examined several relational databases, they do not offer the necessary flexibility for agile and rapid development. Our database models include a core set of properties, with the ability to add additional fields rapidly, without the need for cumbersome database migrations. For example, subjects in our database have a set of required properties (e.g. date of birth, sex) that provide the foundation for core functionality (e.g. data filtering), with additional properties depending on the needs of specific clinics.

## REST API

Open Data Capture is built using a REST (Representational State Transfer) API architecture for several reasons:

1. REST is a widely adopted and well-established architectural style for building web services. It is based on the principles of HTTP, making it easily understandable and accessible to developers with a variety of technical backgrounds. This ensures that the platform is sustainable and can be easily maintained by future developers

2. REST APIs are stateless, meaning that each request contains all the necessary information for the server to process it. This makes them highly flexible and scalable, allowing for smooth growth and expansion of the platform.

3. REST APIs allow for seamless integration with a wide range of technologies and platforms, which enables Open Data Capture to provide a foundation for future integration with other services

4. REST APIs are easy to document and understand, which is essential for ensuring that future developers can build new services, such as data-driven clinical care systems based on machine learning and artificial intelligence.

5. REST APIs are easy to test and debug, which is crucial for building a robust, secure, and maintainable platform.
