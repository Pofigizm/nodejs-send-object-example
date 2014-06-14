This is simple http server on nodejs.
It send index.html file on request to 'localhost:80'.
It also create 'myobject' with 'summ' methods which return sum of all cost in object.
At the end it console logging 'myobject' and result call method 'summ' (100).

Index.html contain only one link with javascript code.
This code send request to 'localhost:80/getobject'.
After response this script logging receive object in console.
Also trying call method 'summ', but get 'UNDEFINED IS NOT A FUNCTION'.

I am interesting, how i can get my method 'summ' in broser?
Anybody help me?

Tags: Node.js, JavaScript, Object function, Http.
