const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('pruebas usuarios', () =>{

    beforeAll(async () => {
        await mongoose.connect()
    })

    describe('GET /api/v2/Usuarios', () =>{
        let response;

        beforeEach(async ()=>{
            response = await request(app).get('/api/v2/Usuarios').send();
        })

        it('La ruta funciona', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })

        it('la peticion nos devuelve un array de usuarios', async () => {
            expect(response.body).toBeInstanceOf(Array);
        })
    })
})