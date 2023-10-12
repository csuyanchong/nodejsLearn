const Employee = require('../model/Employee');


const getAllEmployee = async (req, res) => {
   let employees = await Employee.find({});
   if (!employees) {
      return res.status(204).json({ 'message': 'No Employees Found!' });
   }
   res.json(employees);
}

const createEmployee = async (req, res) => {
   if (!req?.body?.name || !req?.body?.age) {
      return res.status(400).json({ 'message': 'name and age are required!' });
   }

   const name = req.body.name;
   const age = req.body.age;

   let data = await Employee.create({ name: name, age: age });

   console.log(data);

   res.status(201).json(data);
}

const updateEmployee = async (req, res) => {
   // TODO...
   res.json({ "id": req.body.id, "name": req.body.name });
}

const deleteEmployee = async (req, res) => {
   // TODO...
   res.json({ "id": req.body.id });
}

const getEmployee = async (req, res) => {
   res.json({ "id": req.body.id });
}

module.exports = {
   getAllEmployee,
   getEmployee,
   createEmployee,
   updateEmployee,
   deleteEmployee
};