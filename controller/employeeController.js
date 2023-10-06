const data = {
   employees: require('../data/employees.json'),
   setEmployees: function (data) {
      this.employees = data;
   },
   add: function (name, age) {
      this.employees.push({
         "id": this.employees[this.employees.length - 1].id + 1,
         "name": name,
         "age": age
      })
   }
};

const getAllEmployee = (req, res) => {
   res.json(data.employees);
}

const createEmployee = (req, res) => {
   if (req.body) {
      const name = req.body.name;
      const age = req.body.age;

      data.add(name, age);
      res.status(201).json(data.employees);
   }
   else {
      // let err = new Error("name is null");
      res.status(400).type('txt').send('name is null');
   }

}

const updateEmployee = (req, res) => {
   res.json({ "id": req.body.id, "name": req.body.name });
}

const deleteEmployee = (req, res) => {
   res.json({ "id": req.body.id });
}

const getEmployee = (req, res) => {
   res.json({ "id": req.body.id });
}

module.exports = {
   getAllEmployee,
   getEmployee,
   createEmployee,
   updateEmployee,
   deleteEmployee
};