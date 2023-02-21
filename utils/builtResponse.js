const builtResponse = (res, message, data) => {
 return res.send({
  status: 200,
  success: true,
  message,
  data
 });
};
module.exports = builtResponse