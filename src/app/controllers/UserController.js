import * as Yup from 'yup';
import User from '../models/User';

class UserController{
  async store(req,res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    if( !( await schema.isValid(req.body) ) )
      return res.status(400).json({erro:'Validation fails.'});

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists)
      return res.status(400).json({erro:'User already exists.'});

    const {id,name,email,provider} = await User.create(req.body);

    return res.json({
      id,name,email,provider,
    });
  }

  async update(req,res){
    console.log(req.userId);

    return res.json({ ok: true });
  }
}

export default new UserController();
