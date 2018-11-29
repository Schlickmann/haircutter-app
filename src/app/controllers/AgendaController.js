const moment = require("moment");
const { Op } = require("sequelize");
const { Appointment, User } = require("../models");

class AgendaController {
  index(req, res) {
    return res.render("schedule/index");
  }

  async data(req, res) {
    let appointments = "";
    if (req.query.date) {
      const date = moment(parseInt(req.query.date));
      appointments = await Appointment.findAll({
        include: [{ model: User, as: "user" }],
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              date.startOf("day").format(),
              date.endOf("day").format()
            ]
          }
        }
      });
    }

    console.log(appointments);
    return res.render("schedule/data", { appointments });
  }
}

module.exports = new AgendaController();
