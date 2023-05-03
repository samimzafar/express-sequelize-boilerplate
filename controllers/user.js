const { sequelize, Users } = require("../models");
const ApiError = require("../utils/apiError");
const builtResponse = require("../utils/builtResponse");
// const { catchAsyncHandler } = require("../utils/catchAsyncHandler");
module.exports = {
  create: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const role = req.header("role");
      const { name, phone_number, email } = req.body;
      let user = await Users.findOne({
        where: { email },
      });
      if (user) {
        throw new ApiError(409, "User Already Exists");
      } else {
        user = await Users.create({ name, phone_number, email, role });
        builtResponse(res, "User Created successfully", user);
        await transaction.commit();
      }
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  },
};
// closeSupportTicket: catchAsyncHandler(async (req, res, next) => {
//  const ticket = await SupportTickets.findOne({
//    where: {
//      fk_creator_id: req.user.id,
//      createdBy: req.roleType,
//      id: req.params.ticket_id,
//    },
//    attributes: ["id", "status", "conversation_sid"],
//  });
//  if (!ticket) {
//    return next(new AppError("Ticket not found", 404));
//  }
//  if (ticket.status === SUPPORT_TICKET_STATUS.close) {
//    return next(new AppError("This issue has already been closed", 400));
//  }
//  await updateConversation(ticket.conversation_sid, {
//    attributes: JSON.stringify({ status: SUPPORT_TICKET_STATUS.close }),
//  });
//  await ticket.update({ status: SUPPORT_TICKET_STATUS.close });
//  res.sendStatus(200);
// }),
