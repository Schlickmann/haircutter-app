const { User } = require("../models");
const { Op } = require("sequelize");

class DashboardController {
  async index(req, res) {
    const currentUser = req.session.user;
    const providers = await User.findAll({
      where: {
        provider: true,
        id: {
          [Op.ne]: currentUser.id
        }
      }
    });
    // console.log(providers);
    return res.render("dashboard", { providers });
  }
}

module.exports = new DashboardController();
