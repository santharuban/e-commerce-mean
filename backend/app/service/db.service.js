const saveData = async (Model) => {
  return Model.save();
};

const findData = async (Model, data) => {
  return Model.find(data);
};

const findSingleData = async (Model, data) => {
  return Model.findOne(data);
};

const findDataById = async (Model, id) => {
  return Model.findById(id);
};

const editData = async (Model, id, data) => {
  return Model.findByIdAndUpdate(id, data);
};

const deleteData = async (Model, id) => {
  return Model.findByIdAndRemove(id);
};

// const findPagination = async (Model, data, limit, skip) => {
//   const count = await Model.countDocuments(data);
//   const totalPages = Math.ceil(count / limit);
//   const results = await Model.find().skip(skip).limit(limit).exec();
//   return { results, totalPages };
// };
const findPagination = async (Model, data, limit, skip,sort) => {
  const count = await Model.countDocuments(data);
  const totalPages = Math.ceil(count / limit);
  const results = await Model.find().sort(sort).skip(skip).limit(limit).exec();
  return { results, totalPages, skip, limit,sort };
};



module.exports = {
  saveData,
  findData,
  findSingleData,
  findDataById,
  editData,
  deleteData,
  findPagination,
};
