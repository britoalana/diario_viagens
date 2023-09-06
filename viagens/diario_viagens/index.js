const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mysql = ('mysql2')
const porta = 3333
const pool = require('./db/conn')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    return res.render('home')
})

app.post('/viagens/insertviagens', (req, res) => {
    const {nome, destino, dt_voo, pt_positivos, pt_negativos } = req.body
    const sql = `INSERT INTO tb_viagens (??, ??, ??, ??, ??) VALUES (?, ? , ?, ?, ?)`
    const data = ['nome', 'destino', 'dt_voo', 'pt_positivos', 'pt_negativos', nome, destino, dt_voo, pt_positivos, pt_negativos]
    pool.query(sql, data, (err) => {
        if (err) {
            console.log(err)
            return
        }
        return res.redirect('/')
    })
})


    app.get('/viagens', (req, res) => {
        const sql = `SELECT * FROM tb_viagens`

        pool.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            const viagens = data
            res.render('viagens', { viagens })
        })
    })

    app.get('/viagens/:id', (req, res) => {
        const id = req.params.id

        const sql = `SELECT * FROM tb_viagens WHERE id = ${id}`
        const data = ['id', id]

        pool.query(sql, data, (err, data) => {
            if (err) {
                console.log(err)
            }
            const viagem = data[0]
            return res.render('viagem', { viagem })
        })
        

    })
    app.get('/viagens/edit/:id', (req, res) => {
        const id = req.params.id
        const sql = `SELECT * FROM tb_viagens WHERE id = ${id}`
        
        pool.query(sql, (err, data) => {
            if (err) {
                console.log(err)
            }
            const viagem = data[0]
            return res.render('editviagens', { viagem })
        })
        console.log(id)
    })

app.post('/viagens/updateviagem', (req, res)=>{
    const {id, nome, destino, dt_voo, pt_positivos, pt_negativos } = req.body

    const sql = `UPDATE tb_viagens SET nome = '${nome}', destino = '${destino}', dt_voo = '${dt_voo}', pt_positivos =' ${pt_positivos}', pt_negativos = '${pt_negativos}' WHERE id = ${id}`
    

    pool.query(sql, (err)=>{
        if(err){
            console.log(err)
            return
        }
        return res.redirect('/viagens')
    })

})

app.post('/viagens/remove/:id', (req, res) =>{
    const id = req.params.id
    const sql = `DELETE FROM tb_viagens WHERE id = ${id}`
    const data = ['id', id]

    pool.query(sql, data, (err) =>{
        if(err){
            console.log(err)
            return
        }
       
    })
    return res.redirect('/viagens')
})

app.listen(porta, () => {
    console.log(`Servidor on na porta ${porta}`)
})