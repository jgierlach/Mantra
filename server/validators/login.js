import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required()
})

export default (req, res, next) =>{
  console.log('were inside the login validator req.body ', req.body)
  return LoginSchema.validate(req.body)
    .then(() => next())
    .catch(error =>
      res.status(422).json({
        [error.path]: error.message
      })
    )
}