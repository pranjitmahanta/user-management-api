OUTPUT : 

Microsoft Windows [Version 10.0.22631.4890]
(c) Microsoft Corporation. All rights reserved.

C:\Users\pranjit>curl -X POST "http://localhost:5000/api/users" ^
More?      -H "Content-Type: application/json" ^
More?      -d "{\"name\": \"Alice Smith\", \"email\": \"alice@example.com\", \"password\": \"mypassword\", \"role\": \"user\"}"
{"message":"User registered successfully"}
C:\Users\pranjit>curl -X POST "http://localhost:5000/api/login" ^
More?      -H "Content-Type: application/json" ^
More?      -d "{\"email\": \"alice@example.com\", \"password\": \"securepass\"}"
{"message":"Invalid credentials"}
C:\Users\pranjit>curl -X POST "http://localhost:5000/api/login" ^
More?      -H "Content-Type: application/json" ^
More?      -d "{\"email\": \"alice@example.com\", \"password\": \"mypassword\"}"
{"token":"#"}
C:\Users\pranjit>curl -X GET "http://localhost:5000/api/users" ^
More?      -H "Authorization: Bearer #"
[{"id":1,"name":"John Doe","email":"john@example.com","role":"user"},{"id":5,"name":"Alice Smith","email":"alice@example.com","role":"user"}]
C:\Users\pranjit>curl -X PUT "http://localhost:5000/api/users/5" ^
More?      -H "Authorization: Bearer #" ^
More?      -H "Content-Type: application/json" ^
More?      -d "{\"name\": \"Alice Updated\", \"email\": \"alice.updated@example.com\", \"role\": \"admin\"}"
{"message":"User updated successfully"}
C:\Users\pranjit>curl -X DELETE "http://localhost:5000/api/users/5" ^
More?      -H "Authorization: Bearer #"
{"message":"User deleted successfully"}
C:\Users\pranjit>
