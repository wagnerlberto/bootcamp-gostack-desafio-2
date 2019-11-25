import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController{
  async store(req,res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      idade: Yup.number().integer().min(16).max(59).required(),
      peso: Yup.string().required(),
      altura: Yup.string().required(),
    });
    if( !( await schema.isValid(req.body) ) )
      return res.status(400).json({erro:'Validation fails.'});

    const studentExists = await Student.findOne({ where: { email: req.body.email } });
    if (studentExists)
      return res.status(400).json({erro:'Student already exists.'});

    const {id,nome,email,idade,peso,altura} = await Student.create(req.body);

    return res.json({
      id,nome,email,idade,peso,altura
    });
  }

  async update(req,res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      idade: Yup.number().integer().min(16).max(59).required(),
      peso: Yup.number().positive().required(),
      altura: Yup.string().positive().required(),
    });
    if( !( await schema.isValid(req.body) ) )
      return res.status(400).json({erro:'Validation fails.'});

    const {email} = (req.body);

    const student = await Student.findOne({ where: { email } });
    if(!student)
      return res.status(400).json({erro:'Student does not exist.'});

    const {id,nome,idade,peso,altura} = await student.update(req.body);

    return res.json({
      id,nome,email,idade,peso,altura
    });
  }
}

export default new StudentController();

