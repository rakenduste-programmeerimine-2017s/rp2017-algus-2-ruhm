/* globals describe, it */
const expect = require('chai').expect

module.exports = (supertest) => {
  describe('/GET', () => {
    it('it should GET all the words', done => {
      supertest
      .get('/api/words')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        const { words } = res.body
        expect(words).to.be.a('array')

        done()
      })
    })
  })

  describe('/POST', () => {
    it('it should save new word', done => {
      supertest
        .post('/api/words')
        .send({ name: 'tere' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          const { word } = res.body
          expect(word).to.be.an('object')

          expect(word).to.have.property('_id')
          expect(word).to.have.property('name')
          expect(word).to.have.property('guessedCount')
          expect(word).to.have.property('createdAt')
          expect(word).to.have.property('updatedAt')

          done()
        })
    })

    it('it should not save new word if no name', done => {
      supertest
        .post('/api/words')
        .send({ })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          // console.log(res.body)
          expect(res.body.errors.name.msg).to.eql('Name must exist')
          done()
        })
    })

    it('it should not save new word if name shorter than 2', done => {
      supertest
        .post('/api/words')
        .send({ name: 'a' })
        .expect(422, done)
    })

    it('it should not save new word if name is not alphanumerical', done => {
      supertest
        .post('/api/words')
        .send({ name: 'tere 123 @' })
        .expect(422, done)
    })
  })
}
