const { request, response } = require('express') // chama o express com dois parametros
const express = require('express') // tem que fazer igual nome exato
const uuid = require('uuid')
const port = 3000 // criou a variavel caso precisa mudar a porta fica mais facil

const app = express() // cria uma varivel para funcao expressa para ficar mais facil
app.use(express.json())

/*
  - Query params => meusite.com/users?name=washiner&age=43 //FILTROS
  - Route params => /users/2  // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
  - Request Body => {"name": "Washiner", "age":}


  --------
     - GET          -> BUSCAR INFORMACAO NO BACKEND
     - POST         -> CRIAR INFORMACAO NO BACKEND
     - PUT  / PATH  -> ALTERAR / ATUALIZAR INFORMACOES NO BACKEND
     - DELETE       -> DELETAR INFORMACAO NO BACKEND

     - MIDDLEWARE   -> INTERCEPTADOR => TEM O PODER DE PARAR OU ALTERAR DADOS DA REQUISICAO
 */


     const users = []

     const checkUserId = (request, response, next) => {
        const {id} = request.params

        const index = users.findIndex(user => user.id === id)
    
        if(index < 0){
            return response.status(404).json({Error: "User not found"})
        }
        request.userIndex = index
        request.userId = id

        next()
     }



app.get('/users', (request, response) =>{  // aqui e o hello world com node 

    return response.json(users)
      //const {name, age} = request.body
      //return response.json({name, age})
      //console.log(request.body)
      //return response.json({message: "OK"})
    //const {id} = request.params
    //console.log(id)
    //return response.json({id})
    //return response.send("hello Express")
    //const {name, age} = request.query  // chama no insomnia
    //return response.json({name, age}) // como os atributos tem mesmo nome nao precisa colocar name:name age:age ele ja entende que e igual
})

app.post('/users', (request, response) =>{
    const {name, age} = request.body

    const user = {id: uuid.v4(), name, age}
    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) =>{
    
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId


    const updateUser = {id, name, age}
    
   

    users[index] = updateUser
    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response)=> {
    const index = request.userIndex
    users.splice(index, 1)
    return response.status(204).json()

})


app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
}) // escuta a porta 3000 

// via terminal npm install express que e uma biblioteca que vamos usar
// comando para levantar o servidor node  -> node nome do projeto js no caso node index.js
// para parar o servidor control c


// instalar o nodemon -D para auxiliar no desenvolvimento somente quando estiver em desenvolvimento

// criei um script no package.json dev: nodemon
// ai pra rodar npm run dev
// abrir emoji igual o foguete acima no console.logo control comand espaço

// nota JSON = JAVASCRIPT OBJECT NOTATION 
